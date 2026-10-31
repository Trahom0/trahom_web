import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';

// Website admin for trahom.org — "من الميدان" posts with an approval step.
// All checks that matter (who may publish, what is allowed in a post) are done again on the server.

type Role = 'admin' | 'editor';
type Status = 'draft' | 'pending' | 'published' | 'hidden';

type Post = {
  id: string;
  status: Status;
  date: string;
  governorate: string;
  titleAr: string;
  titleEn: string;
  titleTr: string;
  textAr: string;
  textEn: string;
  textTr: string;
  images: string[];
  link: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
};

type Draft = Omit<Post, 'id' | 'status' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt' | 'approvedBy' | 'approvedAt'> & {
  id?: string;
};

type AuditEntry = { at: string; email: string; action: string; postId: string; detail: string };

const API = '/api/admin';

const STATUS_LABELS: Record<Status, { label: string; className: string }> = {
  draft: { label: 'مسودة', className: 'bg-gray-100 text-gray-700' },
  pending: { label: 'بانتظار الموافقة', className: 'bg-amber-100 text-amber-800' },
  published: { label: 'منشور على الموقع', className: 'bg-emerald-100 text-emerald-800' },
  hidden: { label: 'مخفي', className: 'bg-rose-100 text-rose-700' }
};

const GOVERNORATES: Array<[string, string]> = [
  ['', '— بدون تحديد —'],
  ['north-gaza', 'شمال غزة'],
  ['gaza', 'مدينة غزة'],
  ['deir-al-balah', 'دير البلح'],
  ['khan-younis', 'خان يونس'],
  ['rafah', 'رفح']
];

const LANGS: Array<{ key: 'Ar' | 'En' | 'Tr'; label: string; dir: 'rtl' | 'ltr' }> = [
  { key: 'Ar', label: 'العربية', dir: 'rtl' },
  { key: 'En', label: 'English', dir: 'ltr' },
  { key: 'Tr', label: 'Türkçe', dir: 'ltr' }
];

const ERRORS: Record<string, string> = {
  'title-required': 'اكتب عنوانًا بلغة واحدة على الأقل.',
  forbidden: 'لا تملك صلاحية لهذا الإجراء.',
  'not-found': 'لم يعد هذا المنشور موجودًا. حدّث الصفحة.',
  'too-large': 'الصورة كبيرة جدًا.',
  'not-an-image': 'الملف ليس صورة (JPG أو PNG أو WebP).',
  'not-configured': 'اللوحة غير مُعدّة بعد على الخادم.',
  'orphan-not-found': 'لم نجد يتيمًا بهذا الرمز أو رقم الهوية في جدول الأيتام.',
  'signed-out': 'انتهت الجلسة. سجّل الدخول من جديد.',
  'bad-store-link': 'تحقق من الروابط: رابط Google Play يبدأ بـ https://play.google.com/store/apps/details?id= ورابط App Store يبدأ بـ https://apps.apple.com/',
  'send-failed': 'تعذّر إرسال الرسائل الآن (قد يكون حدّ الإرسال اليومي قد اكتمل). حاول لاحقًا.',
  changed: 'تم تعديل هذا المنشور بعد أن فتحته. راجعه من جديد ثم وافق عليه.'
};

const today = () => new Date().toISOString().slice(0, 10);

const emptyDraft = (): Draft => ({
  date: today(),
  governorate: '',
  titleAr: '',
  titleEn: '',
  titleTr: '',
  textAr: '',
  textEn: '',
  textTr: '',
  images: [],
  link: ''
});

class ApiError extends Error {
  code: string;
  status: number;
  constructor(code: string, status: number) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

const call = async (action: string, body?: unknown) => {
  const response = await fetch(`${API}?a=${action}`, {
    method: body === undefined ? 'GET' : 'POST',
    credentials: 'same-origin',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(String(data?.error ?? 'server'), response.status);
  }
  return data;
};

const messageFor = (error: unknown) =>
  error instanceof ApiError ? ERRORS[error.code] ?? 'حدث خطأ. حاول مرة أخرى.' : 'تعذّر الاتصال. تحقق من الإنترنت وحاول مرة أخرى.';

// Shrinks a photo in the browser (longest side 1600px, JPEG) so uploads are fast and stay under the limit.
// Drawing it on a canvas also drops the photo's hidden data such as GPS location.
const shrinkImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('decode'));
      img.onload = () => {
        const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('canvas'));
          return;
        }
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });

const formatDate = (iso: string) => {
  if (!iso) {
    return '';
  }
  const date = new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso);
  return new Intl.DateTimeFormat('ar-u-nu-latn', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(iso.length > 10 ? { hour: '2-digit', minute: '2-digit' } : {})
  }).format(date);
};

const inputClass =
  'w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#e1a226]/60';
const primaryButton =
  'inline-flex items-center justify-center rounded-xl bg-[#103b51] px-5 py-3 text-white font-medium hover:bg-[#0c2e40] disabled:opacity-50';
const secondaryButton =
  'inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 font-medium hover:bg-black/5 disabled:opacity-50';

// ---------- sign-in ----------

function SignIn({ onSignedIn }: { onSignedIn: (user: { email: string; role: Role }) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'password' | 'link'>('password');
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const expired = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('login') === 'expired';

  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    setState('sending');
    setError('');
    try {
      const data = await call('login', { email, password });
      setPassword('');
      onSignedIn({ email: data.email, role: data.role });
    } catch (loginError) {
      setState('idle');
      setError(
        loginError instanceof ApiError && loginError.code === 'too-many-attempts'
          ? 'محاولات خاطئة كثيرة. انتظر 15 دقيقة ثم حاول مجددًا.'
          : loginError instanceof ApiError && loginError.code === 'wrong-login'
            ? 'البريد الإلكتروني أو كلمة السر غير صحيحة.'
            : messageFor(loginError)
      );
    }
  };

  const sendLink = async (event: FormEvent) => {
    event.preventDefault();
    setState('sending');
    setError('');
    try {
      await call('request-link', { email });
      setState('sent');
    } catch {
      setState('idle');
      setError('تعذّر الإرسال. حاول مرة أخرى.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f3ee] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <img src="/favicon.png" alt="" className="w-10 h-10 mb-4" />
        <h1 className="text-2xl mb-4">لوحة موقع تراحم</h1>
        {expired && (
          <p className="rounded-xl bg-amber-50 text-amber-800 p-3 text-sm mb-4">رابط الدخول منتهي الصلاحية أو مستخدم من قبل.</p>
        )}
        {mode === 'password' ? (
          <form onSubmit={signIn} className="space-y-4">
            <label className="block">
              <span className="block mb-1 text-sm text-foreground/70">البريد الإلكتروني</span>
              <input
                type="email"
                required
                dir="ltr"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@trahom.org"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="block mb-1 text-sm text-foreground/70">كلمة السر</span>
              <input
                type="password"
                required
                dir="ltr"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClass}
              />
            </label>
            <button type="submit" className={`${primaryButton} w-full`} disabled={state === 'sending'}>
              {state === 'sending' ? 'جارٍ الدخول…' : 'دخول'}
            </button>
            {error && <p className="text-rose-600 text-sm">{error}</p>}
            <button
              type="button"
              onClick={() => {
                setMode('link');
                setError('');
              }}
              className="text-sm text-foreground/60 hover:text-foreground underline"
            >
              نسيت كلمة السر؟ أرسل لي رابط دخول على الإيميل
            </button>
          </form>
        ) : state === 'sent' ? (
          <p className="leading-relaxed text-foreground/80">
            إذا كان هذا البريد مسجّلًا في اللوحة، فقد وصلك الآن رابط الدخول. افتح بريدك واضغط على الرابط خلال 15 دقيقة.
          </p>
        ) : (
          <form onSubmit={sendLink} className="space-y-4">
            <p className="text-foreground/70">اكتب بريدك الإلكتروني، وسنرسل لك رابط دخول لمرة واحدة.</p>
            <input
              type="email"
              required
              dir="ltr"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@trahom.org"
              className={inputClass}
            />
            <button type="submit" className={`${primaryButton} w-full`} disabled={state === 'sending'}>
              {state === 'sending' ? 'جارٍ الإرسال…' : 'أرسل رابط الدخول'}
            </button>
            {error && <p className="text-rose-600 text-sm">{error}</p>}
            <button type="button" onClick={() => setMode('password')} className="text-sm text-foreground/60 hover:text-foreground underline">
              الرجوع إلى الدخول بكلمة السر
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ---------- post form ----------

function PostForm({
  role,
  initial,
  onCancel,
  onSaved
}: {
  role: Role;
  initial: Draft;
  onCancel: () => void;
  onSaved: (message: string) => void;
}) {
  const [draft, setDraft] = useState<Draft>(initial);
  const [lang, setLang] = useState<'Ar' | 'En' | 'Tr'>('Ar');
  const [uploading, setUploading] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const update = (patch: Partial<Draft>) => setDraft((current) => ({ ...current, ...patch }));

  const addImages = async (files: FileList | null) => {
    if (!files?.length) {
      return;
    }
    setError('');
    const room = 6 - draft.images.length;
    const selected = Array.from(files).slice(0, Math.max(0, room));
    if (!selected.length) {
      setError('الحد الأقصى 6 صور للمنشور.');
      return;
    }
    setUploading((count) => count + selected.length);
    for (const file of selected) {
      try {
        const data = await shrinkImage(file);
        const { url } = await call('upload', { data });
        setDraft((current) => ({ ...current, images: [...current.images, url].slice(0, 6) }));
      } catch (uploadError) {
        setError(uploadError instanceof ApiError ? messageFor(uploadError) : `تعذّر رفع الصورة: ${file.name}`);
      } finally {
        setUploading((count) => count - 1);
      }
    }
  };

  const save = async (intent: 'publish' | 'submit' | 'draft') => {
    setSaving(true);
    setError('');
    try {
      await call('save', { id: draft.id, intent, post: draft });
      onSaved(
        intent === 'publish'
          ? 'تم النشر. سيظهر على الموقع خلال 10 دقائق تقريبًا.'
          : intent === 'submit'
            ? 'تم الإرسال للموافقة، ووصل إشعار للمدير.'
            : 'تم حفظ المسودة.'
      );
    } catch (saveError) {
      setError(messageFor(saveError));
    } finally {
      setSaving(false);
    }
  };

  const busy = saving || uploading > 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
      <h2 className="text-xl">{draft.id ? 'تعديل المنشور' : 'منشور جديد'}</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block mb-1 text-sm text-foreground/70">التاريخ</span>
          <input type="date" value={draft.date} onChange={(event) => update({ date: event.target.value })} className={inputClass} />
        </label>
        <label className="block">
          <span className="block mb-1 text-sm text-foreground/70">المحافظة</span>
          <select value={draft.governorate} onChange={(event) => update({ governorate: event.target.value })} className={inputClass}>
            {GOVERNORATES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <div className="flex gap-2 mb-3" role="tablist">
          {LANGS.map((item) => {
            const filled = Boolean(draft[`title${item.key}`]);
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={lang === item.key}
                onClick={() => setLang(item.key)}
                className={`rounded-lg px-4 py-2 text-sm ${lang === item.key ? 'bg-[#103b51] text-white' : 'bg-black/5'}`}
              >
                {item.label} {filled ? '✓' : ''}
              </button>
            );
          })}
        </div>
        {LANGS.filter((item) => item.key === lang).map((item) => (
          <div key={item.key} className="space-y-3" dir={item.dir}>
            <input
              value={draft[`title${item.key}`]}
              maxLength={140}
              onChange={(event) => update({ [`title${item.key}`]: event.target.value } as Partial<Draft>)}
              placeholder={item.key === 'Ar' ? 'العنوان' : item.key === 'En' ? 'Title' : 'Başlık'}
              className={inputClass}
            />
            <textarea
              value={draft[`text${item.key}`]}
              maxLength={1500}
              rows={5}
              onChange={(event) => update({ [`text${item.key}`]: event.target.value } as Partial<Draft>)}
              placeholder={item.key === 'Ar' ? 'تفاصيل النشاط' : item.key === 'En' ? 'Details' : 'Ayrıntılar'}
              className={inputClass}
            />
          </div>
        ))}
        <p className="text-xs text-foreground/50 mt-2">إذا تركت لغة فارغة، يظهر المنشور فيها باللغة المتوفرة.</p>
      </div>

      <div>
        <span className="block mb-2 text-sm text-foreground/70">الصور (حتى 6)</span>
        <div className="flex flex-wrap gap-3">
          {draft.images.map((url, index) => (
            <div key={url} className="relative w-28 h-24 rounded-xl overflow-hidden bg-black/5">
              <img src={url} alt="" className="w-full h-full object-cover" />
              {index === 0 && <span className="absolute bottom-1 start-1 bg-black/60 text-white text-[10px] px-1.5 rounded">الرئيسية</span>}
              <button
                type="button"
                onClick={() => update({ images: draft.images.filter((item) => item !== url) })}
                className="absolute top-1 end-1 bg-white/90 rounded-full w-6 h-6 text-sm leading-6"
                aria-label="إزالة الصورة"
              >
                ×
              </button>
            </div>
          ))}
          {draft.images.length < 6 && (
            <label className="w-28 h-24 rounded-xl border-2 border-dashed border-black/15 flex items-center justify-center text-sm text-foreground/60 cursor-pointer hover:bg-black/5">
              {uploading ? 'جارٍ الرفع…' : '+ إضافة صور'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="sr-only"
                onChange={(event) => {
                  void addImages(event.target.files);
                  event.target.value = '';
                }}
              />
            </label>
          )}
        </div>
        <p className="text-xs text-foreground/50 mt-2">تأكد من وجود موافقة قبل نشر صور فيها وجوه أطفال واضحة.</p>
      </div>

      <label className="block">
        <span className="block mb-1 text-sm text-foreground/70">رابط المنشور على السوشيال (اختياري)</span>
        <input
          dir="ltr"
          value={draft.link}
          onChange={(event) => update({ link: event.target.value })}
          placeholder="https://www.instagram.com/p/…"
          className={inputClass}
        />
      </label>

      {error && <p className="rounded-xl bg-rose-50 text-rose-700 p-3 text-sm">{error}</p>}

      <div className="flex flex-wrap gap-3 pt-2">
        {role === 'admin' ? (
          <button type="button" className={primaryButton} disabled={busy} onClick={() => save('publish')}>
            نشر على الموقع
          </button>
        ) : (
          <button type="button" className={primaryButton} disabled={busy} onClick={() => save('submit')}>
            إرسال للموافقة
          </button>
        )}
        <button type="button" className={secondaryButton} disabled={busy} onClick={() => save('draft')}>
          حفظ كمسودة
        </button>
        <button type="button" className={secondaryButton} disabled={saving} onClick={onCancel}>
          إلغاء
        </button>
      </div>
    </div>
  );
}

// ---------- sponsored orphans ----------

type SponsoredEntry = { code: string; at: string; by: string };

function OrphansPanel() {
  const [query, setQuery] = useState('');
  const [found, setFound] = useState<{ code: string; description: string; alreadySponsored: boolean } | null>(null);
  const [entries, setEntries] = useState<SponsoredEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const data = await call('sponsored');
      setEntries(data.entries ?? []);
    } catch (loadError) {
      setError(messageFor(loadError));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const lookup = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    setFound(null);
    try {
      setFound(await call('orphan-lookup', { query }));
    } catch (lookupError) {
      setError(messageFor(lookupError));
    } finally {
      setBusy(false);
    }
  };

  const setSponsored = async (code: string, sponsored: boolean) => {
    setBusy(true);
    setError('');
    try {
      await call(sponsored ? 'orphan-sponsored' : 'orphan-available', { code });
      setMessage(
        sponsored
          ? `تم إخفاء الملف ${code} من صفحة الكفالة. يختفي من الموقع خلال دقيقة تقريبًا.`
          : `تمت إعادة الملف ${code} إلى صفحة الكفالة. يظهر خلال دقيقة تقريبًا.`
      );
      setFound(null);
      setQuery('');
      await load();
    } catch (failure) {
      setError(messageFor(failure));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl">تمت كفالة يتيم</h2>
        <p className="text-foreground/70 text-sm leading-relaxed">
          اكتب رمز الملف أو رقم هوية اليتيم. ستظهر لك بياناته المختصرة للتأكد، ثم يُخفى من صفحة «كفالة يتيم» على الموقع. لا يتغيّر شيء في جدول الأيتام نفسه.
        </p>
        <form onSubmit={lookup} className="flex flex-wrap gap-3">
          <input
            dir="ltr"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="JZQOBYK أو رقم الهوية"
            className={`${inputClass} flex-1 min-w-[220px]`}
            autoComplete="off"
          />
          <button type="submit" className={primaryButton} disabled={busy || query.trim().length < 3}>
            {busy ? 'جارٍ البحث…' : 'بحث'}
          </button>
        </form>

        {found && (
          <div className="rounded-xl border border-black/10 p-4 space-y-3">
            <div className="font-medium" dir="ltr">
              {found.code}
            </div>
            {found.description && (
              <p dir="auto" className="text-sm text-foreground/70 text-start">
                {found.description}
              </p>
            )}
            {found.alreadySponsored ? (
              <p className="text-sm text-amber-800">هذا الملف مخفي من الموقع مسبقًا.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                <button type="button" className={primaryButton} disabled={busy} onClick={() => setSponsored(found.code, true)}>
                  تأكيد: تمت كفالته، أخفِه من الموقع
                </button>
                <button type="button" className={secondaryButton} disabled={busy} onClick={() => setFound(null)}>
                  إلغاء
                </button>
              </div>
            )}
          </div>
        )}

        {message && <p className="rounded-xl bg-emerald-50 text-emerald-800 p-3 text-sm">{message}</p>}
        {error && <p className="rounded-xl bg-rose-50 text-rose-700 p-3 text-sm">{error}</p>}
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
        <h3 className="p-5 pb-3 font-medium">الملفات المخفية لأنها كُفلت ({entries.length})</h3>
        {entries.length === 0 ? (
          <p className="px-5 pb-5 text-foreground/60 text-sm">لا يوجد ملفات مخفية بعد.</p>
        ) : (
          <div className="divide-y divide-black/5">
            {entries.map((entry) => (
              <div key={entry.code} className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span className="font-medium" dir="ltr">
                    {entry.code}
                  </span>
                  <span className="text-foreground/60">{formatDate(entry.at)}</span>
                  <span className="text-foreground/50" dir="ltr">
                    {entry.by}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  className="rounded-lg bg-black/5 px-3 py-1.5"
                  onClick={() => {
                    if (window.confirm(`إعادة الملف ${entry.code} إلى صفحة الكفالة؟`)) {
                      void setSponsored(entry.code, false);
                    }
                  }}
                >
                  إعادته للموقع
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Trahom app launch sign-ups ----------

type AppSignup = { id: string; email: string; language: string; at: string; sentAt: string };

const LANGUAGE_NAMES: Record<string, string> = { AR: 'العربية', EN: 'English', TR: 'Türkçe' };

const downloadCsv = (rows: AppSignup[]) => {
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const lines = [['email', 'language', 'signed_up_at', 'sent_at'], ...rows.map((row) => [row.email, row.language, row.at, row.sentAt])]
    .map((line) => line.map(escape).join(','))
    .join('\r\n');
  const blob = new Blob(['﻿' + lines], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `trahom-app-signups-${today()}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

function AppSignupsPanel() {
  const [signups, setSignups] = useState<AppSignup[]>([]);
  const [playUrl, setPlayUrl] = useState('');
  const [appStoreUrl, setAppStoreUrl] = useState('');
  const [batchSize, setBatchSize] = useState(90);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const data = await call('app-signups');
      setSignups(data.signups ?? []);
      setPlayUrl((current) => current || data.playUrl || '');
      setAppStoreUrl((current) => current || data.appStoreUrl || '');
      setBatchSize(data.batchSize ?? 90);
    } catch (loadError) {
      setError(messageFor(loadError));
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const waiting = signups.filter((item) => !item.sentAt).length;

  const send = async () => {
    const count = Math.min(waiting, batchSize);
    if (!window.confirm(`سيتم إرسال رابط التطبيق إلى ${count} شخصًا الآن، كلٌّ بلغته. لا يمكن التراجع عن الإرسال. متابعة؟`)) {
      return;
    }
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const result = await call('app-launch-send', { playUrl: playUrl.trim(), appStoreUrl: appStoreUrl.trim() });
      setMessage(
        result.remaining > 0
          ? `تم الإرسال إلى ${result.sent} شخصًا. بقي ${result.remaining}؛ اضغط «إرسال» مرة أخرى غدًا (حدّ الإرسال اليومي).`
          : `تم الإرسال إلى ${result.sent} شخصًا. وصل الرابط للجميع.`
      );
      await load();
    } catch (sendError) {
      setError(messageFor(sendError));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (item: AppSignup | null) => {
    const question = item
      ? `حذف ${item.email} من القائمة نهائيًا؟`
      : `حذف القائمة كاملة (${signups.length} بريدًا) نهائيًا؟ يُنصح بذلك بعد إرسال رابط التطبيق للجميع.`;
    if (!window.confirm(question)) {
      return;
    }
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await call('app-signup-delete', item ? { id: item.id } : { all: true });
      setMessage(item ? 'تم الحذف.' : 'تم حذف القائمة كاملة.');
      if (!item) {
        setPlayUrl('');
        setAppStoreUrl('');
      }
      await load();
    } catch (deleteError) {
      setError(messageFor(deleteError));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl">المهتمون بتطبيق تراحم</h2>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={secondaryButton} disabled={!signups.length} onClick={() => downloadCsv(signups)}>
              تنزيل CSV
            </button>
          </div>
        </div>
        <p className="text-foreground/70 text-sm leading-relaxed">
          من سجّلوا بريدهم في قسم «قريبًا على Google Play و App Store» على الصفحة الرئيسية. هذه القائمة تظهر هنا فقط، ولا تظهر لزوار الموقع.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-[#103b51]/10 text-[#103b51] px-3 py-1">المجموع: {signups.length}</span>
          <span className="rounded-full bg-amber-100 text-amber-900 px-3 py-1">بانتظار رابط التطبيق: {waiting}</span>
          <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1">وصلهم الرابط: {signups.length - waiting}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h3 className="font-medium">يوم الإطلاق: أرسل رابط التطبيق</h3>
        <p className="text-foreground/70 text-sm leading-relaxed">
          ضع رابط التطبيق على المتجرين (أو أحدهما)، ثم اضغط «إرسال». تصل لكل شخص رسالة واحدة بلغته فيها الرابط. يُرسَل حتى {batchSize} رسالة في كل مرة بسبب حدّ الإرسال اليومي؛ إن بقي أحد، اضغط مرة أخرى في اليوم التالي، ولن تصل الرسالة لأحد مرتين.
        </p>
        <label className="block space-y-1">
          <span className="text-sm text-foreground/70">رابط Google Play</span>
          <input
            dir="ltr"
            value={playUrl}
            onChange={(event) => setPlayUrl(event.target.value)}
            placeholder="https://play.google.com/store/apps/details?id=…"
            className={inputClass}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-foreground/70">رابط App Store</span>
          <input
            dir="ltr"
            value={appStoreUrl}
            onChange={(event) => setAppStoreUrl(event.target.value)}
            placeholder="https://apps.apple.com/app/…"
            className={inputClass}
          />
        </label>
        <button
          type="button"
          className={primaryButton}
          disabled={busy || waiting === 0 || (!playUrl.trim() && !appStoreUrl.trim())}
          onClick={send}
        >
          {busy ? 'جارٍ…' : waiting === 0 ? 'لا يوجد من ينتظر الرابط' : `إرسال إلى ${Math.min(waiting, batchSize)} شخصًا`}
        </button>
        {message && <p className="rounded-xl bg-emerald-50 text-emerald-800 p-3 text-sm">{message}</p>}
        {error && <p className="rounded-xl bg-rose-50 text-rose-700 p-3 text-sm">{error}</p>}
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-5 pb-3 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-medium">القائمة ({signups.length})</h3>
          {signups.length > 0 && (
            <button type="button" disabled={busy} className="text-sm rounded-lg text-rose-700 px-3 py-1.5 hover:bg-rose-50" onClick={() => remove(null)}>
              حذف القائمة كاملة
            </button>
          )}
        </div>
        {!loaded ? (
          <p className="px-5 pb-5 text-foreground/60 text-sm">جارٍ التحميل…</p>
        ) : signups.length === 0 ? (
          <p className="px-5 pb-5 text-foreground/60 text-sm">لم يسجّل أحد بعد.</p>
        ) : (
          <div className="divide-y divide-black/5">
            {signups.map((item) => (
              <div key={item.id} className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                <div className="flex flex-wrap gap-x-4 gap-y-1 items-center">
                  <span className="font-medium" dir="ltr">
                    {item.email}
                  </span>
                  <span className="text-foreground/60">{LANGUAGE_NAMES[item.language] ?? item.language}</span>
                  <span className="text-foreground/50">{formatDate(item.at)}</span>
                  {item.sentAt && <span className="text-xs rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5">وصله الرابط</span>}
                </div>
                <button type="button" disabled={busy} className="rounded-lg bg-black/5 px-3 py-1.5" onClick={() => remove(item)}>
                  حذف
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- main ----------

export function AdminApp() {
  const [user, setUser] = useState<{ email: string; role: Role } | null | undefined>(undefined);
  const [configError, setConfigError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [editing, setEditing] = useState<Draft | null>(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState('');
  const [view, setView] = useState<'posts' | 'orphans' | 'app' | 'audit'>('posts');
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);

  const loadPosts = useCallback(async () => {
    try {
      const data = await call('posts');
      setPosts(data.posts ?? []);
    } catch (loadError) {
      if (loadError instanceof ApiError && loadError.status === 401) {
        setUser(null);
      } else {
        setError(messageFor(loadError));
      }
    }
  }, []);

  useEffect(() => {
    call('me')
      .then((data) => {
        setUser({ email: data.email, role: data.role });
        if (window.location.search) {
          window.history.replaceState(null, '', '/admin');
        }
      })
      .catch((meError) => {
        if (meError instanceof ApiError && meError.code === 'not-configured') {
          setConfigError(true);
        }
        setUser(null);
      });
  }, []);

  useEffect(() => {
    if (user) {
      void loadPosts();
    }
  }, [user, loadPosts]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: posts.length };
    for (const post of posts) {
      result[post.status] = (result[post.status] ?? 0) + 1;
    }
    return result;
  }, [posts]);

  if (user === undefined) {
    return <div className="min-h-screen flex items-center justify-center text-foreground/60">جارٍ التحميل…</div>;
  }
  if (configError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center text-foreground/70">
        اللوحة غير مُعدّة بعد على الخادم. راجع إعدادات Vercel.
      </div>
    );
  }
  if (!user) {
    return <SignIn onSignedIn={setUser} />;
  }

  const changeStatus = async (post: Post, status: Status) => {
    setBusyId(post.id);
    setError('');
    try {
      await call('status', { id: post.id, status, updatedAt: post.updatedAt });
      setNotice(status === 'published' ? 'تم النشر على الموقع.' : status === 'hidden' ? 'تم إخفاء المنشور من الموقع.' : 'تم التحديث.');
      await loadPosts();
    } catch (statusError) {
      setError(messageFor(statusError));
      if (statusError instanceof ApiError && statusError.code === 'changed') {
        await loadPosts();
      }
    } finally {
      setBusyId('');
    }
  };

  const remove = async (post: Post) => {
    if (!window.confirm('حذف هذا المنشور نهائيًا مع صوره؟')) {
      return;
    }
    setBusyId(post.id);
    setError('');
    try {
      await call('delete', { id: post.id });
      setNotice('تم حذف المنشور.');
      await loadPosts();
    } catch (deleteError) {
      setError(messageFor(deleteError));
    } finally {
      setBusyId('');
    }
  };

  const logout = async () => {
    await call('logout', {}).catch(() => undefined);
    setUser(null);
  };

  const openAudit = async () => {
    setView('audit');
    try {
      const data = await call('audit');
      setAuditEntries(data.entries ?? []);
    } catch (auditError) {
      setError(messageFor(auditError));
    }
  };

  const isAdmin = user.role === 'admin';
  const canEdit = (post: Post) => isAdmin || (post.createdBy === user.email && (post.status === 'draft' || post.status === 'pending'));
  const visible = posts.filter((post) => filter === 'all' || post.status === filter);

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      <header className="bg-[#103b51] text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="" className="w-8 h-8 rounded" />
            <div>
              <div className="font-medium">لوحة موقع تراحم</div>
              <div className="text-xs text-white/70" dir="ltr">
                {user.email} · {isAdmin ? 'مدير' : 'محرر'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white px-3 py-2">
              عرض الموقع ↗
            </a>
            <button type="button" onClick={logout} className="text-sm bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2">
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setView('posts')}
              className={`rounded-lg px-4 py-2 ${view === 'posts' ? 'bg-white shadow-sm' : 'text-foreground/60'}`}
            >
              من الميدان
            </button>
            {isAdmin && (
              <button
                type="button"
                onClick={() => setView('orphans')}
                className={`rounded-lg px-4 py-2 ${view === 'orphans' ? 'bg-white shadow-sm' : 'text-foreground/60'}`}
              >
                الأيتام المكفولون
              </button>
            )}
            {isAdmin && (
              <button
                type="button"
                onClick={() => setView('app')}
                className={`rounded-lg px-4 py-2 ${view === 'app' ? 'bg-white shadow-sm' : 'text-foreground/60'}`}
              >
                المهتمون بالتطبيق
              </button>
            )}
            {isAdmin && (
              <button
                type="button"
                onClick={openAudit}
                className={`rounded-lg px-4 py-2 ${view === 'audit' ? 'bg-white shadow-sm' : 'text-foreground/60'}`}
              >
                سجل النشاط
              </button>
            )}
          </div>
          {view === 'posts' && !editing && (
            <button
              type="button"
              className={primaryButton}
              onClick={() => {
                setNotice('');
                setEditing(emptyDraft());
              }}
            >
              + منشور جديد
            </button>
          )}
        </div>

        {notice && <p className="rounded-xl bg-emerald-50 text-emerald-800 p-3">{notice}</p>}
        {error && <p className="rounded-xl bg-rose-50 text-rose-700 p-3">{error}</p>}

        {view === 'orphans' ? (
          <OrphansPanel />
        ) : view === 'app' ? (
          <AppSignupsPanel />
        ) : view === 'audit' ? (
          <div className="bg-white rounded-2xl shadow-sm divide-y divide-black/5">
            {auditEntries.length === 0 && <p className="p-6 text-foreground/60">لا يوجد نشاط بعد.</p>}
            {auditEntries.map((entry) => (
              <div key={`${entry.at}-${entry.action}`} className="p-4 text-sm flex flex-wrap gap-x-4 gap-y-1">
                <span className="text-foreground/60">{formatDate(entry.at)}</span>
                <span dir="ltr">{entry.email}</span>
                <span className="font-medium">{entry.action}</span>
                {entry.detail && <span className="text-foreground/60">{entry.detail}</span>}
              </div>
            ))}
          </div>
        ) : editing ? (
          <PostForm
            key={editing.id ?? 'new'}
            role={user.role}
            initial={editing}
            onCancel={() => setEditing(null)}
            onSaved={async (message) => {
              setEditing(null);
              setNotice(message);
              await loadPosts();
            }}
          />
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {(['all', 'pending', 'published', 'draft', 'hidden'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`rounded-full px-4 py-1.5 text-sm ${filter === key ? 'bg-[#103b51] text-white' : 'bg-white'}`}
                >
                  {key === 'all' ? 'الكل' : STATUS_LABELS[key].label} ({counts[key] ?? 0})
                </button>
              ))}
            </div>

            {visible.length === 0 ? (
              <p className="bg-white rounded-2xl p-8 text-center text-foreground/60">لا توجد منشورات هنا بعد.</p>
            ) : (
              <div className="space-y-3">
                {visible.map((post) => {
                  const title = post.titleAr || post.titleEn || post.titleTr;
                  const busy = busyId === post.id;
                  return (
                    <div key={post.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-4">
                      {post.images[0] ? (
                        <img src={post.images[0]} alt="" className="w-24 h-20 rounded-xl object-cover shrink-0" />
                      ) : (
                        <div className="w-24 h-20 rounded-xl bg-black/5 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs rounded-full px-2.5 py-1 ${STATUS_LABELS[post.status].className}`}>
                            {STATUS_LABELS[post.status].label}
                          </span>
                          <span className="text-xs text-foreground/60">{formatDate(post.date)}</span>
                          <span className="text-xs text-foreground/50" dir="ltr">
                            {post.createdBy}
                          </span>
                        </div>
                        <div dir="auto" className="font-medium truncate text-start">
                          {title}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {canEdit(post) && (
                            <button
                              type="button"
                              disabled={busy}
                              className="text-sm rounded-lg bg-black/5 px-3 py-1.5"
                              onClick={() => {
                                setNotice('');
                                setEditing({
                                  id: post.id,
                                  date: post.date,
                                  governorate: post.governorate,
                                  titleAr: post.titleAr,
                                  titleEn: post.titleEn,
                                  titleTr: post.titleTr,
                                  textAr: post.textAr,
                                  textEn: post.textEn,
                                  textTr: post.textTr,
                                  images: post.images,
                                  link: post.link
                                });
                              }}
                            >
                              تعديل
                            </button>
                          )}
                          {isAdmin && post.status !== 'published' && (
                            <button
                              type="button"
                              disabled={busy}
                              className="text-sm rounded-lg bg-emerald-600 text-white px-3 py-1.5"
                              onClick={() => changeStatus(post, 'published')}
                            >
                              {post.status === 'pending' ? 'موافقة ونشر' : 'نشر'}
                            </button>
                          )}
                          {isAdmin && post.status === 'published' && (
                            <button
                              type="button"
                              disabled={busy}
                              className="text-sm rounded-lg bg-amber-100 text-amber-900 px-3 py-1.5"
                              onClick={() => changeStatus(post, 'hidden')}
                            >
                              إخفاء من الموقع
                            </button>
                          )}
                          {isAdmin && post.status === 'pending' && (
                            <button
                              type="button"
                              disabled={busy}
                              className="text-sm rounded-lg bg-black/5 px-3 py-1.5"
                              onClick={() => changeStatus(post, 'draft')}
                            >
                              إرجاع كمسودة
                            </button>
                          )}
                          {canEdit(post) && (
                            <button
                              type="button"
                              disabled={busy}
                              className="text-sm rounded-lg text-rose-700 px-3 py-1.5 hover:bg-rose-50"
                              onClick={() => remove(post)}
                            >
                              حذف
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

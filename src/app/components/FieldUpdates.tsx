import { useEffect, useState, type ComponentType } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin, PlayCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedInIcon, TelegramIcon, TikTokIcon, XIcon } from './icons/SocialIcons';
import { SocialLinks } from './SocialLinks';

type FieldPost = {
  id: string;
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
};

type FieldUpdatesProps = {
  language: string;
  labels: {
    title: string;
    description: string;
    viewOnTemplate: string;
    followLabel: string;
    governorates: Record<string, string>;
  };
};

const PLATFORMS: Array<{ hosts: string[]; name: string; Icon: ComponentType<{ className?: string }> }> = [
  { hosts: ['instagram.com'], name: 'Instagram', Icon: InstagramIcon },
  { hosts: ['tiktok.com'], name: 'TikTok', Icon: TikTokIcon },
  { hosts: ['x.com', 'twitter.com'], name: 'X', Icon: XIcon },
  { hosts: ['facebook.com', 'fb.watch'], name: 'Facebook', Icon: FacebookIcon },
  { hosts: ['linkedin.com'], name: 'LinkedIn', Icon: LinkedInIcon },
  { hosts: ['youtube.com', 'youtu.be'], name: 'YouTube', Icon: PlayCircle },
  { hosts: ['t.me'], name: 'Telegram', Icon: TelegramIcon }
];

const platformOf = (link: string) => {
  try {
    const host = new URL(link).hostname.toLowerCase().replace(/^(www|m|mobile|vm)\./, '');
    return PLATFORMS.find((item) => item.hosts.some((h) => host === h || host.endsWith(`.${h}`))) ?? null;
  } catch {
    return null;
  }
};

const LOCALES: Record<string, string> = { AR: 'ar-u-nu-latn', TR: 'tr-TR', EN: 'en-GB' };

const formatDate = (isoDate: string, language: string) => {
  if (!isoDate) {
    return '';
  }
  return new Intl.DateTimeFormat(LOCALES[language] ?? 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${isoDate}T12:00:00Z`)
  );
};

// Each language falls back to the others, so a post written in one language still shows.
const pick = (post: FieldPost, field: 'title' | 'text', language: string) => {
  const ar = post[`${field}Ar`];
  const en = post[`${field}En`];
  const tr = post[`${field}Tr`];
  if (language === 'AR') {
    return ar || en || tr;
  }
  if (language === 'TR') {
    return tr || en || ar;
  }
  return en || ar || tr;
};

// Posts approved in the website admin (/admin). Hidden entirely while there is nothing to show.
export function FieldUpdates({ language, labels }: FieldUpdatesProps) {
  const [posts, setPosts] = useState<FieldPost[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/field-updates', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.posts)) {
          setPosts(data.posts.slice(0, 6));
        }
      })
      .catch(() => {
        // Leave the section hidden.
      });
    return () => controller.abort();
  }, []);

  if (!posts.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="mt-16"
      aria-labelledby="field-updates-title"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div className="max-w-2xl">
          <h2 id="field-updates-title" className="text-2xl sm:text-3xl tracking-tight mb-2">
            {labels.title}
          </h2>
          <p className="text-foreground/70 leading-relaxed">{labels.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-foreground/60">{labels.followLabel}</span>
          <SocialLinks size="sm" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post) => {
          const title = pick(post, 'title', language);
          const body = pick(post, 'text', language);
          const platform = post.link ? platformOf(post.link) : null;
          const place = labels.governorates[post.governorate] ?? '';
          const image = post.images?.[0];
          return (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden border border-black/5 flex flex-col">
              {image ? (
                <div className="aspect-[4/3] bg-foreground/5 overflow-hidden">
                  <img src={image} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
              ) : null}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground/60">
                  {place && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      {place}
                    </span>
                  )}
                  {place && post.date && <span aria-hidden="true">·</span>}
                  {post.date && <time dateTime={post.date}>{formatDate(post.date, language)}</time>}
                </div>
                {title && (
                  <h3 dir="auto" className="text-lg font-medium leading-snug text-start">
                    {title}
                  </h3>
                )}
                {body && (
                  <p dir="auto" className="text-start text-foreground/80 leading-relaxed line-clamp-4 whitespace-pre-line">
                    {body}
                  </p>
                )}
                {platform && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#e1a226] hover:underline"
                  >
                    <platform.Icon className="w-4 h-4" />
                    {labels.viewOnTemplate.replace('{{platform}}', platform.name)}
                    <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
}

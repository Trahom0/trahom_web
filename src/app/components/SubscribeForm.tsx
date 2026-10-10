import { useEffect, useState, type FormEvent } from 'react';

type SubscribeFormProps = {
  language: string;
  labels: {
    inputPlaceholder: string;
    buttonLabel: string;
    helperText: string;
    successMessage: string;
    errorMessage: string;
  };
};

export function SubscribeForm({ language, labels }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [startedAt, setStartedAt] = useState(0);
  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === 'sending') {
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website, language, elapsedMs: startedAt ? Date.now() - startedAt : undefined })
      });
      if (!response.ok) {
        throw new Error('subscribe failed');
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p className="text-base font-medium text-[#103b51]" role="status">
        {labels.successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="subscribe-email" className="sr-only">
          {labels.inputPlaceholder}
        </label>
        <input
          id="subscribe-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={labels.inputPlaceholder}
          className="flex-1 px-5 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent"
        />
        {/* Hidden from people; bots that fill it are ignored by the server. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          className="sr-only"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-[#e1a226] text-white px-8 py-3 rounded-lg hover:bg-[#c78f1f] transition-colors whitespace-nowrap disabled:opacity-60"
        >
          {labels.buttonLabel}
        </button>
      </div>
      <p className={`text-xs mt-4 ${status === 'error' ? 'text-red-700' : 'text-foreground/50'}`} role={status === 'error' ? 'alert' : undefined}>
        {status === 'error' ? labels.errorMessage : labels.helperText}
      </p>
    </form>
  );
}

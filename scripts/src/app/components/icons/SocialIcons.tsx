type SocialIconProps = {
  className?: string;
};

export function TikTokIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16.8 5.2c-.9-1-1.4-2.2-1.5-3.6h-3.1v13.2a3.1 3.1 0 1 1-2.2-3v-3.2a6.3 6.3 0 1 0 5.3 6.2V8.5c1.1.8 2.5 1.2 4 1.2V6.6c-1.3 0-2.5-.6-3.5-1.4z" />
    </svg>
  );
}

export function TelegramIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21.8 4.2 2.9 11.4c-1.1.4-1.1 1.9 0 2.3l4.6 1.8 1.8 5.7c.3 1 1.6 1.2 2.2.3l2.7-3.9 5.2 3.8c.8.6 1.9.1 2.1-.9l2.7-14.3c.2-1-.7-1.9-1.6-1.6zM8.6 14.4 18 7.8l-7.4 8.4-.3 3.1-1.6-4.8z" />
    </svg>
  );
}

export function XIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.522 11.24h-6.375l-4.99-6.543-5.726 6.543H2.1l7.73-8.835L1.5 2.25h6.539l4.514 5.964L18.244 2.25z" />
      <path d="M16.97 19.63h1.833L7.4 4.292H5.43L16.97 19.63z" />
    </svg>
  );
}

export function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 2.25h10A4.75 4.75 0 0 1 21.75 7v10A4.75 4.75 0 0 1 17 21.75H7A4.75 4.75 0 0 1 2.25 17V7A4.75 4.75 0 0 1 7 2.25zm0 1.5A3.25 3.25 0 0 0 3.75 7v10A3.25 3.25 0 0 0 7 20.25h10A3.25 3.25 0 0 0 20.25 17V7A3.25 3.25 0 0 0 17 3.75H7zm5 3.25a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.1-.6a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22.223 0H1.777C.795 0 0 .774 0 1.727v20.545C0 23.228.795 24 1.777 24h20.446C23.2 24 24 23.228 24 22.272V1.727C24 .774 23.2 0 22.223 0zM7.356 20.452H3.711V9h3.645v11.452zM5.534 7.433a2.111 2.111 0 1 1 0-4.222 2.111 2.111 0 0 1 0 4.222zm14.919 13.019h-3.644v-5.569c0-1.329-.026-3.039-1.853-3.039-1.853 0-2.135 1.445-2.135 2.939v5.669H9.178V9h3.499v1.561h.049c.487-.924 1.677-1.9 3.451-1.9 3.69 0 4.374 2.427 4.374 5.588v6.203z" />
    </svg>
  );
}

export function FacebookIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.691V11.01h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.098 2.794.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
    </svg>
  );
}

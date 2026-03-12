import { socialLinks } from '../routes';
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon, TelegramIcon, XIcon } from './icons/SocialIcons';

type SocialLinksProps = {
  size?: 'sm' | 'md';
  shape?: 'rounded' | 'circle';
  className?: string;
};

const sizeStyles = {
  sm: {
    wrapper: 'w-8 h-8',
    icon: 'w-4 h-4'
  },
  md: {
    wrapper: 'w-12 h-12',
    icon: 'w-5 h-5'
  }
} as const;

const baseLinkClassName =
  'bg-foreground/5 hover:bg-[#e1a226] hover:text-white flex items-center justify-center transition-all';

export function SocialLinks({ size = 'sm', shape = 'circle', className }: SocialLinksProps) {
  const { wrapper, icon } = sizeStyles[size];
  const radiusClassName = shape === 'rounded' ? 'rounded-xl' : 'rounded-full';
  const links = [
    { key: 'facebook', href: socialLinks.facebook, label: 'Facebook', Icon: FacebookIcon },
    { key: 'twitter', href: socialLinks.twitter, label: 'X', Icon: XIcon },
    { key: 'instagram', href: socialLinks.instagram, label: 'Instagram', Icon: InstagramIcon },
    { key: 'linkedin', href: socialLinks.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    { key: 'tiktok', href: socialLinks.tiktok, label: 'TikTok', Icon: TikTokIcon },
    { key: 'telegram', href: socialLinks.telegram, label: 'Telegram', Icon: TelegramIcon }
  ].filter((item) => item.href);

  return (
    <div className={`flex gap-3${className ? ` ${className}` : ''}`}>
      {links.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`${baseLinkClassName} ${wrapper} ${radiusClassName}`}
        >
          <Icon className={icon} />
        </a>
      ))}
    </div>
  );
}

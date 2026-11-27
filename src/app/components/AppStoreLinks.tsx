import { Download } from 'lucide-react';
import { appLinks } from '../appLinks';
import { trackAppDownload } from '../tracking';

type AppStoreLinksProps = {
  placement: string;
  language: string;
  // "dark": white buttons for navy backgrounds; "light": navy buttons for light backgrounds.
  tone?: 'dark' | 'light';
  size?: 'sm' | 'md';
};

// The Google Play and App Store buttons, used wherever the app is promoted on the site.
export function AppStoreLinks({ placement, language, tone = 'light', size = 'md' }: AppStoreLinksProps) {
  const sizing = size === 'sm' ? 'px-4 py-2 text-sm' : 'px-5 py-2.5';
  const colours =
    tone === 'dark'
      ? 'bg-white text-[#103b51] hover:bg-[#fbf1dc] focus-visible:outline-white'
      : 'bg-[#103b51] text-white hover:bg-[#0c2e40] focus-visible:outline-[#e1a226]';
  const className = `inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${sizing} ${colours}`;
  return (
    <div className="flex flex-wrap gap-2">
      <a href={appLinks.googlePlay} target="_blank" rel="noopener noreferrer" className={className} onClick={() => trackAppDownload('google-play', placement, language)}>
        <Download className="w-4 h-4" aria-hidden="true" />
        Google Play
      </a>
      <a href={appLinks.appStore} target="_blank" rel="noopener noreferrer" className={className} onClick={() => trackAppDownload('app-store', placement, language)}>
        <Download className="w-4 h-4" aria-hidden="true" />
        App Store
      </a>
    </div>
  );
}

import { campaigns } from './campaigns';
import { careers } from './careers';
import { contact } from './contact';
import { donate } from './donate';
import { familySignup } from './familySignup';
import { footer } from './footer';
import { gallery } from './gallery';
import { header } from './header';
import { home } from './home';
import { impact } from './impact';
import { mission } from './mission';
import { privacy } from './privacy';
import { seo } from './seo';
import { shared } from './shared';
import { sponsorOrphan } from './sponsorOrphan';
import { terms } from './terms';

export const arContent = {
  campaigns,
  careers,
  contact,
  donate,
  familySignup,
  footer,
  gallery,
  header,
  home,
  impact,
  mission,
  privacy,
  seo,
  shared,
  sponsorOrphan,
  terms
} as const;

export type ArContent = typeof arContent;

import { arContent } from './ar';
import { enContent } from './en';
import { trContent } from './tr';

const contentByLanguage = {
  EN: enContent,
  AR: arContent,
  TR: trContent
} as const;

export type Content = typeof enContent;

export let content: Content = enContent;

export const setContentLanguage = (languageCode: string) => {
  content = contentByLanguage[languageCode as keyof typeof contentByLanguage] ?? enContent;
};

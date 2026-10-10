import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { VideoWithRatio } from './VideoWithRatio';
import type { PageKey } from '../routes';
import { cloudinaryVideoPublicIds, cloudinaryVideos, galleryFallbackPublicIds, galleryListUrl, makeCloudinaryVideoUrl } from '../cloudinary';
import { content } from '../../content';
import { PageLayout } from './PageLayout';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface GalleryPageProps {
  onNavigate?: (page: PageKey) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

type ImageKitListResponse = {
  files?: Array<{
    fileId: string;
    name: string;
    filePath: string;
    url: string;
    fileType?: string;
    mime?: string;
    createdAt?: string;
  }>;
};

const stripPublicIdSuffix = (publicId: string) => publicId.replace(/_[a-z0-9]{6}$/i, '');
const stripExtension = (filename: string) => filename.replace(/\.[^/.]+$/, '');

const formatPublicIdLabel = (publicId: string) => {
  const base = stripPublicIdSuffix(stripExtension(publicId)).replace(/[-_]+/g, ' ').trim();
  return base.replace(/\b\w/g, (char) => char.toUpperCase());
};

const fallbackGalleryItems = galleryFallbackPublicIds.slice(1).map((publicId) => ({
  src: makeCloudinaryVideoUrl(publicId),
  label: formatPublicIdLabel(publicId),
  publicId
}));

export function GalleryPage({ onNavigate, language, onLanguageChange }: GalleryPageProps) {
  const galleryContent = content.gallery;
  const [galleryItems, setGalleryItems] = useState(fallbackGalleryItems);
  const [featuredVideoSrc, setFeaturedVideoSrc] = useState(cloudinaryVideos.galleryFeatured);

  useEffect(() => {
    let isMounted = true;

    fetch(galleryListUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load gallery list');
        }
        return response.json() as Promise<ImageKitListResponse>;
      })
      .then((data) => {
        if (!isMounted || !data.files?.length) {
          return;
        }

        const seenBaseIds = new Set<string>();
        const items = data.files
          .filter((resource) => resource.fileType === 'video')
          .sort((a, b) => {
            const aTime = new Date(a.createdAt ?? 0).getTime();
            const bTime = new Date(b.createdAt ?? 0).getTime();
            return bTime - aTime;
          })
          .filter((resource) => {
            const baseId = stripPublicIdSuffix(stripExtension(resource.name));
            if (seenBaseIds.has(baseId)) {
              return false;
            }
            seenBaseIds.add(baseId);
            return true;
          })
          .map((resource) => ({
            src: resource.url,
            label: formatPublicIdLabel(resource.name),
            publicId: resource.fileId
          }));

        if (items.length) {
          const [first, ...rest] = items;
          setFeaturedVideoSrc(first.src);
          setGalleryItems(rest.length ? rest : items);
        }
      })
      .catch(() => {
        if (isMounted) {
          setGalleryItems(fallbackGalleryItems);
          setFeaturedVideoSrc(cloudinaryVideos.galleryFeatured);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout
      header={
        <SiteHeader
          onNavigate={onNavigate}
          activePage="gallery"
          language={language}
          onLanguageChange={onLanguageChange}
        />
      }
      footer={<SiteFooter onNavigate={onNavigate} language={language} />}
    >
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#e1a226]/10 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium text-[#e1a226]">{galleryContent.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              {galleryContent.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {galleryContent.hero.description}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <VideoWithRatio
              src={featuredVideoSrc}
              label={galleryContent.featured.videoLabel}
              className="w-full h-full object-cover"
              wrapperClassName="w-full"
              controls
              playsInline
              preload="metadata"
            />
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl tracking-tight">{galleryContent.featured.title}</h2>
            </div>
          </div>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap: '1.5rem' }}>
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.publicId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: index * 0.05 }}
              className="mb-6 bg-white rounded-2xl overflow-hidden shadow-sm"
              style={{ breakInside: 'avoid' }}
            >
              <VideoWithRatio
                src={item.src}
                label={`${galleryContent.hero.title} (${index + 1})`}
                className="w-full h-full object-cover"
                wrapperClassName="w-full"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </motion.div>
          ))}
        </div>
    </PageLayout>
  );
}

import { ArrowRight } from 'lucide-react';
import { content } from '../../content';
import { formatTemplate } from '../../content/utils';
import { ImageWithFallback } from './figma/ImageWithFallback';

type ClickEvent = {
  preventDefault: () => void;
  stopPropagation?: () => void;
};

interface CampaignCardProps {
  image: string;
  imageAlt?: string;
  imageSrcSet?: string;
  imageSizes?: string;
  title: string;
  description: string;
  goal: string;
  percentage: number;
  color: string;
  primaryBadge?: string;
  videoSrc?: string;
  videoType?: string;
  donateLabel?: string;
  donateHref?: string;
  onDonateClick?: (event: ClickEvent) => void;
  sponsorLabel?: string;
  sponsorHref?: string;
  onSponsorClick?: (event: ClickEvent) => void;
  onCardClick?: (event: ClickEvent) => void;
}

export function CampaignCard({
  image,
  imageAlt,
  imageSrcSet,
  imageSizes,
  title,
  description,
  goal,
  percentage,
  color,
  primaryBadge,
  videoSrc,
  videoType,
  donateLabel,
  donateHref,
  onDonateClick,
  sponsorLabel,
  sponsorHref,
  onSponsorClick,
  onCardClick
}: CampaignCardProps) {
  const primaryBadgeText =
    primaryBadge ?? formatTemplate(content.shared.campaignCard.fundedTemplate, { percent: percentage });
  const hasVideo = Boolean(videoSrc);
  const primaryCtaLabel = donateLabel ?? content.shared.campaignCard.donateLabel;
  const secondaryCtaLabel = sponsorLabel ?? content.shared.campaignCard.sponsorLabel;
  const showSponsorCta = Boolean(sponsorHref || onSponsorClick || sponsorLabel);
  const imageAltText =
    imageAlt ?? formatTemplate(content.shared.campaignCard.imageAltTemplate, { title });
  const resolvedImageSizes =
    imageSizes ?? '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';
  const ctaClassName =
    'bg-white/95 backdrop-blur-sm text-foreground px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-white transition-all flex items-center gap-2 group shadow-lg text-sm sm:text-base';
  const isCardClickable = Boolean(onCardClick);

  const renderCta = (
    label: string,
    href: string | undefined,
    onClick: ((event: ClickEvent) => void) | undefined,
    className: string
  ) => {
    const handleClick = (event: ClickEvent) => {
      event.stopPropagation?.();
      onClick?.(event);
    };
    const content = (
      <>
        <span className="font-medium">{label}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </>
    );

    if (href) {
      return (
        <a href={href} onClick={handleClick} className={className}>
          {content}
        </a>
      );
    }

    return (
      <button type="button" onClick={handleClick} className={className}>
        {content}
      </button>
    );
  };

  return (
    <div
      className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-full flex flex-col ${
        isCardClickable ? 'cursor-pointer' : ''
      }`}
      onClick={isCardClickable ? onCardClick : undefined}
      onKeyDown={
        isCardClickable
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onCardClick?.(event);
              }
            }
          : undefined
      }
      role={isCardClickable ? 'link' : undefined}
      tabIndex={isCardClickable ? 0 : undefined}
      aria-label={isCardClickable ? `Open ${title}` : undefined}
    >
      {/* Top Section - Text Content */}
      <div className={`${color} p-4 sm:p-6 lg:p-8 pb-8 sm:pb-10 lg:pb-12 flex-1 flex flex-col justify-between min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]`}>
        <div className="space-y-3 sm:space-y-4">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium leading-snug break-words text-center">
              {primaryBadgeText}
            </div>
          </div>
          
          {/* Title & Description */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl leading-tight">{title}</h3>
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{description}</p>
        </div>
      </div>
      
      {/* Bottom Section - Image with Button */}
      <div className="relative aspect-[4/3] -mt-8">
        <div className="absolute inset-0 rounded-t-3xl overflow-hidden">
          {hasVideo ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={image}
              aria-label={imageAltText}
            >
              <source src={videoSrc} type={videoType ?? 'video/mp4'} />
            </video>
          ) : (
            <ImageWithFallback 
              src={image} 
              alt={imageAltText}
              srcSet={imageSrcSet}
              sizes={resolvedImageSizes}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {/* Overlay Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
          <div className="flex items-center justify-between gap-3 w-full">
            {renderCta(
              primaryCtaLabel,
              donateHref,
              onDonateClick,
              ctaClassName
            )}
            {showSponsorCta
              ? renderCta(
                  secondaryCtaLabel,
                  sponsorHref,
                  onSponsorClick,
                  ctaClassName
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

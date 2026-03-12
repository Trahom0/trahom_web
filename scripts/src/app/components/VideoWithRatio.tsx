import { useState } from 'react';

interface VideoWithRatioProps extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'> {
  src: string;
  label: string;
  wrapperClassName?: string;
  fallbackRatio?: number;
}

export function VideoWithRatio({
  src,
  label,
  wrapperClassName,
  fallbackRatio = 16 / 9,
  className,
  onLoadedMetadata,
  ...props
}: VideoWithRatioProps) {
  const [ratio, setRatio] = useState(fallbackRatio);

  const handleLoadedMetadata = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const { videoWidth, videoHeight } = event.currentTarget;

    if (videoWidth && videoHeight) {
      setRatio(videoWidth / videoHeight);
    }

    onLoadedMetadata?.(event);
  };

  return (
    <div className={wrapperClassName} style={{ aspectRatio: ratio }}>
      <video
        className={className}
        aria-label={label}
        onLoadedMetadata={handleLoadedMetadata}
        {...props}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

import { useState } from 'react';
import { LazyVideo } from './LazyVideo';

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
  autoPlay,
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

  // Background (auto-playing) videos load only when they come into view.
  if (autoPlay) {
    const { preload: _preload, loop: _loop, muted: _muted, playsInline: _playsInline, ...rest } = props;
    return (
      <div className={wrapperClassName} style={{ aspectRatio: ratio }}>
        <LazyVideo
          className={className}
          aria-label={label}
          onLoadedMetadata={handleLoadedMetadata}
          src={src}
          {...rest}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClassName} style={{ aspectRatio: ratio }}>
      <video
        key={src}
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

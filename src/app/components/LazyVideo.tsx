import { useEffect, useRef, useState, type VideoHTMLAttributes } from 'react';

type LazyVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'autoPlay' | 'preload'> & {
  src: string;
  type?: string;
};

// A muted, looping background video that only downloads once it is about to scroll into view,
// and pauses while off screen. Saves visitors (especially on mobile data) from loading every
// video on the page up front.
export function LazyVideo({ src, type = 'video/mp4', ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.muted = true;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          video.play().catch(() => undefined);
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (shouldLoad && video) {
      video.load();
      video.play().catch(() => undefined);
    }
  }, [shouldLoad, src]);

  return (
    <video ref={videoRef} muted loop playsInline preload="none" {...props}>
      {shouldLoad ? <source src={src} type={type} /> : null}
    </video>
  );
}

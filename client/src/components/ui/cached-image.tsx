import { useState, useEffect } from "react";
import { useCachedImage } from "@/lib/imageCache";
import { Skeleton } from "@/components/ui/skeleton";

interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
}

/**
 * Component that displays images with caching functionality
 * It will show a loading skeleton while the image is being cached
 * and can fallback to a placeholder if the image fails to load
 */
export function CachedImage({
  src,
  alt = "",
  fallbackSrc,
  showSkeleton = true,
  className = "",
  ...props
}: CachedImageProps) {
  const { cachedUrl, isLoading } = useCachedImage(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state when source changes
    setHasError(false);
  }, [src]);

  // Determine which URL to use
  const imageUrl = hasError && fallbackSrc ? fallbackSrc : cachedUrl;

  const handleError = () => {
    setHasError(true);
    if (!fallbackSrc) {
      console.warn(`Image failed to load: ${src}`);
    }
  };

  // Return skeleton while loading if enabled
  if (isLoading && showSkeleton) {
    return (
      <Skeleton 
        className={`${className} bg-gray-700/50 animate-pulse`}
        {...props} 
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
}
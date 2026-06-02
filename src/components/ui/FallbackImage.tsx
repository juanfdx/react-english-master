import React, { useState, useMemo } from 'react';

type Props = {
  src?: string | null;
  alt?: string;
  className?: string;
  fallback?: string;
};


export const FallbackImage: React.FC<Props> = ({
  src,
  alt = "",
  className,
  fallback = "/images/placeholders/no-image.webp",
}) => {
  const [error, setError] = useState(false);

  // Compute the effective source based on src and fallback
  const imgSrc = useMemo(() => {
    if (error) return fallback;
    if (src?.trim()) return src;
    return fallback;
  }, [src, fallback, error]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)} // fallback if broken URL
    />
  );
};
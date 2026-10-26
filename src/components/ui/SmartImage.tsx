'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { BLUR_DATA_URL, FALLBACK_PRODUCT_IMAGE } from '@/lib/constants';

interface SmartImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  fallbackSrc?: string;
}

/**
 * next/image with sensible defaults for this site:
 *  • lazy-loaded automatically (unless `priority`), with a soft blur placeholder
 *  • falls back to a default photo if the file is missing
 */
export function SmartImage({ fallbackSrc = FALLBACK_PRODUCT_IMAGE, src, alt, ...props }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      {...props}
      src={failed ? fallbackSrc : src}
      alt={alt}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      onError={() => setFailed(true)}
    />
  );
}

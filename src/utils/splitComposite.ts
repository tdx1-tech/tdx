/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SplitCompositeResult {
  before: string;
  after: string;
  aspect: string;
}

/** Fractional vertical crop window (0-1) applied within a half before output. */
export type CropWindow = [number, number];

export interface SplitCompositeOptions {
  /** Extra vertical crop applied within the top (before) half, as [top, bottom] fractions of that half's height. */
  beforeCropY?: CropWindow;
  /** Extra vertical crop applied within the bottom (after) half, as [top, bottom] fractions of that half's height. */
  afterCropY?: CropWindow;
}

// In-memory cache for split images to prevent re-processing
const splitCache = new Map<string, SplitCompositeResult>();

function cacheKey(src: string, opts?: SplitCompositeOptions): string {
  if (!opts) return src;
  return `${src}|${opts.beforeCropY?.join(',') ?? ''}|${opts.afterCropY?.join(',') ?? ''}`;
}

/**
 * Slices a vertically stacked before/after clinical photo (before = top half,
 * after = bottom half) into two separate images, so a comparison slider can
 * overlay them in alignment.
 *
 * Some source photos are shot at slightly different zoom levels for the before
 * and after halves, so the subject lands at a different scale/position in each
 * half. beforeCropY/afterCropY let a specific case study tighten the crop on
 * one half to match the other's framing before the halves are handed to an
 * object-cover slider.
 */
export function splitCompositeImage(
  src: string,
  opts?: SplitCompositeOptions
): Promise<SplitCompositeResult> {
  const key = cacheKey(src, opts);
  if (splitCache.has(key)) {
    return Promise.resolve(splitCache.get(key)!);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const halfHeight = Math.floor(height / 2);

      const drawHalf = (offsetY: number, crop?: CropWindow) => {
        const [topFrac, bottomFrac] = crop ?? [0, 1];
        const cropTop = Math.round(halfHeight * topFrac);
        const cropHeight = Math.round(halfHeight * (bottomFrac - topFrac));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = cropHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            img,
            0, offsetY + cropTop, width, cropHeight,
            0, 0, width, cropHeight
          );
        }
        return { url: canvas.toDataURL('image/jpeg', 0.95), height: cropHeight };
      };

      const before = drawHalf(0, opts?.beforeCropY);
      const after = drawHalf(halfHeight, opts?.afterCropY);

      const ratio = width / before.height;
      const aspectStr = ratio > 1.2 ? 'aspect-[4/3]' : ratio > 0.9 ? 'aspect-square' : 'aspect-[3/4]';

      const result = { before: before.url, after: after.url, aspect: aspectStr };
      splitCache.set(key, result);
      resolve(result);
    };
    img.onerror = reject;
    img.src = src;
  });
}

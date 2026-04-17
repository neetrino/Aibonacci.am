'use client';

import Image from 'next/image';
import { useState } from 'react';

const AVATAR_RING_CLASS = 'ring-2 ring-white/10';

type AccountUserAvatarProps = {
  /** Used for initials fallback and accessible name when no photo. */
  label: string;
  imageUrl?: string | null;
  size: 'md' | 'xl';
};

const SIZE_CLASSES: Record<AccountUserAvatarProps['size'], string> = {
  md: 'h-11 w-11 text-xs',
  xl: 'h-24 w-24 text-2xl',
};

export function AccountUserAvatar({ imageUrl, label, size }: AccountUserAvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = label.trim().slice(0, 2).toUpperCase() || '?';
  const showImg = Boolean(imageUrl) && !imgFailed;
  const dim = size === 'xl' ? 96 : 44;

  if (showImg && imageUrl) {
    return (
      <Image
        alt=""
        className={`${SIZE_CLASSES[size]} rounded-full object-cover ${AVATAR_RING_CLASS}`}
        height={dim}
        referrerPolicy="no-referrer"
        src={imageUrl}
        unoptimized
        width={dim}
        onError={() => setImgFailed(true)}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`flex ${SIZE_CLASSES[size]} shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/80 to-violet-700/90 font-bold uppercase leading-none text-white ${AVATAR_RING_CLASS}`}
    >
      {initials}
    </div>
  );
}

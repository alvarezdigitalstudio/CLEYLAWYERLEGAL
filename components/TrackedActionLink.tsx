'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackSxoEvent, type SxoEventContext, type SxoEventName } from '@/lib/analytics';

interface TrackedActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: SxoEventName;
  eventParams?: SxoEventContext;
  children: ReactNode;
}

export function TrackedActionLink({
  eventName,
  eventParams,
  onClick,
  children,
  ...rest
}: TrackedActionLinkProps) {
  return (
    <a
      {...rest}
      onClick={(event) => {
        trackSxoEvent(eventName, eventParams);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}

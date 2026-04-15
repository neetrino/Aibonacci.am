import type { ReactNode } from 'react';

/** Centered column + padding for workspace pages that are not full-bleed (e.g. home, account). */
const APP_MAIN_CONSTRAINED_CLASS =
  'mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col px-6 py-8';

type AppMainConstrainedProps = {
  children: ReactNode;
};

export function AppMainConstrained({ children }: AppMainConstrainedProps) {
  return <div className={APP_MAIN_CONSTRAINED_CLASS}>{children}</div>;
}

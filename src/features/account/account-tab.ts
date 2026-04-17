export const ACCOUNT_TAB_VALUES = ['profile', 'preferences'] as const;

export type AccountTab = (typeof ACCOUNT_TAB_VALUES)[number];

/** Default tab when `tab` query is missing or invalid. */
export const DEFAULT_ACCOUNT_TAB: AccountTab = 'profile';

export function parseAccountTab(raw: string | undefined): AccountTab {
  if (raw === 'preferences') return 'preferences';
  return DEFAULT_ACCOUNT_TAB;
}

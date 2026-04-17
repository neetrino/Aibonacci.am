import { WORKSPACE_GHOST_BTN_CLASS } from '@/shared/ui/workspace-ui';

export const ACCOUNT_SIGN_OUT_BTN_CLASS = `${WORKSPACE_GHOST_BTN_CLASS} border-red-500/20 text-red-300/90 hover:border-red-500/40 hover:bg-red-950/25 hover:text-red-200`;

const NAV_BASE =
  'flex w-full items-center rounded-lg px-3 py-2.5 text-sm transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500/35';

export const ACCOUNT_NAV_LINK_IDLE_CLASS = `${NAV_BASE} text-neutral-400 hover:bg-white/[0.06] hover:text-neutral-200`;

export const ACCOUNT_NAV_LINK_ACTIVE_CLASS = `${NAV_BASE} border border-white/[0.08] bg-white/[0.06] font-medium text-white`;

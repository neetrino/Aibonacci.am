/**
 * Calm dark workspace — ChatGPT-like: neutral greys, hairline borders, violet only for primary CTAs.
 */
export const WORKSPACE_PANEL_CLASS =
  'rounded-2xl border border-white/[0.08] bg-workspace-elevated shadow-none';

export const WORKSPACE_H2_CLASS = 'text-lg font-semibold text-neutral-100';

export const WORKSPACE_BODY_CLASS = 'text-sm text-neutral-400';

export const WORKSPACE_LABEL_CLASS = 'text-sm font-medium text-neutral-300';

/** Inputs and textareas on dark workspace surfaces */
export const WORKSPACE_FIELD_CLASS =
  'rounded-lg border border-white/10 bg-workspace-canvas px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 shadow-none focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25';

export const WORKSPACE_PRIMARY_BTN_CLASS =
  'rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-white disabled:opacity-60';

export const WORKSPACE_ACCENT_BTN_CLASS =
  'rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-violet-500 disabled:opacity-60';

export const WORKSPACE_GHOST_BTN_CLASS =
  'rounded-lg border border-white/10 bg-neutral-800/80 px-3 py-1.5 text-sm text-neutral-200 transition hover:border-white/15 hover:bg-neutral-800 disabled:opacity-60';

export const WORKSPACE_LINK_CLASS =
  'text-sm text-neutral-400 transition hover:text-neutral-200';

/** Sidebar-style selection (minimal color — reads like ChatGPT thread highlight). */
export const WORKSPACE_PHASE_ACTIVE_CLASS =
  'rounded-lg border border-white/[0.06] bg-neutral-800 px-3 py-1 text-sm font-medium text-neutral-100';

export const WORKSPACE_PHASE_IDLE_CLASS =
  'rounded-lg border border-transparent px-3 py-1 text-sm text-neutral-400 transition hover:bg-white/[0.06] hover:text-neutral-200';

export const WORKSPACE_INNER_SCROLL_CLASS =
  'max-h-80 space-y-3 overflow-y-auto rounded-xl border border-white/[0.08] bg-workspace-canvas p-4 text-sm';

export const WORKSPACE_CODE_CLASS =
  'rounded-md bg-neutral-800 px-1.5 py-0.5 font-mono text-xs text-neutral-300';

/** Stacked outer + top specular — shared by toolbar “islands” and project row hover. */
export const WORKSPACE_FLOAT_3D_SHADOW_CLASS =
  'shadow-[0_14px_44px_-18px_rgba(0,0,0,0.72),0_6px_20px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.09)]';

/** Toolbar search/create chips on /app. */
export const WORKSPACE_FLOAT_3D_ISLAND_CLASS =
  `rounded-2xl border-0 bg-neutral-800/55 p-2.5 ${WORKSPACE_FLOAT_3D_SHADOW_CLASS} backdrop-blur-md sm:p-3`;

/**
 * Project list row (default): flat in the list; hover uses the same 3D shadow as toolbar (no translate —
 * lifting caused gaps between rows and cursor flicker when moving to the next item).
 */
export const WORKSPACE_PROJECT_LIST_ROW_HOVER_3D_CLASS =
  'group relative z-0 mx-1 rounded-2xl border-0 px-4 py-3 transition duration-200 ease-out hover:z-[1] hover:bg-neutral-800/55 hover:shadow-[0_14px_44px_-18px_rgba(0,0,0,0.72),0_6px_20px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.09)] hover:backdrop-blur-sm';

'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { PlanPayload } from '@/shared/domain/plan-defaults';
import {
  ACCOUNT_DETAILS_CLASS,
  ACCOUNT_SUMMARY_CHEVRON_CLASS,
  ACCOUNT_SUMMARY_ROW_CLASS,
} from '@/features/account/account-settings-classes';
import { WORKSPACE_BODY_CLASS } from '@/shared/ui/workspace-ui';

const PlanEditorLazy = dynamic(
  () =>
    import('@/features/plan-editor/PlanEditor').then((mod) => ({ default: mod.PlanEditor })),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="mt-3 h-[220px] animate-pulse rounded-lg border border-white/10 bg-neutral-900/50"
      />
    ),
  },
);

export function AccountPlanEditorSection({
  projectId,
  phaseId,
  initialPlan,
}: {
  projectId: string;
  phaseId: string | null;
  initialPlan: PlanPayload;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);

  return (
    <details
      className={ACCOUNT_DETAILS_CLASS}
      onToggle={(e) => {
        const el = e.currentTarget;
        if (el.open) setShouldLoad(true);
      }}
    >
      <summary className={ACCOUNT_SUMMARY_ROW_CLASS}>
        <span>Advanced · plan JSON</span>
        <span aria-hidden className={ACCOUNT_SUMMARY_CHEVRON_CLASS}>
          ▼
        </span>
      </summary>
      <p className={`mt-2 ${WORKSPACE_BODY_CLASS} text-xs`}>
        Raw plan for power users; chat usually updates this automatically. Open to load the editor.
      </p>
      {shouldLoad ? (
        <div className="mt-3">
          <PlanEditorLazy embedded initialPlan={initialPlan} phaseId={phaseId} projectId={projectId} />
        </div>
      ) : null}
    </details>
  );
}

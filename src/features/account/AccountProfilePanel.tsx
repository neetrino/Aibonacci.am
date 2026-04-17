import { WORKSPACE_BODY_CLASS, WORKSPACE_PANEL_CLASS } from '@/shared/ui/workspace-ui';

type AccountProfilePanelProps = {
  email: string;
  name: string | null | undefined;
};

export function AccountProfilePanel({ name, email }: AccountProfilePanelProps) {
  const displayName = name?.trim() || '—';

  return (
    <section className={`${WORKSPACE_PANEL_CLASS} p-5 sm:p-6`}>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Details
      </h2>
      <dl className="grid gap-3 sm:grid-cols-[minmax(0,7rem)_1fr] sm:gap-x-8 sm:gap-y-3">
        <dt className="text-sm text-neutral-500">Name</dt>
        <dd className="text-sm text-neutral-200">{displayName}</dd>
        <dt className="text-sm text-neutral-500">Email</dt>
        <dd className="break-all text-sm text-neutral-200">{email}</dd>
      </dl>
      <p className={`mt-6 max-w-prose ${WORKSPACE_BODY_CLASS} text-xs`}>
        Your name and email come from your account. Sign-in is via email magic link.
      </p>
    </section>
  );
}

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AccountSettingsBlocks } from '@/features/account/AccountSettingsBlocks';
import { signOutAction } from '@/features/auth/auth-actions';
import { listProjectsWithPhasesForAccount } from '@/features/projects/project-queries';
import { DEFAULT_PLAN, parsePlanFromJson, type PlanPayload } from '@/shared/domain/plan';
import { prisma } from '@/shared/lib/prisma';
import { getSession, requireActiveUserId } from '@/shared/lib/session';
import { AppMainConstrained } from '@/shared/ui/AppMainConstrained';
import {
  WORKSPACE_BODY_CLASS,
  WORKSPACE_GHOST_BTN_CLASS,
  WORKSPACE_LINK_CLASS,
  WORKSPACE_PANEL_CLASS,
} from '@/shared/ui/workspace-ui';

function resolvePlanPayload(snapshotPayload: unknown | null): PlanPayload {
  if (!snapshotPayload) return DEFAULT_PLAN;
  try {
    return parsePlanFromJson(snapshotPayload);
  } catch {
    return DEFAULT_PLAN;
  }
}

const SIGN_OUT_BTN_CLASS = `${WORKSPACE_GHOST_BTN_CLASS} border-red-500/20 text-red-300/90 hover:border-red-500/40 hover:bg-red-950/25 hover:text-red-200`;

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; phase?: string }>;
}) {
  const sp = await searchParams;
  if (typeof sp.project === 'string' || typeof sp.phase === 'string') {
    redirect('/app/account');
  }

  const userId = await requireActiveUserId();
  const session = await getSession();
  const projects = await listProjectsWithPhasesForAccount(userId);

  const email = session?.user?.email ?? session?.user?.id ?? 'Account';

  if (projects.length === 0) {
    return (
      <AppMainConstrained>
        <div className="mx-auto w-full max-w-3xl">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-8">
            <Link className={WORKSPACE_LINK_CLASS} href="/app">
              ← All projects
            </Link>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">Account</h1>
              <p className={`mt-2 ${WORKSPACE_BODY_CLASS}`}>
                Signed in as <span className="font-medium text-neutral-200">{email}</span>
              </p>
              <p className={`mt-2 ${WORKSPACE_BODY_CLASS}`}>
                Create a project first — then you can set the AI model and edit plan JSON here.
              </p>
            </div>
          </header>
          <div className="mt-8 flex justify-end">
            <form action={signOutAction}>
              <button className={SIGN_OUT_BTN_CLASS} type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </AppMainConstrained>
    );
  }

  const activeProject = projects[0];
  const activePhaseId =
    activeProject.phases.length > 0 ? activeProject.phases[0].id : null;

  const snapshot = await prisma.planSnapshot.findFirst({
    where: { projectId: activeProject.id, phaseId: activePhaseId },
    orderBy: { updatedAt: 'desc' },
  });
  const plan = resolvePlanPayload(snapshot?.payload ?? null);

  const settingsKey = `${activeProject.id}-${activePhaseId ?? 'none'}`;

  return (
    <AppMainConstrained>
      <div className="mx-auto w-full max-w-3xl">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-8">
          <Link className={WORKSPACE_LINK_CLASS} href="/app">
            ← All projects
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Account</h1>
            <p className={`mt-2 ${WORKSPACE_BODY_CLASS}`}>
              Signed in as <span className="font-medium text-neutral-200">{email}</span>
            </p>
            <p className={`mt-2 max-w-prose ${WORKSPACE_BODY_CLASS}`}>
              AI model applies to your most recently updated project (
              <span className="text-neutral-300">{activeProject.name}</span>
              {activePhaseId ? (
                <>
                  {', '}
                  phase{' '}
                  <span className="text-neutral-300">
                    {activeProject.phases[0]?.label ?? '—'}
                  </span>
                </>
              ) : null}
              ). The plan JSON editor loads only when you expand it.
            </p>
          </div>
        </header>

        <section className={`${WORKSPACE_PANEL_CLASS} mt-8 p-5 sm:p-6`}>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Preferences
          </h2>
          <AccountSettingsBlocks
            key={settingsKey}
            activePhaseId={activePhaseId}
            plan={plan}
            project={{
              id: activeProject.id,
              openaiChatModel: activeProject.openaiChatModel,
            }}
          />
        </section>

        <div className="mt-8 flex justify-end border-t border-white/10 pt-6">
          <form action={signOutAction}>
            <button className={SIGN_OUT_BTN_CLASS} type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </AppMainConstrained>
  );
}

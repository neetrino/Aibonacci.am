import { AppMainConstrained } from '@/shared/ui/AppMainConstrained';
import { WORKSPACE_PANEL_CLASS } from '@/shared/ui/workspace-ui';

export default function AccountLoading() {
  return (
    <AppMainConstrained>
      <div className="mx-auto w-full max-w-3xl animate-pulse">
        <div className="border-b border-white/10 pb-8">
          <div className="mb-4 h-4 w-28 rounded bg-white/10" />
          <div className="mb-2 h-8 w-48 rounded bg-white/10" />
          <div className="mb-2 h-4 w-72 max-w-full rounded bg-white/10" />
          <div className="h-4 w-full max-w-md rounded bg-white/10" />
        </div>
        <div className={`${WORKSPACE_PANEL_CLASS} mt-8 p-5 sm:p-6`}>
          <div className="mb-4 h-3 w-28 rounded bg-white/10" />
          <div className="h-32 w-full rounded-lg bg-white/10" />
        </div>
      </div>
    </AppMainConstrained>
  );
}

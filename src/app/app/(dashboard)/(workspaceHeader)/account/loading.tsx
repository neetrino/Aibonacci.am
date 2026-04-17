import { AppMainConstrained } from '@/shared/ui/AppMainConstrained';
import { WORKSPACE_PANEL_CLASS } from '@/shared/ui/workspace-ui';

export default function AccountLoading() {
  return (
    <AppMainConstrained>
      <div className="mx-auto w-full max-w-5xl animate-pulse">
        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="mb-4 h-4 w-28 rounded bg-white/10" />
          <div className="mb-2 h-8 w-48 rounded bg-white/10" />
          <div className="h-4 w-full max-w-md rounded bg-white/10" />
        </div>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className={`${WORKSPACE_PANEL_CLASS} h-80 w-full shrink-0 lg:w-72`} />
          <div className={`${WORKSPACE_PANEL_CLASS} min-h-48 flex-1 p-5 sm:p-6`}>
            <div className="mb-4 h-3 w-28 rounded bg-white/10" />
            <div className="h-24 w-full rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
    </AppMainConstrained>
  );
}

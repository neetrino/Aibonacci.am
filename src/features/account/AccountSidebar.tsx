import Link from 'next/link';
import type { AccountTab } from '@/features/account/account-tab';
import {
  ACCOUNT_NAV_LINK_ACTIVE_CLASS,
  ACCOUNT_NAV_LINK_IDLE_CLASS,
  ACCOUNT_SIGN_OUT_BTN_CLASS,
} from '@/features/account/account-shell-classes';
import { AccountUserAvatar } from '@/features/account/AccountUserAvatar';
import { signOutAction } from '@/features/auth/auth-actions';
import { accountDisplayLabel } from '@/shared/lib/session';
import { WORKSPACE_PANEL_CLASS } from '@/shared/ui/workspace-ui';

type AccountSidebarProps = {
  activeTab: AccountTab;
  email: string;
  imageUrl: string | null | undefined;
  name: string | null | undefined;
};

export function AccountSidebar({ activeTab, email, imageUrl, name }: AccountSidebarProps) {
  const displayLabel = accountDisplayLabel({ name, email });

  return (
    <aside className="flex w-full flex-col gap-6 lg:sticky lg:top-6 lg:w-72 lg:shrink-0">
      <div className={`${WORKSPACE_PANEL_CLASS} flex flex-col gap-5 p-5`}>
        <div className="flex flex-col items-center gap-3 text-center">
          <AccountUserAvatar imageUrl={imageUrl} label={displayLabel} size="xl" />
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-neutral-100">{displayLabel}</p>
            <p className="truncate text-xs text-neutral-500">{email}</p>
          </div>
        </div>

        <nav aria-label="Account sections" className="flex flex-col gap-1">
          <Link
            aria-current={activeTab === 'profile' ? 'page' : undefined}
            className={
              activeTab === 'profile' ? ACCOUNT_NAV_LINK_ACTIVE_CLASS : ACCOUNT_NAV_LINK_IDLE_CLASS
            }
            href="/app/account?tab=profile"
          >
            Profile
          </Link>
          <Link
            aria-current={activeTab === 'preferences' ? 'page' : undefined}
            className={
              activeTab === 'preferences'
                ? ACCOUNT_NAV_LINK_ACTIVE_CLASS
                : ACCOUNT_NAV_LINK_IDLE_CLASS
            }
            href="/app/account?tab=preferences"
          >
            Preferences
          </Link>
        </nav>

        <form action={signOutAction} className="border-t border-white/10 pt-4">
          <button className={`w-full ${ACCOUNT_SIGN_OUT_BTN_CLASS}`} type="submit">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}

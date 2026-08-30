'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onAddContact?: () => void;
}

export default function Sidebar({ isOpen = false, onClose, onAddContact }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    { name: 'Contacts', href: '/contacts', icon: 'group' },
    { name: 'Tasks', href: '#', icon: 'assignment' },
    { name: 'Settings', href: '#', icon: 'settings' },
  ];

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Navigation */}
      <nav
        className={`fixed left-0 top-0 h-screen w-[240px] bg-surface-container-lowest dark:bg-inverse-surface border-r border-outline-variant dark:border-outline py-6 z-40 flex flex-col transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="px-4 mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-[20px] text-primary dark:text-primary-fixed-dim">Follow-up Board</h1>
            <p className="text-[12px] text-on-surface-variant font-medium tracking-wider">SaaS CRM</p>
          </div>
          {/* Close button for mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded-full hover:bg-surface-container-low text-on-surface-variant cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {/* Add Contact Button */}
        <div className="px-4 mb-4">
          {onAddContact ? (
            <button
              onClick={() => {
                onAddContact();
                if (onClose) onClose();
              }}
              className="w-full bg-primary text-on-primary rounded font-semibold text-[12px] py-2 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Contact
            </button>
          ) : (
            <Link
              href="/contacts?add=true"
              onClick={onClose}
              className="w-full bg-primary text-on-primary rounded font-semibold text-[12px] py-2 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Contact
            </Link>
          )}
        </div>

        {/* Nav Links */}
        <ul className="flex-1 overflow-y-auto text-[12px] font-semibold space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li
                key={item.name}
                className={`group cursor-pointer active:scale-95 duration-150 transition-colors ${
                  isActive
                    ? 'text-primary dark:text-primary-fixed-dim border-r-2 border-primary dark:border-primary-fixed-dim font-bold bg-surface-container-low dark:bg-surface-variant'
                    : 'text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-variant'
                }`}
                onClick={onClose}
              >
                <Link href={item.href} className="flex items-center gap-4 px-4 py-2 w-full">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User Profile / Auth Status Footer */}
        <div className="p-3 border-t border-outline-variant dark:border-outline bg-surface/50">
          {session?.user ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-[13px] font-bold shrink-0 shadow-sm">
                  {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="truncate text-left">
                  <p className="font-bold text-[12px] text-on-surface truncate leading-tight">
                    {session.user.name}
                  </p>
                  <p className="text-on-surface-variant text-[11px] truncate leading-tight mt-0.5">
                    {session.user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="p-1.5 rounded-md text-on-surface-variant hover:text-error hover:bg-error-container/30 transition-colors cursor-pointer shrink-0"
                title="ออกจากระบบ"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="flex items-center justify-center gap-1.5 w-full py-2 text-[12px] font-semibold text-primary hover:bg-surface-container-low dark:hover:bg-surface-variant rounded transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

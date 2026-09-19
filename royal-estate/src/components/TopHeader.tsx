import { useEffect, useRef, useState } from 'react';
import {
  X, Shield, Phone, HelpCircle, Bell, ChevronLeft,
  Home, Info, Moon, Sun, User,
  FileText, Settings, Megaphone
} from 'lucide-react';

type Page = 'privacy' | 'contact' | 'whyus' | 'notifications' | 'admin' | 'about' | null;

interface Props {
  isAdmin?: boolean;
  notifCount?: number;
  dark?: boolean;
  onDarkToggle?: () => void;
  onNavigate: (page: Page) => void;
  onTabChange?: (tab: 'home' | 'chat' | 'profile') => void;
  activeTab?: string;
  user?: { name?: string; email: string; isAdmin: boolean } | null;
}

export default function TopHeader({
  isAdmin = false,
  notifCount = 0,
  dark = false,
  onDarkToggle,
  onNavigate,
  onTabChange,
  activeTab,
  user,
}: Props) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!open && currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = Math.max(currentScrollY, 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [open]);

  const go    = (page: Page) => { setOpen(false); onNavigate(page); };
  const goTab = (tab: 'home' | 'chat' | 'profile') => {
    setOpen(false);
    onTabChange?.(tab);
  };

  const displayName = user?.name || user?.email?.split('@')[0] || null;
  const initials    = displayName?.charAt(0).toUpperCase() ?? null;

  return (
    <>
      {/* ── Flat transparent app bar ─────────────────────── */}
      <header className={`top-header fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 transition-transform duration-300 ease-in-out ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="relative flex items-center justify-center px-4 h-14">

          {/* Right: modern menu trigger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="فتح القائمة"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-black dark:text-white transition-opacity hover:opacity-60 active:scale-95"
          >
            <ModernMenuIcon />
          </button>

          {/* Center: brand name */}
          <div className="flex items-center gap-1 text-black dark:text-white">
            <span className="font-brand font-extrabold text-[17px] tracking-[0.04em]">salix</span>
          </div>

          {/* Left: notification and profile actions */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              onClick={() => go('notifications')}
              aria-label="الإشعارات"
              title="الإشعارات"
              className="relative w-9 h-9 flex items-center justify-center text-black dark:text-white transition-opacity hover:opacity-60 active:scale-95"
            >
              <Bell size={18} strokeWidth={1.8} />
              {notifCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[9px] font-black flex items-center justify-center">
                  {notifCount > 9 ? '9+' : notifCount}
                </span>
              )}
            </button>
            <button
              onClick={() => goTab('profile')}
              aria-label="الملف الشخصي"
              title="الملف الشخصي"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-white/15 text-gray-700 dark:text-white text-xs font-black transition-opacity hover:opacity-70 active:scale-95"
            >
              {initials || <User size={16} strokeWidth={1.8} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Overlay ──────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* ── Full-screen slide-in Drawer (from right / RTL) ── */}
      <div
        className={`fixed top-0 right-0 h-full w-[70vw] max-w-sm z-[70] transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="drawer-glass h-full flex flex-col overflow-hidden">

          {/* ── Drawer header / user card ─────────────────── */}
          <div className="drawer-header px-5 pt-12 pb-5">
            <div className="relative flex items-center justify-center mb-4">
              <button
                onClick={() => setOpen(false)}
                className="absolute left-0 top-0 w-9 h-9 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white active:scale-95 transition-all"
              >
                <X size={20} className="text-gray-900 dark:text-white" />
              </button>
              {onDarkToggle && (
                <button
                  onClick={onDarkToggle}
                  aria-label={dark ? 'تفعيل الوضع المضيء' : 'تفعيل الوضع الليلي'}
                  className="absolute right-0 top-0 w-9 h-9 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white active:scale-95 transition-all"
                >
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
            </div>

            {/* User row */}
            {user ? (
              <div
                onClick={() => goTab('profile')}
                className="flex items-center gap-3 px-2 py-3 rounded-xl bg-gray-50 dark:bg-white/5 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-[0.98]"
              >
                <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center font-black text-gray-700 dark:text-white text-sm flex-none">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white font-bold text-sm truncate">{displayName}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-[11px] truncate">{user.email}</p>
                </div>
                {user.isAdmin && (
                  <span className="flex-none bg-amber-400 text-white text-[9px] font-black px-2 py-0.5 rounded-full">مدير</span>
                )}
                <ChevronLeft size={15} className="text-gray-400 dark:text-white/40 flex-none" />
              </div>
            ) : (
              <button
                onClick={() => goTab('profile')}
                className="w-full flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl px-2 py-3 hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-[0.98]"
              >
                <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center flex-none">
                  <User size={17} className="text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex-1 text-right">
                  <p className="text-gray-900 dark:text-white font-bold text-sm">تسجيل الدخول</p>
                  <p className="text-gray-500 dark:text-gray-400 text-[11px]">إنشاء حساب جديد</p>
                </div>
                <ChevronLeft size={15} className="text-gray-400 dark:text-white/40 flex-none" />
              </button>
            )}
          </div>

          {/* ── Scrollable menu body ───────────────────────── */}
          <div className="flex-1 overflow-y-auto px-5 py-3 space-y-1 scrollbar-hide">

            {/* ── Section: الصفحات الرئيسية ── */}
            <SectionLabel label="الصفحات الرئيسية" />

            <MenuItem
              icon={Home}      label="الرئيسية"   color="#00BFA5" bg="rgba(0,191,165,0.18)"
              active={activeTab === 'home'}
              onClick={() => goTab('home')}
            />
            <MenuItem
              icon={Bell}      label="الدردشة"     color="#00BFA5" bg="rgba(0,191,165,0.15)"
              active={activeTab === 'chat'}
              onClick={() => goTab('chat')}
            />

            {/* ── Section: حسابي ── */}
            <SectionLabel label="حسابي" className="mt-5" />

            <MenuItem
              icon={User}         label="ملفي الشخصي"  color="#00BFA5" bg="rgba(0,191,165,0.18)"
              onClick={() => goTab('profile')}
            />
            <MenuItem
              icon={Megaphone}    label="أضف منتج"     color="#10b981" bg="rgba(16,185,129,0.15)"
              onClick={() => goTab('profile')}
            />
            <MenuItem
              icon={FileText}     label="طلباتي"       color="#6366f1" bg="rgba(99,102,241,0.15)"
              onClick={() => goTab('profile')}
            />
            {/* ── Section: معلومات وسياسات ── */}
            <SectionLabel label="معلومات وسياسات" className="mt-5" />

            <MenuItem icon={Info}        label="عن التطبيق"       color="#3b82f6" bg="rgba(59,130,246,0.15)"  onClick={() => go('about')}   />
            <MenuItem icon={HelpCircle}  label="لماذا نحن؟"       color="#f59e0b" bg="rgba(245,158,11,0.15)"  onClick={() => go('whyus')}   />
            <MenuItem icon={Shield}      label="سياسة الخصوصية"   color="#6366f1" bg="rgba(99,102,241,0.15)"  onClick={() => go('privacy')} />
            <MenuItem icon={Phone}       label="تواصل معنا"       color="#00BFA5" bg="rgba(0,191,165,0.15)"   onClick={() => go('contact')} />

            {/* ── Section: الإدارة (admin only) ── */}
            {isAdmin && (
              <>
                <SectionLabel label="الإدارة" className="mt-5" />
                <button
                  onClick={() => go('admin')}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-amber-400/15 border border-amber-300/25 hover:bg-amber-400/25 active:scale-[0.98] transition-all"
                >
                  <ChevronLeft size={16} className="text-amber-300/60" />
                  <div className="flex items-center gap-3">
                    <span className="text-amber-200 font-bold text-sm">لوحة الإدارة</span>
                    <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center">
                      <Settings size={17} className="text-amber-300" />
                    </div>
                  </div>
                </button>
              </>
            )}

            <div className="h-4" />
          </div>

        </div>
      </div>
    </>
  );
}

/* ── Helper sub-components ─────────────────────────────── */

function SectionLabel({ label, className = '' }: { label: string; className?: string }) {
  return (
    <p className={`text-gray-500 dark:text-white/45 text-[10px] font-black uppercase tracking-widest px-1 mb-2 ${className}`}>
      {label}
    </p>
  );
}

function ModernMenuIcon() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
      <path d="M1 2H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 9H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M1 16H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MenuItem({
  icon: Icon, label, color, bg, onClick, active = false,
}: {
  icon: typeof Home;
  label: string;
  color: string;
  bg: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-1 py-3 transition-all active:opacity-70 ${
        active
          ? 'text-gray-900 dark:text-white'
          : 'text-gray-600 dark:text-white/75 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      <ChevronLeft size={14} className="text-gray-400 dark:text-white/35" />
      <div className="flex items-center gap-3">
        <span className={`text-gray-900 dark:text-white font-semibold text-sm ${active ? 'font-bold' : ''}`}>{label}</span>
        <div className="w-7 h-7 flex items-center justify-center">
          <Icon size={17} style={{ color: active ? '#00BFA5' : '#6B7280' }} />
        </div>
      </div>
    </button>
  );
}

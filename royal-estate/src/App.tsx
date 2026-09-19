import { useState } from 'react';
import { Home, Bell, MessageCircle, User } from 'lucide-react';
import { Property } from './data/mockData';
import TopHeader from './components/TopHeader';
import HomePage from './pages/HomePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import WhyUsPage from './pages/WhyUsPage';
import NotificationsPage from './pages/NotificationsPage';
import AboutPage from './pages/AboutPage';
import { unreadCount } from './pages/NotificationsPage';
import { useDarkMode } from './hooks/useDarkMode';

type Tab     = 'home' | 'chat' | 'profile';
type SubPage = 'login' | 'admin' | 'property' | 'privacy' | 'contact' | 'whyus' | 'notifications' | 'about' | null;

const NAV_ITEMS: { id: Tab; Icon: typeof Home; label: string }[] = [
  { id: 'home',    Icon: Home,    label: 'الرئيسية' },
  { id: 'chat',    Icon: MessageCircle, label: 'الدردشة'  },
  { id: 'profile', Icon: User,    label: 'حسابي'    },
];

export default function App() {
  const [tab,              setTab]              = useState<Tab>('home');
  const [subPage,          setSubPage]          = useState<SubPage>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [user,             setUser]             = useState<{ name: string; email: string; isAdmin: boolean } | null>(null);
  const [notifCount,       setNotifCount]       = useState(() => unreadCount());
  const { dark, toggle: toggleDark }            = useDarkMode();

  const goSub  = (p: SubPage) => setSubPage(p);
  const goBack = ()           => setSubPage(null);
  const refreshNotifs = ()    => setNotifCount(unreadCount());

  const handlePropertyClick = (p: Property) => {
    setSelectedProperty(p);
    setSubPage('property');
  };

  const handleLogin = (name: string, isAdmin: boolean) => {
    setUser({ name, email: name + '@safsaf.sa', isAdmin });
    setSubPage(null);
    setTab('profile');
  };

  /* ── Sub-pages ──────────────────────────────────────────── */
  if (subPage === 'login')         return <LoginPage         onLogin={handleLogin}  onBack={goBack} />;
  if (subPage === 'admin')         return <AdminPage                                 onBack={goBack} />;
  if (subPage === 'privacy')       return <PrivacyPage                               onBack={goBack} />;
  if (subPage === 'contact')       return <ContactPage                               onBack={goBack} />;
  if (subPage === 'whyus')         return <WhyUsPage                                 onBack={goBack} />;
  if (subPage === 'about')         return <AboutPage                                 onBack={goBack} />;
  if (subPage === 'notifications')
    return <NotificationsPage view="notifications" onBack={() => { refreshNotifs(); goBack(); }} />;
  if (subPage === 'property' && selectedProperty)
    return (
      <PropertyDetailPage
        property={selectedProperty}
        onBack={() => { setSubPage(null); setSelectedProperty(null); }}
      />
    );

  /* ── Main layout ─────────────────────────────────────────── */
  return (
    <div className={`min-h-screen max-w-lg mx-auto relative ${dark ? 'dark bg-gray-900' : 'bg-[#F0FEFA]'}`}>

      <TopHeader
        isAdmin={user?.isAdmin ?? false}
        notifCount={notifCount}
        dark={dark}
        onDarkToggle={toggleDark}
        user={user}
        activeTab={tab}
        onTabChange={(t) => setTab(t)}
        onNavigate={(page) => {
          if (page === 'admin' && user?.isAdmin) goSub('admin');
          else if (page) goSub(page as SubPage);
        }}
      />

      {/* Content — clears the floating header and bottom navigation */}
      <div key={tab} className="pt-20 pb-28 tab-enter">
        {tab === 'home' && (
          <HomePage
            onPropertyClick={handlePropertyClick}
          />
        )}
        {tab === 'chat' && <NotificationsPage view="chat" onBack={() => setTab('home')} />}
        {tab === 'profile'    && (
          <ProfilePage
            user={user}
            onLogin={() => goSub('login')}
            onLogout={() => setUser(null)}
            onAdmin={() => goSub('admin')}
          />
        )}
      </div>

      {/* Bottom nav */}
      <nav className="nav-bottom fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-40">
        <div className="flex items-center justify-around px-1 py-2">
          {NAV_ITEMS.map(({ id, Icon, label }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-none transition-all min-w-0 flex-1 active:scale-95"
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2 : 1.5}
                  className={`mb-0.5 ${active ? 'text-[#00BFA5]' : 'text-[#90AFAC] dark:text-gray-500'}`}
                />
                <span className={`text-[10px] font-bold leading-none ${active ? 'text-[#00897B]' : 'text-[#90AFAC]'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

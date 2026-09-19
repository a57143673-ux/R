import { useState, useRef } from 'react';
import {
  Heart, ClipboardList, Bell, Globe, Shield, LogOut,
  ChevronLeft, Camera, Building2, User, Edit3, Plus, FileText,
  ChevronDown, CheckCircle, X, Home, DollarSign, Maximize2, MapPin,
  Save, Upload
} from 'lucide-react';
import { saveUserPost } from '../data/userPosts';
import BrandedSelect from '../components/BrandedSelect';

interface Props {
  user: { name?: string; email: string; isAdmin: boolean } | null;
  onLogin: () => void;
  onLogout: () => void;
  onAdmin: () => void;
}

type AccountType = 'individual' | 'company';
type ProfileTab  = 'overview' | 'settings' | 'post-ad';

const PROPERTY_TYPES = ['إلكترونيات', 'أزياء', 'منزل', 'عناية شخصية', 'متنوع'];
const LISTING_TYPES  = ['عرض خاص', 'متاح الآن'];
const CITIES         = ['الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 'أبها', 'تبوك'];

export default function ProfilePage({ user, onLogin, onLogout, onAdmin }: Props) {

  /* ── Not logged in ─────────────────────────────────────── */
  if (!user) {
    return (
      <div className="page-enter pb-28 min-h-screen px-4 pt-5">
        <button onClick={onLogin} className="w-full card-glass rounded-2xl p-5 flex items-center gap-4 text-right hover:bg-white/80 dark:hover:bg-gray-800/80 active:scale-[0.99] transition-all">
          <div className="w-16 h-16 rounded-full bg-[#E0F7F4] dark:bg-teal-900/40 text-[#00897B] dark:text-teal-300 flex items-center justify-center flex-none">
            <User size={28} strokeWidth={1.7} />
          </div>
          <div className="text-right">
            <h1 className="text-lg font-black text-[#0D2926] dark:text-white">مرحباً بك، ضيفنا</h1>
            <p className="text-xs text-[#4A7B76] dark:text-gray-400 mt-1">سجّل دخولك لإدارة طلباتك ومتاجرك المفضلة</p>
          </div>
        </button>
      </div>
    );
  }

  /* ── Logged in ─────────────────────────────────────────── */
  return <LoggedInProfile user={user} onLogout={onLogout} onAdmin={onAdmin} />;
}

/* ═══════════════════════════════════════════════════════════ */
/* Logged-in profile component                                 */
/* ═══════════════════════════════════════════════════════════ */
function LoggedInProfile({
  user, onLogout, onAdmin
}: Omit<Props, 'onLogin'> & { user: NonNullable<Props['user']> }) {

  const [tab,         setTab]         = useState<ProfileTab>('overview');
  const [photoUrl,    setPhotoUrl]    = useState<string | null>(null);
  const [accountType, setAccountType] = useState<AccountType>('individual');
  const [toast,       setToast]       = useState('');

  /* ── Edit profile state ── */
  const [displayName, setDisplayName] = useState(user.name || user.email.split('@')[0]);
  const [phone,       setPhone]       = useState('');
  const [bio,         setBio]         = useState('');

  /* ── Company info state ── */
  const [companyName,    setCompanyName]    = useState('');
  const [companyLicense, setCompanyLicense] = useState('');
  const [companyPhone,   setCompanyPhone]   = useState('');
  const [companyCity,    setCompanyCity]    = useState('');
  const [docUploaded,    setDocUploaded]    = useState(false);

  /* ── Post-ad state ── */
  const [adTitle,       setAdTitle]       = useState('');
  const [adType,        setAdType]        = useState('إلكترونيات');
  const [adListing,     setAdListing]     = useState('للبيع');
  const [adCity,        setAdCity]        = useState('');
  const [adNeighborhood,setAdNeighborhood]= useState('');
  const [adPrice,       setAdPrice]       = useState('');
  const [adArea,        setAdArea]        = useState('');
  const [adBeds,        setAdBeds]        = useState('');
  const [adDescription, setAdDescription] = useState('');
  const [adPosted,      setAdPosted]      = useState(false);
  const [isSubmitting,  setIsSubmitting]  = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef  = useRef<HTMLInputElement>(null);

  const initials = displayName.charAt(0).toUpperCase();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2600);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setDocUploaded(true);
  };

  const handlePostAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adTitle || !adCity || !adPrice) { showToast('يرجى إكمال الحقول المطلوبة'); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      saveUserPost({
        id: `user-${Date.now()}`,
        title: adTitle,
        description: adDescription || 'منشور جديد من صفصاف للتجارة الإلكترونية.',
        type: 'commercial',
        listingType: adListing === 'عرض خاص' ? 'forSale' : 'forRent',
        neighborhood: adNeighborhood || adCity,
        city: adCity,
        address: `${adNeighborhood || adCity}، ${adCity}`,
        price: Number(adPrice.replace(/[^0-9.]/g, '')) || 0,
        currency: 'ريال',
        area: Number(adArea) || 1,
        bedrooms: Number(adBeds) || undefined,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900'],
        isFeatured: false,
        isVerified: false,
        requestCount: 0,
        createdAt: new Date(),
        agentName: displayName,
      });
      setIsSubmitting(false);
      setAdPosted(true);
      showToast('تم نشر المنتج فوراً ✓');
      setTimeout(() => { setTab('overview'); setAdPosted(false); setAdTitle(''); setAdCity(''); setAdPrice(''); setAdArea(''); setAdBeds(''); setAdDescription(''); }, 2800);
    }, 700);
  };

  return (
    <div className="page-enter pb-28 min-h-screen">

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#00897B] text-white font-bold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm">
          <CheckCircle size={16} /> {toast}
        </div>
      )}

      {/* ── Profile card ── */}
      <div className="card-glass mx-4 mt-5 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          {/* Photo */}
          <div className="relative flex-none">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-full border-2 border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-sm"
            >
              {photoUrl
                ? <img src={photoUrl} alt="profile" className="w-full h-full object-cover" />
                : <span className="text-3xl font-black text-[#0D2926] dark:text-white">{initials}</span>
              }
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-[#00BFA5] rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center shadow"
            >
              <Camera size={12} className="text-white" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </div>

          {/* Name + badge */}
          <div className="flex-1 min-w-0">
            <h1 className="font-black text-xl text-[#0D2926] dark:text-white truncate">{displayName}</h1>
            <p className="text-[#4A7B76] dark:text-gray-400 text-xs truncate mt-0.5">{user.email}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                user.isAdmin ? 'bg-amber-400 text-white' : 'bg-[#E0F7F4] dark:bg-teal-900/40 text-[#00897B] dark:text-teal-300'
              }`}>
                {user.isAdmin ? 'مدير النظام' : accountType === 'company' ? 'حساب متجر' : 'متسوق'}
              </span>
              {accountType === 'company' && companyName && (
                <span className="inline-flex items-center gap-1 text-[#4A7B76] dark:text-gray-400 text-xs">{companyName}</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Profile stats ── */}
        <div className="grid grid-cols-3 gap-2 mt-5 relative z-10">
          {[
            { value: '128', label: 'المتابعون' },
            { value: '64',  label: 'المتابَعون' },
            { value: '12.4K', label: 'الزيارات' },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl bg-gray-50 dark:bg-gray-800 px-2 py-2.5 text-center">
              <p className="font-black text-[#0D2926] dark:text-white text-base leading-none">{stat.value}</p>
              <p className="text-[#90AFAC] text-[10px] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Tab strip ── */}
        <div className="flex gap-2 mt-5">
          {([
            { id: 'overview' as ProfileTab, label: 'نظرة عامة' },
            { id: 'settings' as ProfileTab, label: 'الإعدادات' },
            { id: 'post-ad'  as ProfileTab, label: 'أضف منتج' },
          ]).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === t.id ? 'bg-[#E0F7F4] dark:bg-teal-900/40 text-[#00897B] dark:text-teal-300 shadow-sm' : 'bg-gray-50 dark:bg-gray-800 text-[#4A7B76] dark:text-gray-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">

        {/* ══════════════ OVERVIEW TAB ══════════════ */}
        {tab === 'overview' && (
          <>
            {/* Admin panel shortcut */}
            {user.isAdmin && (
              <button onClick={onAdmin}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg">
                <Shield size={18} /> لوحة الإدارة
              </button>
            )}

            {/* Quick actions */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Heart,         label: 'المفضلة',  color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-900/20'    },
                { icon: ClipboardList, label: 'طلباتي',   color: 'text-blue-500',   bg: 'bg-blue-50 dark:bg-blue-900/20'  },
                { icon: Plus,          label: 'منتج',     color: 'text-[#009688]',  bg: 'bg-[#E0F7F4] dark:bg-teal-900/30', action: () => setTab('post-ad') },
              ].map(({ icon: Icon, label, color, bg, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className={`${bg} rounded-2xl py-4 flex flex-col items-center gap-2 active:scale-[0.97] transition-all`}
                >
                  <Icon size={22} className={color} />
                  <span className={`text-xs font-bold ${color}`}>{label}</span>
                </button>
              ))}
            </div>

            {/* Account type selector */}
            <div className="card-glass rounded-3xl p-4 shadow">
              <p className="text-[#4A7B76] dark:text-teal-300 text-xs font-bold mb-3">نوع الحساب</p>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { type: 'individual' as AccountType, icon: User,      label: 'متسوق',      desc: 'اكتشاف وشراء المنتجات' },
                  { type: 'company'    as AccountType, icon: Building2, label: 'حساب متجر', desc: 'نشر وإدارة المنتجات' },
                ]).map(({ type, icon: Icon, label, desc }) => (
                  <button
                    key={type}
                    onClick={() => setAccountType(type)}
                    className={`rounded-2xl p-3 border-2 flex flex-col items-center gap-2 transition-all ${
                      accountType === type
                        ? 'border-[#00BFA5] bg-[#E0F7F4] dark:bg-teal-900/40'
                        : 'border-transparent bg-[#F0FEFA] dark:bg-gray-800/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      accountType === type ? 'bg-[#00BFA5]' : 'bg-[#B2DFDB]/40'
                    }`}>
                      <Icon size={20} className={accountType === type ? 'text-white' : 'text-[#4A7B76]'} />
                    </div>
                    <span className={`text-xs font-black ${accountType === type ? 'text-[#00897B] dark:text-teal-300' : 'text-[#0D2926] dark:text-gray-300'}`}>{label}</span>
                    <span className="text-[10px] text-[#90AFAC] text-center leading-tight">{desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <button onClick={onLogout}
                className="w-full py-4 border-2 border-red-200 dark:border-red-800 text-red-400 dark:text-red-400 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-[0.98] transition-all mt-2">
                <LogOut size={18} /> تسجيل الخروج
              </button>
            </div>
          </>
        )}

        {/* ══════════════ SETTINGS TAB ══════════════ */}
        {tab === 'settings' && (
          <>
            {/* Personal info */}
            <div className="card-glass rounded-3xl p-4 shadow">
              <p className="text-[#4A7B76] dark:text-teal-300 text-xs font-bold mb-3 flex items-center gap-1.5">
                <User size={13} /> المعلومات الشخصية
              </p>
              <div className="space-y-3">
                <div>
                  <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-1 block">الاسم</label>
                  <input value={displayName} onChange={e => setDisplayName(e.target.value)}
                    className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-4 py-3 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm"
                    placeholder="اسمك الكامل" />
                </div>
                <div>
                  <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-1 block">رقم الجوال</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-4 py-3 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm"
                    placeholder="+966500000000" dir="ltr" />
                </div>
                <div>
                  <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-1 block">نبذة قصيرة</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                    className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-4 py-3 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm resize-none"
                    placeholder="اكتب نبذة عن نفسك..." />
                </div>
              </div>
            </div>

            {/* Company info — only if company account */}
            {accountType === 'company' && (
              <div className="card-glass rounded-3xl p-4 shadow">
                <p className="text-[#4A7B76] dark:text-teal-300 text-xs font-bold mb-3 flex items-center gap-1.5">
                  <Building2 size={13} /> معلومات المتجر
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'اسم المتجر',        value: companyName,    setter: setCompanyName,    ph: 'متجر النخبة',              dir: 'rtl' },
                    { label: 'رقم السجل التجاري', value: companyLicense, setter: setCompanyLicense, ph: '1234567890',              dir: 'ltr' },
                    { label: 'هاتف المتجر',       value: companyPhone,   setter: setCompanyPhone,   ph: '+966112345678',           dir: 'ltr' },
                  ].map(({ label, value, setter, ph, dir }) => (
                    <div key={label}>
                      <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-1 block">{label}</label>
                      <input value={value} onChange={e => setter(e.target.value)}
                        className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-4 py-3 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm"
                        placeholder={ph} dir={dir as 'rtl'|'ltr'} />
                    </div>
                  ))}

                  {/* City select */}
                  <div>
                    <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-1 block">المدينة</label>
                    <BrandedSelect
                      value={companyCity}
                      onChange={setCompanyCity}
                      placeholder="اختر المدينة"
                      options={CITIES.map(c => ({ value: c, label: c }))}
                    />
                  </div>

                  {/* Document upload */}
                  <div>
                    <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-2 block flex items-center gap-1.5">
                      <FileText size={13} className="text-[#00BFA5]" /> وثائق المتجر
                    </label>
                    <button
                      onClick={() => docInputRef.current?.click()}
                      className={`w-full border-2 border-dashed rounded-2xl py-5 flex flex-col items-center gap-2 transition-all ${
                        docUploaded
                          ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                          : 'border-[#B2DFDB] dark:border-gray-600 bg-[#F0FEFA] dark:bg-gray-800 hover:border-[#00BFA5]'
                      }`}
                    >
                      {docUploaded
                        ? <><CheckCircle size={24} className="text-green-500" /><span className="text-green-600 dark:text-green-400 font-bold text-sm">تم رفع المستند ✓</span></>
                        : <><Upload size={24} className="text-[#90AFAC]" /><span className="text-[#4A7B76] dark:text-gray-400 font-semibold text-sm">ارفع السجل التجاري أو الترخيص</span><span className="text-[#90AFAC] text-xs">PDF أو صورة</span></>
                      }
                    </button>
                    <input ref={docInputRef} type="file" accept=".pdf,image/*" className="hidden" onChange={handleDocUpload} />
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            <div className="card-glass rounded-3xl p-4 shadow space-y-2">
              <p className="text-[#4A7B76] dark:text-teal-300 text-xs font-bold mb-3 flex items-center gap-1.5">
                <Globe size={13} /> التفضيلات
              </p>
              {[
                { icon: Bell,  label: 'الإشعارات' },
                { icon: Globe, label: 'اللغة'     },
              ].map(({ icon: Icon, label }) => (
                <button key={label}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-[#F0FEFA] dark:hover:bg-gray-800 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#E0F7F4] dark:bg-teal-900/50 rounded-xl flex items-center justify-center">
                      <Icon size={16} className="text-[#00897B] dark:text-teal-300" />
                    </div>
                    <span className="text-[#0D2926] dark:text-gray-100 font-semibold text-sm">{label}</span>
                  </div>
                  <ChevronLeft size={16} className="text-[#B2DFDB] dark:text-gray-500" />
                </button>
              ))}
            </div>

            <button
              onClick={() => showToast('تم حفظ الإعدادات ✓')}
              className="w-full py-4 bg-[#00BFA5] text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-colors">
              <Save size={18} /> حفظ التغييرات
            </button>
          </>
        )}

        {/* ══════════════ POST AD TAB ══════════════ */}
        {tab === 'post-ad' && (
          <form onSubmit={handlePostAd} className="space-y-4">

            {adPosted ? (
              <div className="card-glass rounded-3xl p-8 flex flex-col items-center gap-4 shadow">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h3 className="text-[#0D2926] dark:text-gray-100 font-black text-lg">تم إرسال منتجك!</h3>
                <p className="text-[#4A7B76] dark:text-gray-400 text-sm text-center">سيتم مراجعة منتجك من قِبَل الإدارة ونشره خلال 24 ساعة.</p>
              </div>
            ) : (
              <>
                {/* Type + Listing row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="card-glass rounded-2xl p-3">
                    <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-2 block">نوع المنتج</label>
                    <BrandedSelect
                      value={adType}
                      onChange={setAdType}
                      placeholder="اختر نوع المنتج"
                      options={PROPERTY_TYPES.map(type => ({ value: type, label: type }))}
                    />
                  </div>
                  <div className="card-glass rounded-2xl p-3">
                    <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-2 block">حالة المنتج</label>
                    <BrandedSelect
                      value={adListing}
                      onChange={setAdListing}
                      placeholder="اختر الحالة"
                      options={LISTING_TYPES.map(type => ({ value: type, label: type }))}
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="card-glass rounded-2xl p-4">
                  <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-1.5 block">اسم المنتج *</label>
                  <input value={adTitle} onChange={e => setAdTitle(e.target.value)}
                    className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-4 py-3 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm"
                    placeholder="مثال: سماعات لاسلكية بإصدار حديث" />
                </div>

                {/* City + Neighborhood */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="card-glass rounded-2xl p-3">
                    <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-1.5 block flex items-center gap-1">
                      <MapPin size={11} className="text-[#00BFA5]" /> المدينة *
                    </label>
                    <BrandedSelect
                      value={adCity}
                      onChange={setAdCity}
                      placeholder="اختر المدينة"
                      options={CITIES.map(c => ({ value: c, label: c }))}
                    />
                  </div>
                  <div className="card-glass rounded-2xl p-3">
                    <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-1.5 block">المتجر أو المدينة</label>
                    <input value={adNeighborhood} onChange={e => setAdNeighborhood(e.target.value)}
                      className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-3 py-2.5 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 text-sm"
                      placeholder="اسم المتجر أو المدينة" />
                  </div>
                </div>

                {/* Price + Area + Beds */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: DollarSign, label: 'السعر *',    value: adPrice, setter: setAdPrice, ph: '500,000', dir: 'ltr' },
                    { icon: Maximize2,  label: 'الكمية',    value: adArea,  setter: setAdArea,  ph: '1',       dir: 'ltr' },
                    { icon: Home,       label: 'التقييم',   value: adBeds,  setter: setAdBeds,  ph: '5',       dir: 'ltr' },
                  ].map(({ icon: Icon, label, value, setter, ph, dir }) => (
                    <div key={label} className="card-glass rounded-2xl p-3">
                      <label className="text-[#4A7B76] dark:text-gray-400 text-[10px] font-semibold mb-1.5 flex items-center gap-1">
                        <Icon size={10} className="text-[#00BFA5]" /> {label}
                      </label>
                      <input value={value} onChange={e => setter(e.target.value)}
                        className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-lg px-2 py-2 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 text-sm"
                        placeholder={ph} dir={dir as 'ltr'} />
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="card-glass rounded-2xl p-4">
                  <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-semibold mb-1.5 block">وصف المنتج</label>
                  <textarea value={adDescription} onChange={e => setAdDescription(e.target.value)} rows={4}
                    className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-4 py-3 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm resize-none"
                    placeholder="اكتب وصفاً تفصيلياً للمنتج..." />
                </div>

                {/* Photo upload hint */}
                <div className="border-2 border-dashed border-[#B2DFDB] dark:border-gray-600 rounded-2xl py-5 flex flex-col items-center gap-2 bg-[#F0FEFA] dark:bg-gray-800/50">
                  <Camera size={28} className="text-[#90AFAC]" />
                  <span className="text-[#4A7B76] dark:text-gray-400 font-semibold text-sm">أضف صور المنتج</span>
                  <span className="text-[#90AFAC] text-xs">حتى 10 صور (قريباً)</span>
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full py-4 bg-[#00BFA5] text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-[#009688] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-wait">
                  {isSubmitting ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> جاري النشر...</> : <><Edit3 size={18} /> نشر المنتج الآن</>}
                </button>
              </>
            )}
          </form>
        )}

      </div>
    </div>
  );
}

import { useState } from 'react';
import {
  ChevronRight, LayoutDashboard, Home, Megaphone, Settings, Plus, Pencil,
  Trash2, ToggleLeft, Save, MapPin, Link, ClipboardCheck, CheckCircle,
  XCircle, Clock, Eye, Bell
} from 'lucide-react';
import { properties } from '../data/mockData';
import MapPicker from '../components/MapPicker';

interface Props { onBack: () => void; }

type Tab = 'dashboard' | 'pending' | 'properties' | 'ads' | 'settings';

const MOCK_ADS = [
  { id: 'ad-1', title: 'عروض الربيع – خصم 15%', active: true },
  { id: 'ad-2', title: 'مجمع النخيل – فرصة استثمارية', active: true },
  { id: 'ad-3', title: 'شحن مجاني على الطلبات الجديدة', active: false },
];

type PendingStatus = 'pending' | 'approved' | 'rejected';

interface PendingListing {
  id: string;
  title: string;
  type: string;
  city: string;
  neighborhood: string;
  price: string;
  submittedBy: string;
  submittedAt: string;
  status: PendingStatus;
  area: string;
  beds: string;
}

const MOCK_PENDING: PendingListing[] = [
  {
    id: 'p-1', title: 'سماعات لاسلكية بإصدار حديث', type: 'إلكترونيات', city: 'الرياض', neighborhood: 'متجر التقنية',
    price: '450 ريال', submittedBy: 'متجر التقنية', submittedAt: '2 يناير 2026', status: 'pending', area: '12', beds: '5',
  },
  {
    id: 'p-2', title: 'حقيبة جلدية يدوية', type: 'أزياء', city: 'جدة', neighborhood: 'متجر الذوق',
    price: '280 ريال', submittedBy: 'متجر الذوق', submittedAt: '31 ديسمبر 2025', status: 'pending', area: '8', beds: '4',
  },
  {
    id: 'p-3', title: 'طقم قهوة أنيق للمنزل', type: 'منزل', city: 'الرياض', neighborhood: 'متجر البيت',
    price: '190 ريال', submittedBy: 'متجر البيت', submittedAt: '28 ديسمبر 2025', status: 'approved', area: '6', beds: '5',
  },
  {
    id: 'p-4', title: 'عطر فاخر بتركيبة شرقية', type: 'عناية شخصية', city: 'الدمام', neighborhood: 'متجر العطور',
    price: '320 ريال', submittedBy: 'متجر العطور', submittedAt: '26 ديسمبر 2025', status: 'rejected', area: '5', beds: '4',
  },
  {
    id: 'p-5', title: 'حذاء رياضي خفيف ومريح', type: 'أزياء', city: 'مكة المكرمة', neighborhood: 'متجر الحركة',
    price: '240 ريال', submittedBy: 'متجر الحركة', submittedAt: '25 ديسمبر 2025', status: 'pending', area: '10', beds: '4',
  },
];

export default function AdminPage({ onBack }: Props) {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // Add/Edit form state
  const [showForm, setShowForm]     = useState(false);
  const [formTitle, setFormTitle]   = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formLat, setFormLat]       = useState(24.7136);
  const [formLng, setFormLng]       = useState(46.6753);

  const [ads, setAds]               = useState(MOCK_ADS);
  const [pending, setPending]       = useState(MOCK_PENDING);
  const [selectedListing, setSelectedListing] = useState<PendingListing | null>(null);

  // Announcement form
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementBody,  setAnnouncementBody]  = useState('');

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2800);
  };

  const handleApprove = (id: string) => {
    setPending(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
    setSelectedListing(null);
    showToast('تمت الموافقة على الإعلان ✓');
  };

  const handleReject = (id: string) => {
    setPending(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
    setSelectedListing(null);
    showToast('تم رفض الإعلان', false);
  };

  const pendingCount  = pending.filter(p => p.status === 'pending').length;
  const approvedCount = pending.filter(p => p.status === 'approved').length;
  const rejectedCount = pending.filter(p => p.status === 'rejected').length;

  const TAB_ITEMS: { id: Tab; label: string; Icon: typeof LayoutDashboard; badge?: number }[] = [
    { id: 'dashboard',  label: 'الرئيسية', Icon: LayoutDashboard },
    { id: 'pending',    label: 'المراجعة',  Icon: ClipboardCheck, badge: pendingCount },
    { id: 'properties', label: 'المنتجات',  Icon: Home },
    { id: 'ads',        label: 'الإعلانات', Icon: Megaphone },
    { id: 'settings',   label: 'الإعدادات', Icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F0FEFA] dark:bg-gray-900">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-xl font-bold text-white flex items-center gap-2 transition-all ${
          toast.ok ? 'bg-[#4CAF50]' : 'bg-red-500'
        }`}>
          {toast.ok ? '✓' : '✕'} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="hero-gradient hero-curved text-white px-5 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack}
            className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <ChevronRight size={18} />
          </button>
          <div>
            <h1 className="font-black text-xl">لوحة الإدارة</h1>
            <p className="text-white/70 text-xs">صفصاف للتجارة الإلكترونية</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {TAB_ITEMS.map(({ id, label, Icon, badge }) => (
            <button key={id} onClick={() => { setTab(id); setShowForm(false); setSelectedListing(null); }}
              className={`relative flex-none flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                tab === id ? 'bg-white text-[#00897B] shadow' : 'bg-white/20 text-white'
              }`}>
              <Icon size={14} />
              {label}
              {badge != null && badge > 0 && (
                <span className="w-5 h-5 bg-red-500 rounded-full text-white text-[9px] font-black flex items-center justify-center ml-0.5">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 pb-10">

        {/* ── Dashboard ── */}
        {tab === 'dashboard' && (
          <div className="space-y-4 page-enter">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'إجمالي المنتجات',  value: properties.length, Icon: Home,            color: 'text-[#00897B]', bg: 'bg-[#E0F7F4]' },
                { label: 'بانتظار المراجعة', value: pendingCount,       Icon: Clock,           color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'تمت الموافقة',     value: approvedCount,      Icon: CheckCircle,     color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'مرفوضة',           value: rejectedCount,      Icon: XCircle,         color: 'text-red-400',   bg: 'bg-red-50'   },
              ].map(s => (
                <div key={s.label} className="card-glass rounded-2xl p-4 text-center">
                  <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <s.Icon size={20} className={s.color} />
                  </div>
                  <div className={`font-black text-2xl ${s.color}`}>{s.value}</div>
                  <div className="text-[#4A7B76] dark:text-gray-400 text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent pending */}
            {pendingCount > 0 && (
              <div className="card-glass rounded-2xl p-4">
                <h3 className="font-bold text-[#0D2926] dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-amber-400 rounded-full" />
                  تنتظر المراجعة ({pendingCount})
                </h3>
                <div className="space-y-2">
                  {pending.filter(p => p.status === 'pending').slice(0, 3).map(p => (
                    <button key={p.id} onClick={() => { setTab('pending'); setSelectedListing(p); }}
                      className="w-full flex items-center gap-3 border-b border-[#F0FEFA] dark:border-gray-700 pb-2 last:border-0 text-right hover:bg-[#F0FEFA] dark:hover:bg-gray-800/50 rounded-xl px-2 py-1 transition-all">
                      <div className="flex-1 min-w-0">
                        <p className="text-[#0D2926] dark:text-gray-100 text-sm font-semibold line-clamp-1">{p.title}</p>
                        <p className="text-[#90AFAC] text-xs">{p.submittedBy} · {p.submittedAt}</p>
                      </div>
                      <span className="flex-none text-[10px] font-bold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">مراجعة</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setTab('pending')}
                  className="w-full mt-3 py-2.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 font-bold rounded-xl text-sm">
                  عرض الكل ←
                </button>
              </div>
            )}

            {/* Publish announcement */}
            <div className="card-glass rounded-2xl p-4">
              <h3 className="font-bold text-[#0D2926] dark:text-gray-100 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#00BFA5] rounded-full" />
                <Bell size={14} className="text-[#00BFA5]" />
                نشر إعلان للمستخدمين
              </h3>
              <div className="space-y-3">
                <input value={announcementTitle} onChange={e => setAnnouncementTitle(e.target.value)}
                  className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-3 py-2.5 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm"
                  placeholder="عنوان الإعلان" />
                <textarea value={announcementBody} onChange={e => setAnnouncementBody(e.target.value)} rows={3}
                  className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-3 py-2.5 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm resize-none"
                  placeholder="نص الإعلان..." />
                <button onClick={() => { if (announcementTitle) { showToast('تم نشر الإعلان للمستخدمين ✓'); setAnnouncementTitle(''); setAnnouncementBody(''); } else showToast('أدخل عنوان الإعلان', false); }}
                  className="w-full py-3 bg-[#00BFA5] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm">
                  <Megaphone size={15} /> نشر الإعلان
                </button>
              </div>
            </div>

            {/* Properties preview */}
            <div className="card-glass rounded-2xl p-4">
              <h3 className="font-bold text-[#0D2926] dark:text-gray-100 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#00BFA5] rounded-full" />
                أحدث المنتجات
              </h3>
              <div className="space-y-3">
                {properties.slice(0, 4).map(p => (
                  <div key={p.id} className="flex items-center gap-3 border-b border-[#F0FEFA] dark:border-gray-700 pb-2 last:border-0">
                    <img src={p.images[0]} alt="" className="w-12 h-10 rounded-xl object-cover flex-none" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#0D2926] dark:text-gray-100 text-sm font-semibold line-clamp-1">{p.title}</p>
                      <p className="text-[#90AFAC] text-xs">{p.requestCount} مشاهدة</p>
                    </div>
                    {p.website && (
                      <a href={p.website} target="_blank" rel="noreferrer"
                        className="flex-none w-7 h-7 bg-[#E0F7F4] dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                        <Link size={13} className="text-[#009688]" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Pending Listings ── */}
        {tab === 'pending' && !selectedListing && (
          <div className="space-y-3 page-enter">
            {/* Filter tabs */}
            <div className="flex gap-2">
              {[
                { key: 'all',      label: `الكل (${pending.length})`,       color: 'bg-[#E0F7F4] text-[#007B69]' },
                { key: 'pending',  label: `قيد المراجعة (${pendingCount})`,  color: 'bg-amber-50 text-amber-600' },
                { key: 'approved', label: `موافق (${approvedCount})`,         color: 'bg-green-50 text-green-600' },
                { key: 'rejected', label: `مرفوض (${rejectedCount})`,         color: 'bg-red-50 text-red-500'    },
              ].map(f => (
                <button key={f.key} className={`flex-none px-3 py-1.5 rounded-xl text-xs font-bold ${f.color}`}>
                  {f.label}
                </button>
              ))}
            </div>

            {pending.map(p => (
              <div key={p.id}
                className="card-glass rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
                onClick={() => setSelectedListing(p)}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0D2926] dark:text-gray-100 font-bold text-sm line-clamp-1">{p.title}</p>
                    <p className="text-[#4A7B76] dark:text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin size={10} className="text-[#00BFA5]" /> {p.city} — {p.neighborhood}
                    </p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div className="flex items-center gap-4 text-xs text-[#4A7B76] dark:text-gray-400">
                  <span className="font-bold text-[#0D2926] dark:text-gray-200">{p.price}</span>
                  <span>{p.type}</span>
                  <span>{p.area} قطعة</span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E0F7F4] dark:border-gray-700">
                  <span className="text-[#90AFAC] text-[11px]">{p.submittedBy} · {p.submittedAt}</span>
                  {p.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={e => { e.stopPropagation(); handleApprove(p.id); }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white font-bold rounded-xl text-xs active:scale-95 transition-all">
                        <CheckCircle size={12} /> موافقة
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); handleReject(p.id); }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 border border-red-200 font-bold rounded-xl text-xs active:scale-95 transition-all">
                        <XCircle size={12} /> رفض
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Listing Detail / Review ── */}
        {tab === 'pending' && selectedListing && (
          <div className="space-y-4 page-enter">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => setSelectedListing(null)}
                className="w-9 h-9 bg-[#E0F7F4] dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                <ChevronRight size={18} className="text-[#009688]" />
              </button>
              <div>
                <h2 className="font-black text-[#0D2926] dark:text-gray-100 text-base">مراجعة الإعلان</h2>
                <p className="text-[#90AFAC] text-xs">{selectedListing.submittedAt}</p>
              </div>
            </div>

            {/* Listing info card */}
            <div className="card-glass rounded-2xl p-5 space-y-3">
              <div className="flex items-start justify-between">
                <StatusBadge status={selectedListing.status} />
                <div className="text-right">
                  <h3 className="font-black text-[#0D2926] dark:text-gray-100 text-base">{selectedListing.title}</h3>
                  <p className="text-[#4A7B76] dark:text-gray-400 text-xs flex items-center gap-1 justify-end mt-0.5">
                    <MapPin size={10} className="text-[#00BFA5]" /> {selectedListing.city} — {selectedListing.neighborhood}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  { label: 'النوع',     value: selectedListing.type    },
                  { label: 'السعر',     value: selectedListing.price   },
                  { label: 'الكمية',    value: selectedListing.area + ' قطعة' },
                  { label: 'التقييم',   value: selectedListing.beds    },
                  { label: 'المدينة',   value: selectedListing.city    },
                  { label: 'مقدم من',  value: selectedListing.submittedBy },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#F0FEFA] dark:bg-gray-800/50 rounded-xl p-3">
                    <p className="text-[#90AFAC] text-[10px] font-semibold mb-0.5">{label}</p>
                    <p className="text-[#0D2926] dark:text-gray-100 font-bold text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Placeholder for images */}
            <div className="card-glass rounded-2xl p-4">
              <p className="text-[#4A7B76] dark:text-gray-400 text-xs font-bold mb-2 flex items-center gap-1.5">
                <Eye size={13} className="text-[#00BFA5]" /> صور المنتج
              </p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {[1,2,3].map(i => (
                  <div key={i} className="w-24 h-20 flex-none rounded-xl bg-[#E0F7F4] dark:bg-gray-700 flex items-center justify-center">
                    <Home size={22} className="text-[#B2DFDB]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Admin notes */}
            <div className="card-glass rounded-2xl p-4">
              <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-bold mb-2 block">ملاحظات الإدارة</label>
              <textarea rows={3}
                className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-3 py-2.5 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm resize-none"
                placeholder="أضف ملاحظة تُرسل للمستخدم عند القرار..." />
            </div>

            {/* Actions */}
            {selectedListing.status === 'pending' && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleApprove(selectedListing.id)}
                  className="py-4 bg-green-500 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-[0.97] transition-all">
                  <CheckCircle size={18} /> موافقة ونشر
                </button>
                <button
                  onClick={() => handleReject(selectedListing.id)}
                  className="py-4 bg-red-50 dark:bg-red-900/20 text-red-500 border-2 border-red-200 dark:border-red-800 font-black rounded-2xl flex items-center justify-center gap-2 active:scale-[0.97] transition-all">
                  <XCircle size={18} /> رفض
                </button>
              </div>
            )}
            {selectedListing.status !== 'pending' && (
              <div className={`py-4 rounded-2xl text-center font-bold ${
                selectedListing.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-50 dark:bg-red-900/20 text-red-500'
              }`}>
                {selectedListing.status === 'approved' ? '✓ تمت الموافقة ونُشر الإعلان' : '✕ تم رفض هذا الإعلان'}
              </div>
            )}
          </div>
        )}

        {/* ── Properties ── */}
        {tab === 'properties' && !showForm && (
          <div className="space-y-3 page-enter">
            <button onClick={() => { setFormTitle(''); setFormWebsite(''); setFormLat(24.7136); setFormLng(46.6753); setShowForm(true); }}
              className="w-full py-3.5 bg-[#00BFA5] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg">
              <Plus size={18} /> إضافة منتج جديد
            </button>

            {properties.map(p => (
              <div key={p.id} className="card-glass rounded-2xl p-3 flex items-center gap-3">
                <img src={p.images[0]} alt="" className="w-14 h-12 rounded-xl object-cover flex-none" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#0D2926] dark:text-gray-100 font-semibold text-sm line-clamp-1">{p.title}</p>
                  <p className="text-[#4A7B76] dark:text-gray-400 text-xs flex items-center gap-1">
                    <MapPin size={10} className="text-[#00BFA5]" /> {p.neighborhood}
                  </p>
                  {p.website && (
                    <a href={p.website} target="_blank" rel="noreferrer"
                      className="text-[#009688] text-xs flex items-center gap-1 hover:underline truncate max-w-[160px]">
                      <Link size={9} /> {p.website.replace('https://', '')}
                    </a>
                  )}
                </div>
                <div className="flex gap-1.5 flex-none">
                  <button onClick={() => showToast('تم التعديل بنجاح')}
                    className="w-8 h-8 bg-[#E0F7F4] dark:bg-teal-900/30 text-[#009688] rounded-xl flex items-center justify-center">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => showToast('تم الحذف بنجاح')}
                    className="w-8 h-8 bg-red-50 dark:bg-red-900/20 text-red-400 rounded-xl flex items-center justify-center">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Add property form ── */}
        {tab === 'properties' && showForm && (
          <div className="space-y-4 page-enter">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => setShowForm(false)}
                className="w-9 h-9 bg-[#E0F7F4] dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                <ChevronRight size={18} className="text-[#009688]" />
              </button>
              <h2 className="font-black text-[#0D2926] dark:text-gray-100 text-lg">إضافة منتج جديد</h2>
            </div>

            <div className="card-glass rounded-2xl p-4">
              <label className="text-[#4A7B76] text-xs font-bold mb-1.5 block">اسم المنتج *</label>
              <input value={formTitle} onChange={e => setFormTitle(e.target.value)}
                className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-3 py-3 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm"
                placeholder="مثال: سماعات لاسلكية بإصدار حديث" />
            </div>

            <div className="card-glass rounded-2xl p-4">
              <label className="text-[#4A7B76] text-xs font-bold mb-1.5 flex items-center gap-1.5 block">
                <Link size={13} className="text-[#00BFA5]" /> رابط الموقع (اختياري)
              </label>
              <input value={formWebsite} onChange={e => setFormWebsite(e.target.value)}
                className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-3 py-3 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm"
                placeholder="https://www.example.com/property" dir="ltr" type="url" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[['السعر', 'SAR', 'ltr'], ['الكمية', '1', 'ltr'], ['المتجر', 'متجر النخبة', 'rtl'], ['التقييم', '5', 'ltr']].map(([label, ph, dir]) => (
                <div key={label} className="card-glass rounded-2xl p-3">
                  <label className="text-[#4A7B76] text-xs font-bold mb-1.5 block">{label}</label>
                  <input className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-lg px-3 py-2 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm"
                    placeholder={ph} dir={dir as 'ltr' | 'rtl'} />
                </div>
              ))}
            </div>

            <div className="card-glass rounded-2xl p-4">
              <label className="text-[#4A7B76] text-xs font-bold mb-3 flex items-center gap-1.5 block">
                <MapPin size={13} className="text-[#00BFA5]" /> الموقع على الخريطة
              </label>
              <MapPicker lat={formLat} lng={formLng} onPick={(lat, lng) => { setFormLat(lat); setFormLng(lng); }} height="240px" />
              <div className="mt-2 flex gap-3 text-xs text-[#4A7B76]">
                <span>خط العرض: <code className="bg-[#E0F7F4] px-1 rounded">{formLat.toFixed(5)}</code></span>
                <span>خط الطول: <code className="bg-[#E0F7F4] px-1 rounded">{formLng.toFixed(5)}</code></span>
              </div>
            </div>

            <button
              onClick={() => { showToast('تمت إضافة المنتج بنجاح ✓'); setShowForm(false); }}
              className="w-full py-4 bg-[#00BFA5] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2">
              <Save size={18} /> حفظ المنتج
            </button>
          </div>
        )}

        {/* ── Ads ── */}
        {tab === 'ads' && (
          <div className="space-y-3 page-enter">
            <button onClick={() => showToast('تم إضافة الإعلان بنجاح')}
              className="w-full py-3.5 bg-[#00BFA5] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg">
              <Plus size={18} /> إضافة إعلان
            </button>

            {ads.map(ad => (
              <div key={ad.id} className="card-glass rounded-2xl p-4 flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${ad.active ? 'bg-[#4CAF50]' : 'bg-[#B2DFDB]'}`} />
                <div className="flex-1">
                  <p className="font-semibold text-[#0D2926] dark:text-gray-100 text-sm">{ad.title}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ad.active ? 'badge-green' : 'text-[#90AFAC] bg-gray-100 dark:bg-gray-700'}`}>
                    {ad.active ? 'نشط' : 'موقوف'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setAds(prev => prev.map(a => a.id === ad.id ? { ...a, active: !a.active } : a)); showToast(ad.active ? 'تم إيقاف الإعلان' : 'تم تفعيل الإعلان'); }}
                    className="w-8 h-8 bg-[#E0F7F4] dark:bg-teal-900/30 text-[#009688] rounded-xl flex items-center justify-center">
                    <ToggleLeft size={15} />
                  </button>
                  <button onClick={() => showToast('تم الحذف بنجاح')}
                    className="w-8 h-8 bg-red-50 dark:bg-red-900/20 text-red-400 rounded-xl flex items-center justify-center">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Settings ── */}
        {tab === 'settings' && (
          <div className="space-y-3 page-enter">
            {[
              { label: 'اسم التطبيق',        value: 'صفصاف للتجارة الإلكترونية', dir: 'rtl' },
              { label: 'رقم الواتساب',        value: '+966500000000',      dir: 'ltr' },
              { label: 'رابط الموقع الرسمي', value: 'https://safsaf-commerce.com', dir: 'ltr' },
              { label: 'البريد الإلكتروني',  value: 'info@safsaf.sa',             dir: 'ltr' },
            ].map(s => (
              <div key={s.label} className="card-glass rounded-2xl p-4">
                <label className="text-[#4A7B76] dark:text-gray-400 text-xs font-bold mb-1.5 block">{s.label}</label>
                <input defaultValue={s.value} dir={s.dir as 'rtl' | 'ltr'}
                  className="w-full bg-[#F0FEFA] dark:bg-gray-800 rounded-xl px-3 py-3 text-[#0D2926] dark:text-gray-100 outline-none border border-[#B2DFDB] dark:border-gray-600 focus:border-[#00BFA5] text-sm" />
              </div>
            ))}
            <button onClick={() => showToast('تم حفظ الإعدادات بنجاح')}
              className="w-full py-4 bg-[#00BFA5] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2">
              <Save size={18} /> حفظ الإعدادات
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

/* ── StatusBadge ── */
function StatusBadge({ status }: { status: PendingStatus }) {
  const map: Record<PendingStatus, { label: string; className: string; icon: React.ReactNode }> = {
    pending:  { label: 'قيد المراجعة', className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400', icon: <Clock size={10} /> },
    approved: { label: 'موافق عليه',   className: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', icon: <CheckCircle size={10} /> },
    rejected: { label: 'مرفوض',        className: 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400',           icon: <XCircle size={10} /> },
  };
  const { label, className, icon } = map[status];
  return (
    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${className}`}>
      {icon} {label}
    </span>
  );
}

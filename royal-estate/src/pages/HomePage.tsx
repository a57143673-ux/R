import { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X, TrendingUp, Star, Sparkles } from 'lucide-react';
import { properties, Property, CITIES, typeLabel } from '../data/mockData';
import { loadUserPosts } from '../data/userPosts';
import PropertyCard from '../components/PropertyCard';
import BrandedSelect from '../components/BrandedSelect';
import { useFavorites } from '../hooks/useFavorites';

const ADS = [
  { id: 1, title: 'عروض الصيف – خصم 25%',     sub: 'على المنتجات الأكثر طلباً',  img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900' },
  { id: 2, title: 'متجر النخبة',              sub: 'منتجات مختارة بجودة عالية',  img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900' },
  { id: 3, title: 'شحن مجاني لفترة محدودة',   sub: 'اطلب الآن واستمتع بالتوصيل', img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900' },
];

const QUICK_FILTERS = [
  { label: 'الكل',    type: 'all',        listing: 'all' },
  { label: 'عروض',      type: 'all',        listing: 'forSale' },
  { label: 'متاح الآن', type: 'all',        listing: 'forRent' },
  { label: 'إلكترونيات',type: 'villa',      listing: 'all' },
  { label: 'أزياء',     type: 'apartment',  listing: 'all' },
  { label: 'منزل',      type: 'house',      listing: 'all' },
  { label: 'عناية',     type: 'land',       listing: 'all' },
  { label: 'متنوع',     type: 'commercial', listing: 'all' },
];

interface Props {
  onPropertyClick: (p: Property) => void;
}

export default function HomePage({ onPropertyClick }: Props) {
  const [adIdx, setAdIdx]             = useState(0);
  const [search, setSearch]           = useState('');
  const [city, setCity]               = useState('');
  const [quickIdx, setQuickIdx]       = useState(0);
  const [showSearch, setShowSearch]   = useState(false);
  const [maxPrice, setMaxPrice]       = useState(0);
  const [minRooms, setMinRooms]       = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [userPosts, setUserPosts]     = useState<Property[]>([]);
  const { toggle, isFav }             = useFavorites();
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Auto-advance ad banner
  useEffect(() => {
    intervalRef.current = setInterval(() => setAdIdx(i => (i + 1) % ADS.length), 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setUserPosts(loadUserPosts());
  }, []);

  const qf = QUICK_FILTERS[quickIdx];

  const allProperties = [...userPosts, ...properties];
  const filtered = allProperties.filter(p => {
    const q = search.toLowerCase();
    const matchSearch  = !search || p.title.includes(search) || p.neighborhood.includes(search) || p.city.includes(search);
    const matchCity    = !city   || p.city === city;
    const matchType    = qf.type    === 'all' || p.type        === qf.type;
    const matchListing = qf.listing === 'all' || p.listingType === qf.listing;
    const matchPrice   = !maxPrice  || p.price <= maxPrice;
    const matchRooms   = !minRooms  || (p.bedrooms != null && p.bedrooms >= minRooms);
    return matchSearch && matchCity && matchType && matchListing && matchPrice && matchRooms;
  });

  const featured = allProperties.filter(p => p.isFeatured);

  return (
    <div className="pb-28 min-h-screen dark:bg-gray-900">

      {/* ── Hero / Search header ──────────────────────────── */}
      <div className="hero-gradient relative overflow-hidden px-4 pt-4 pb-6">
        {/* Decorative circles */}
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10">
          <p className="text-white/70 text-sm mb-0.5">مرحباً 👋</p>
          <h1 className="text-white font-black text-2xl mb-4 leading-tight">اكتشف منتجاتك المفضلة</h1>

          {/* Main search bar */}
          <div className="bg-white/95 dark:bg-gray-800 rounded-2xl shadow-xl p-3 space-y-2.5">
            {/* Search input */}
            <div className="flex items-center gap-2 bg-[#F0FEFA] dark:bg-gray-700 rounded-xl px-3 py-2.5">
              <Search size={16} className="text-[#00BFA5] flex-none" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث عن منتج، متجر، تصنيف..."
                className="flex-1 bg-transparent outline-none text-[#0D2926] dark:text-gray-100 text-sm placeholder:text-[#90AFAC]"
              />
              {search && <button onClick={() => setSearch('')}><X size={14} className="text-[#90AFAC]" /></button>}
            </div>

            {/* City + Price row */}
            <div className="flex gap-2">
              {/* City picker */}
              <div className="relative flex-1">
                <BrandedSelect
                  value={city}
                  onChange={setCity}
                  placeholder="كل المدن"
                  options={CITIES.map(c => ({ value: c, label: c }))}
                />
              </div>

              {/* Rooms picker */}
              <div className="relative">
                <BrandedSelect
                  value={String(minRooms)}
                  onChange={value => setMinRooms(Number(value))}
                  placeholder="التفاصيل"
                  options={[{ value: '0', label: 'كل التفاصيل' }, ...[1,2,3,4,5].map(n => ({ value: String(n), label: `${n}+` }))]}
                />
              </div>

              {/* Filters toggle */}
              <button
                onClick={() => setShowFilters(v => !v)}
                className={`px-3 py-2.5 rounded-xl flex items-center gap-1 text-xs font-bold transition-all ${
                  showFilters ? 'bg-[#00BFA5] text-white' : 'bg-[#F0FEFA] dark:bg-gray-700 text-[#4A7B76] dark:text-gray-300'
                }`}
              >
                <SlidersHorizontal size={14} />
              </button>
            </div>

            {/* Advanced filters */}
            {showFilters && (
              <div className="pt-1 border-t border-[#E0F7F4] dark:border-gray-600 space-y-2">
                <p className="text-[#4A7B76] text-xs font-bold">الحد الأقصى للسعر (ريال)</p>
                <div className="flex gap-2 flex-wrap">
                  {[0, 500000, 1000000, 2000000, 5000000].map(v => (
                    <button key={v} onClick={() => setMaxPrice(v)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        maxPrice === v ? 'bg-[#00BFA5] text-white border-[#00BFA5]' : 'border-[#B2DFDB] text-[#4A7B76]'
                      }`}>
                      {v === 0 ? 'بدون حد' : v >= 1000000 ? `${v/1000000}م` : `${v/1000}ألف`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Ad banner ─────────────────────────────────────── */}
      <div className="px-4 mt-4">
        <div className="relative h-40 rounded-3xl overflow-hidden shadow-lg">
          {ADS.map((ad, i) => (
            <div key={ad.id}
              className={`absolute inset-0 transition-opacity duration-700 ${i === adIdx ? 'opacity-100' : 'opacity-0'}`}>
              <img src={ad.img} alt={ad.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <p className="text-white/80 text-xs mb-1">{ad.sub}</p>
                <p className="text-white font-black text-lg leading-tight">{ad.title}</p>
                <button className="mt-2 self-start bg-[#00BFA5] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  اكتشف الآن
                </button>
              </div>
            </div>
          ))}
          {/* Dots */}
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            {ADS.map((_, i) => (
              <button key={i} onClick={() => setAdIdx(i)}
                className={`swiper-dot ${i === adIdx ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mt-5 space-y-5">

        {userPosts.length > 0 && !search && !city && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#90AFAC] text-xs">يظهر للمتابعين فوراً</span>
              <h2 className="font-black text-[#0D2926] dark:text-gray-100 text-lg">منشورات جديدة</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {userPosts.slice(0, 3).map(post => (
                <PropertyCard key={post.id} property={post} onClick={() => onPropertyClick(post)} isFav={isFav(post.id)} onToggleFav={toggle} />
              ))}
            </div>
          </section>
        )}

        {/* ── Featured properties (horizontal scroll) ─────── */}
        {featured.length > 0 && !search && !city && quickIdx === 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="font-black text-[#0D2926] dark:text-gray-100 text-lg">منتجات مختارة</h2>
                <Sparkles size={16} className="text-amber-400" />
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
              {featured.map(p => (
                <div key={p.id} className="flex-none w-64">
                  <PropertyCard property={p} onClick={() => onPropertyClick(p)} isFav={isFav(p.id)} onToggleFav={toggle} compact />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Quick filter chips ───────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#4A7B76] dark:text-gray-400 text-xs flex items-center gap-1">
              <TrendingUp size={12} className="text-[#00BFA5]" />
              {filtered.length} منتج
            </span>
            <h2 className="font-black text-[#0D2926] dark:text-gray-100 text-lg">استكشف المنتجات</h2>
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 -mx-1 px-1">
            {QUICK_FILTERS.map((f, i) => (
              <button key={i} onClick={() => setQuickIdx(i)}
                className={`flex-none px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                  quickIdx === i
                    ? 'bg-[#00BFA5] text-white border-[#00BFA5] shadow-md'
                    : 'bg-white/80 dark:bg-gray-700 text-[#4A7B76] dark:text-gray-300 border-[#B2DFDB] dark:border-gray-600'
                }`}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Property grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Search size={48} className="text-[#B2DFDB] mx-auto mb-3" />
              <p className="text-[#4A7B76] font-bold">لا توجد منتجات</p>
              <p className="text-[#90AFAC] text-sm">جرّب تغيير الفلاتر</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filtered.slice(0, 6).map(p => (
                <PropertyCard key={p.id} property={p} onClick={() => onPropertyClick(p)} isFav={isFav(p.id)} onToggleFav={toggle} />
              ))}
            </div>
          )}

        </section>

        {/* ── Stats bar ─────────────────────────────────────── */}
        <section className="grid grid-cols-3 gap-3 py-2">
          {[
            { label: 'منتج', value: '+200', icon: '🛍️' },
            { label: 'قصة',  value: '+50',  icon: '✨' },
            { label: 'متجر', value: '+20',  icon: '🏪' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="card-glass rounded-2xl p-3 text-center">
              <p className="text-lg mb-0.5">{icon}</p>
              <p className="font-black text-[#00897B] dark:text-teal-400 text-base">{value}</p>
              <p className="text-[#4A7B76] dark:text-gray-400 text-[11px]">{label}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

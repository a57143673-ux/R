import { useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, MapPin } from 'lucide-react';
import { properties, Property, PropertyType, ListingType, typeLabel, listingLabel, CITIES } from '../data/mockData';
import PropertyCard from '../components/PropertyCard';
import BrandedSelect from '../components/BrandedSelect';
import { useFavorites } from '../hooks/useFavorites';

interface Props { onPropertyClick: (p: Property) => void; }

const TYPES: (PropertyType | 'all')[]    = ['all','villa','apartment','house','land','commercial'];
const LISTINGS: (ListingType | 'all')[]  = ['all','forSale','forRent'];
const PRICE_OPTS = [
  { label: 'أي سعر', value: 0 },
  { label: 'أقل من 500ألف',  value: 500000 },
  { label: 'أقل من 1م',      value: 1000000 },
  { label: 'أقل من 2م',      value: 2000000 },
  { label: 'أقل من 5م',      value: 5000000 },
];

export default function PropertiesPage({ onPropertyClick }: Props) {
  const [search, setSearch]           = useState('');
  const [typeFilter, setTypeFilter]   = useState<PropertyType | 'all'>('all');
  const [listFilter, setListFilter]   = useState<ListingType | 'all'>('all');
  const [city, setCity]               = useState('');
  const [maxPrice, setMaxPrice]       = useState(0);
  const [minRooms, setMinRooms]       = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const { toggle, isFav }             = useFavorites();

  const filtered = properties.filter(p => {
    const matchSearch  = !search  || p.title.includes(search) || p.neighborhood.includes(search) || p.city.includes(search);
    const matchType    = typeFilter === 'all' || p.type === typeFilter;
    const matchListing = listFilter === 'all' || p.listingType === listFilter;
    const matchCity    = !city    || p.city === city;
    const matchPrice   = !maxPrice || p.price <= maxPrice;
    const matchRooms   = !minRooms || (p.bedrooms != null && p.bedrooms >= minRooms);
    return matchSearch && matchType && matchListing && matchCity && matchPrice && matchRooms;
  });

  const activeFiltersCount = [
    typeFilter !== 'all', listFilter !== 'all', !!city, !!maxPrice, !!minRooms
  ].filter(Boolean).length;

  return (
    <div className="page-enter pb-28 dark:bg-gray-900 min-h-screen">
      {/* ── Header ── */}
      <div className="hero-gradient hero-curved text-white px-4 pt-4 pb-8">
        <h1 className="text-2xl font-black mb-4">المنتجات</h1>

        {/* Search row */}
        <div className="flex gap-2">
          <div className="glass-card flex-1 rounded-2xl flex items-center px-4 py-3 gap-3">
            <Search size={16} className="text-[#00BFA5] flex-none" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[#0D2926] placeholder:text-[#90AFAC] text-sm"
              placeholder="اسم المنتج، المتجر، التصنيف..."
            />
            {search && <button onClick={() => setSearch('')}><X size={14} className="text-[#90AFAC]" /></button>}
          </div>
          <button
            onClick={() => setShowFilters(v => !v)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center relative transition-all ${
              showFilters ? 'bg-white text-[#00897B]' : 'bg-white/20 text-white'
            }`}
          >
            <SlidersHorizontal size={18} />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">

        {/* ── Advanced filters panel ── */}
        {showFilters && (
          <div className="card-glass rounded-2xl p-4 space-y-4 animate-[fadeUp_.2s_ease-out] dark:bg-gray-800">

            {/* City */}
            <div>
              <p className="text-xs font-bold text-[#4A7B76] dark:text-gray-400 mb-2 flex items-center gap-1"><MapPin size={11} />المدينة</p>
              <BrandedSelect
                value={city}
                onChange={setCity}
                placeholder="كل المدن"
                options={CITIES.map(c => ({ value: c, label: c }))}
              />
            </div>

            {/* Type */}
            <div>
               <p className="text-xs font-bold text-[#4A7B76] dark:text-gray-400 mb-2">نوع المنتج</p>
              <div className="flex gap-2 flex-wrap">
                {TYPES.map(t => (
                  <button key={t} onClick={() => setTypeFilter(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      typeFilter === t ? 'bg-[#00BFA5] text-white border-[#00BFA5]' : 'bg-white dark:bg-gray-700 dark:text-gray-300 text-[#4A7B76] border-[#B2DFDB] dark:border-gray-600'
                    }`}>
                    {t === 'all' ? 'الكل' : typeLabel(t)}
                  </button>
                ))}
              </div>
            </div>

            {/* Listing type */}
            <div>
               <p className="text-xs font-bold text-[#4A7B76] dark:text-gray-400 mb-2">نوع التوفر</p>
              <div className="flex gap-2">
                {LISTINGS.map(l => (
                  <button key={l} onClick={() => setListFilter(l)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      listFilter === l ? 'bg-[#009688] text-white border-[#009688]' : 'bg-white dark:bg-gray-700 dark:text-gray-300 text-[#4A7B76] border-[#B2DFDB] dark:border-gray-600'
                    }`}>
                    {l === 'all' ? 'الكل' : listingLabel(l)}
                  </button>
                ))}
              </div>
            </div>

            {/* Max price */}
            <div>
              <p className="text-xs font-bold text-[#4A7B76] dark:text-gray-400 mb-2">الحد الأقصى للسعر</p>
              <div className="flex gap-2 flex-wrap">
                {PRICE_OPTS.map(o => (
                  <button key={o.value} onClick={() => setMaxPrice(o.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      maxPrice === o.value ? 'bg-[#00BFA5] text-white border-[#00BFA5]' : 'bg-white dark:bg-gray-700 dark:text-gray-300 text-[#4A7B76] border-[#B2DFDB] dark:border-gray-600'
                    }`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Min rooms */}
            <div>
              <p className="text-xs font-bold text-[#4A7B76] dark:text-gray-400 mb-2">الكمية المتاحة (الحد الأدنى)</p>
              <div className="flex gap-2">
                {[0,1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setMinRooms(n)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all ${
                      minRooms === n ? 'bg-[#00BFA5] text-white border-[#00BFA5]' : 'bg-white dark:bg-gray-700 dark:text-gray-300 text-[#4A7B76] border-[#B2DFDB] dark:border-gray-600'
                    }`}>
                    {n === 0 ? 'أي' : `${n}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => { setTypeFilter('all'); setListFilter('all'); setCity(''); setMaxPrice(0); setMinRooms(0); }}
              className="w-full py-2.5 border border-red-200 text-red-400 text-sm font-bold rounded-xl"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}

        {/* ── Quick type tabs ── */}
        {!showFilters && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
            {TYPES.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`flex-none px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                  typeFilter === t ? 'bg-[#00BFA5] text-white border-[#00BFA5] shadow-md' : 'bg-white/80 dark:bg-gray-700 dark:text-gray-300 text-[#4A7B76] border-[#B2DFDB] dark:border-gray-600'
                }`}>
                {t === 'all' ? 'الكل' : typeLabel(t)}
              </button>
            ))}
          </div>
        )}

             <p className="text-[#4A7B76] dark:text-gray-400 text-sm font-semibold">{filtered.length} منتج</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search size={48} className="text-[#B2DFDB] mx-auto mb-3" />
            <p className="text-[#4A7B76] font-bold text-lg">لا توجد نتائج</p>
            <p className="text-[#90AFAC] text-sm">جرّب تغيير معايير البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map(p => (
              <PropertyCard key={p.id} property={p} onClick={() => onPropertyClick(p)} isFav={isFav(p.id)} onToggleFav={toggle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

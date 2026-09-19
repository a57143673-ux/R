import { useState } from 'react';
import { Search, MapPin, Phone, MessageCircle, Globe, Users, Home, ChevronRight, Star, CheckCircle, SlidersHorizontal } from 'lucide-react';
import { companies, Company, CITIES } from '../data/mockData';

function StarRow({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={11} className={i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
        ))}
      </div>
      <span className="text-[#0D2926] dark:text-gray-200 font-bold text-xs ml-1">{rating}</span>
      <span className="text-[#90AFAC] text-[10px]">({count})</span>
    </div>
  );
}

export default function CompaniesPage() {
  const [selected,      setSelected]      = useState<Company | null>(null);
  const [search,        setSearch]        = useState('');
  const [cityFilter,    setCityFilter]    = useState('');
  const [verifiedOnly,  setVerifiedOnly]  = useState(false);
  const [showFilters,   setShowFilters]   = useState(false);

  const filtered = companies.filter(c => {
    const matchSearch   = !search       || c.name.includes(search) || c.neighborhood.includes(search) || c.city.includes(search);
    const matchCity     = !cityFilter   || c.city === cityFilter;
    const matchVerified = !verifiedOnly || c.isVerified;
    return matchSearch && matchCity && matchVerified;
  });

  if (selected) {
    return (
      <div className="page-enter pb-28 dark:bg-gray-900 min-h-screen">
        <div className="hero-gradient hero-curved text-white px-5 pt-4 pb-10">
          <button onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm font-semibold">
            <ChevronRight size={16} /> رجوع
          </button>
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={selected.logoUrl} alt={selected.name}
                className="w-20 h-20 rounded-2xl border-2 border-white/40 shadow-xl object-cover" />
              {selected.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow">
                  <CheckCircle size={13} className="text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-xl">{selected.name}</h1>
                {selected.isVerified && (
                  <span className="flex items-center gap-1 bg-blue-500/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-300/30">
                    <CheckCircle size={9} /> موثّق
                  </span>
                )}
              </div>
              <p className="text-white/75 text-sm mt-1 flex items-center gap-1">
                <MapPin size={12} /> {selected.city} — {selected.neighborhood}
              </p>
              <StarRow rating={selected.rating} count={selected.reviewCount} />
            </div>
          </div>
        </div>

        <div className="px-4 -mt-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="card-glass dark:bg-gray-800 rounded-2xl p-4 text-center">
              <Home size={20} className="text-[#00BFA5] mx-auto mb-1" />
              <div className="font-black text-[#00897B] dark:text-teal-400 text-xl">{selected.propertyCount}</div>
              <div className="text-[#4A7B76] dark:text-gray-400 text-xs">منتج</div>
            </div>
            <div className="card-glass dark:bg-gray-800 rounded-2xl p-4 text-center">
              <Users size={20} className="text-[#00BFA5] mx-auto mb-1" />
              <div className="font-black text-[#00897B] dark:text-teal-400 text-xl">{selected.agentCount}</div>
              <div className="text-[#4A7B76] dark:text-gray-400 text-xs">وكيل</div>
            </div>
            <div className="card-glass dark:bg-gray-800 rounded-2xl p-4 text-center">
              <Star size={20} className="text-amber-400 mx-auto mb-1 fill-amber-400" />
              <div className="font-black text-amber-500 text-xl">{selected.rating}</div>
              <div className="text-[#4A7B76] dark:text-gray-400 text-xs">تقييم</div>
            </div>
          </div>

          {selected.specialties && (
            <div className="card-glass dark:bg-gray-800 rounded-2xl p-4">
              <p className="text-[#4A7B76] text-xs font-bold mb-2">التخصصات</p>
              <div className="flex gap-2 flex-wrap">
                {selected.specialties.map(s => (
                  <span key={s} className="px-3 py-1 bg-[#E0F7F4] dark:bg-teal-900/40 text-[#009688] dark:text-teal-300 text-xs font-bold rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="card-glass dark:bg-gray-800 rounded-2xl p-4">
            <p className="text-[#4A7B76] text-xs flex items-center gap-1 mb-1"><MapPin size={11} className="text-[#00BFA5]" /> العنوان</p>
            <p className="font-semibold text-[#0D2926] dark:text-gray-200 text-sm">{selected.location}</p>
          </div>

          <div className="card-glass dark:bg-gray-800 rounded-2xl p-4">
              <h3 className="font-bold text-[#0D2926] dark:text-gray-100 mb-2 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#00BFA5] rounded-full" /> عن المتجر
            </h3>
            <p className="text-[#4A7B76] dark:text-gray-400 leading-relaxed text-sm">{selected.description}</p>
          </div>

          <div className="space-y-3">
            <a href={`https://wa.me/${selected.whatsapp}`} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl shadow-lg">
              <MessageCircle size={18} /> واتساب
            </a>
            {selected.phone && (
              <a href={`tel:${selected.phone}`}
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#00BFA5] text-white font-bold rounded-2xl shadow-lg">
                <Phone size={18} /> اتصال مباشر
              </a>
            )}
            {selected.website && (
              <a href={selected.website} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 border-2 border-[#00BFA5] text-[#00BFA5] font-bold rounded-2xl">
                <Globe size={18} /> الموقع الإلكتروني
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter pb-28 dark:bg-gray-900 min-h-screen">
      <div className="hero-gradient hero-curved text-white px-4 pt-4 pb-8">
        <h1 className="text-2xl font-black mb-4">المتاجر</h1>
        <div className="flex gap-2">
          <div className="glass-card flex-1 rounded-2xl flex items-center px-4 py-3 gap-3">
            <Search size={16} className="text-[#00BFA5] flex-none" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[#0D2926] placeholder:text-[#90AFAC] text-sm"
              placeholder="اسم المتجر أو المدينة..." />
          </div>
          <button onClick={() => setShowFilters(v => !v)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${showFilters ? 'bg-white text-[#00897B]' : 'bg-white/20 text-white'}`}>
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {showFilters && (
          <div className="card-glass dark:bg-gray-800 rounded-2xl p-4 space-y-3">
            <div>
              <p className="text-xs font-bold text-[#4A7B76] mb-2">المدينة</p>
              <div className="flex gap-2 flex-wrap">
                {['', ...CITIES].map(c => (
                  <button key={c} onClick={() => setCityFilter(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      cityFilter === c ? 'bg-[#00BFA5] text-white border-[#00BFA5]' : 'bg-white dark:bg-gray-700 dark:text-gray-300 text-[#4A7B76] border-[#B2DFDB] dark:border-gray-600'
                    }`}>{c || 'الكل'}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
               <span className="text-sm font-bold text-[#0D2926] dark:text-gray-200">المتاجر الموثّقة فقط</span>
              <button onClick={() => setVerifiedOnly(v => !v)}
                className={`w-12 h-6 rounded-full transition-all relative ${verifiedOnly ? 'bg-[#00BFA5]' : 'bg-gray-200 dark:bg-gray-600'}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${verifiedOnly ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        )}

        <p className="text-[#4A7B76] dark:text-gray-400 text-sm">{filtered.length} متجر</p>

        {filtered.map(c => (
          <div key={c.id} onClick={() => setSelected(c)}
            className="card-glass dark:bg-gray-800 card-glass-hover rounded-2xl p-4 cursor-pointer flex items-center gap-4">
            <div className="relative flex-none">
              <img src={c.logoUrl} alt={c.name}
                className="w-16 h-16 rounded-2xl object-cover shadow-md" />
              {c.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow">
                  <CheckCircle size={12} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-[#0D2926] dark:text-gray-100 text-base">{c.name}</h3>
                {c.isVerified && (
                  <CheckCircle size={14} className="text-blue-500 flex-none" />
                )}
              </div>
              <p className="text-[#4A7B76] dark:text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                <MapPin size={10} className="text-[#00BFA5]" /> {c.city} — {c.neighborhood}
              </p>
              <StarRow rating={c.rating} count={c.reviewCount} />
              <div className="flex gap-3 mt-1.5 text-xs text-[#4A7B76] dark:text-gray-400">
                <span className="flex items-center gap-1"><Home size={10} className="text-[#00BFA5]" />{c.propertyCount} منتج</span>
                <span className="flex items-center gap-1"><Users size={10} className="text-[#00BFA5]" />{c.agentCount} بائع</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#00BFA5] flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

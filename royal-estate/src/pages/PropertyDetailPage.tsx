import { useState } from 'react';
import {
  ChevronRight, MapPin, Bed, Bath, Maximize2, Phone, MessageCircle,
  Heart, Share2, Star, CheckCircle, Calendar, Car, Droplets, Trees,
  Calculator, ChevronDown, ChevronUp, Eye, ShieldCheck, Users,
} from 'lucide-react';
import { Property, formatPrice, typeLabel, listingLabel } from '../data/mockData';
import MapPicker from '../components/MapPicker';
import { useFavorites } from '../hooks/useFavorites';

interface Props { property: Property; onBack: () => void; }

// ── Mortgage calculator ────────────────────────────────────
function MortgageCalc({ price }: { price: number }) {
  const [down,     setDown]     = useState(20);
  const [years,    setYears]    = useState(20);
  const [rate,     setRate]     = useState(4.5);
  const [expanded, setExpanded] = useState(false);

  const loanAmount  = price * (1 - down / 100);
  const monthlyRate = rate / 100 / 12;
  const n           = years * 12;
  const monthly     = monthlyRate === 0
    ? loanAmount / n
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const totalPaid   = monthly * n;
  const totalInterest = totalPaid - loanAmount;

  const fmt = (v: number) => v >= 1_000_000
    ? `${(v / 1_000_000).toFixed(2)} م`
    : `${Math.round(v).toLocaleString('ar')}`;

  return (
    <div className="card-glass rounded-2xl overflow-hidden dark:bg-gray-800">
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-2">
          {expanded ? <ChevronUp size={18} className="text-[#00BFA5]" /> : <ChevronDown size={18} className="text-[#00BFA5]" />}
          <span className="font-bold text-[#0D2926] dark:text-gray-100 text-sm">احسب قسطك الشهري</span>
        </div>
        <div className="flex items-center gap-2">
          <Calculator size={18} className="text-[#00BFA5]" />
          <span className="w-1 h-5 bg-[#00BFA5] rounded-full" />
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Result */}
          <div className="bg-gradient-to-r from-[#00897B] to-[#00BFA5] rounded-2xl p-4 text-center text-white">
            <p className="text-white/70 text-xs mb-1">القسط الشهري التقريبي</p>
            <p className="font-black text-3xl">{fmt(monthly)} ر.س</p>
            <div className="flex justify-center gap-4 mt-2 text-xs text-white/75">
              <span>مبلغ القرض: {fmt(loanAmount)}</span>
              <span>إجمالي الفوائد: {fmt(totalInterest)}</span>
            </div>
          </div>

          {/* Down payment */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-[#0D2926] dark:text-gray-200 font-bold text-sm">الدفعة الأولى: {down}%</span>
              <span className="text-[#00897B] text-sm font-bold">{fmt(price * down / 100)} ر.س</span>
            </div>
            <input type="range" min={5} max={50} value={down} onChange={e => setDown(Number(e.target.value))}
              className="w-full accent-[#00BFA5]" />
          </div>

          {/* Loan term */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-[#0D2926] dark:text-gray-200 font-bold text-sm">مدة القرض: {years} سنة</span>
            </div>
            <input type="range" min={5} max={30} value={years} onChange={e => setYears(Number(e.target.value))}
              className="w-full accent-[#00BFA5]" />
          </div>

          {/* Interest rate */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-[#0D2926] dark:text-gray-200 font-bold text-sm">نسبة الفائدة: {rate}%</span>
            </div>
            <input type="range" min={1} max={10} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))}
              className="w-full accent-[#00BFA5]" />
          </div>

          <p className="text-[#90AFAC] text-[10px] text-center">* هذه تقديرات تقريبية للتخطيط فقط</p>
        </div>
      )}
    </div>
  );
}

// ── Star rating display ───────────────────────────────────
function StarRow({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={13} className={i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
        ))}
      </div>
      <span className="text-[#0D2926] dark:text-gray-200 font-bold text-sm">{rating}</span>
      <span className="text-[#4A7B76] text-xs">({count} تقييم)</span>
    </div>
  );
}

export default function PropertyDetailPage({ property, onBack }: Props) {
  const [imgIdx, setImgIdx] = useState(0);
  const [shared, setShared] = useState(false);
  const { toggle, isFav }   = useFavorites();
  const fav = isFav(property.id);

  const hasMap = property.lat != null && property.lng != null;

  const handleShare = async () => {
    try {
      await navigator.share({ title: property.title, text: property.description, url: window.location.href });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="page-enter pb-32 min-h-screen dark:bg-gray-900">

      {/* ── Image gallery ── */}
      <div className="relative" style={{ height: 320 }}>
        <img
          src={property.images[imgIdx]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Back */}
        <button onClick={onBack}
          className="absolute top-12 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
          <ChevronRight size={20} className="text-[#0D2926]" />
        </button>

        {/* Top actions */}
        <div className="absolute top-12 left-4 flex gap-2">
          <button onClick={() => toggle(property.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all ${
              fav ? 'bg-red-500' : 'bg-white/80'
            }`}>
            <Heart size={16} className={fav ? 'text-white fill-white' : 'text-[#0D2926]'} />
          </button>
          <button onClick={handleShare}
            className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
            <Share2 size={15} className="text-[#0D2926]" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-24 right-4 flex flex-col gap-1.5">
          <span className="bg-[#00BFA5] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            {typeLabel(property.type)}
          </span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full shadow ${
            property.listingType === 'forSale' ? 'bg-white/90 text-[#007B69]' : 'bg-orange-400 text-white'
          }`}>
            {listingLabel(property.listingType)}
          </span>
          {property.isVerified && (
            <span className="flex items-center gap-1 bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              <CheckCircle size={10} /> موثّق
            </span>
          )}
        </div>

        {/* Image thumbnails */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 right-4 left-4 flex justify-between items-end">
            <div className="flex gap-1.5">
              {property.images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-12 h-9 rounded-xl overflow-hidden border-2 transition-all ${
                    i === imgIdx ? 'border-[#00BFA5] scale-110' : 'border-white/40'
                  }`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex gap-1.5">
              {property.images.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`swiper-dot ${i === imgIdx ? 'active' : ''}`} />
              ))}
            </div>
          </div>
        )}

        {/* Shared toast */}
        {shared && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#00BFA5] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
            تم نسخ الرابط ✓
          </div>
        )}
      </div>

      <div className="px-4 mt-4 space-y-4">

        {/* ── Title & location ── */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h1 className="font-black text-[#0D2926] dark:text-gray-100 text-xl leading-snug flex-1">{property.title}</h1>
            {property.isFeatured && (
              <span className="flex items-center gap-1 bg-amber-400 text-white text-xs font-bold px-2.5 py-1.5 rounded-full flex-none mt-0.5">
                <Star size={10} fill="white" /> مميز
              </span>
            )}
          </div>
          <p className="text-[#4A7B76] dark:text-teal-300 mt-1.5 flex items-center gap-1.5 text-sm">
            <MapPin size={14} className="text-[#00BFA5]" />
             المتجر: {property.address} — {property.city}
          </p>
          {property.rating && <div className="mt-2"><StarRow rating={property.rating} count={property.reviewCount || 0} /></div>}
        </div>

        {/* ── Price card ── */}
        <div className="card-glass dark:bg-gray-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[#90AFAC] text-xs mb-0.5">السعر</p>
            <p className="text-[#00897B] dark:text-teal-400 font-black text-2xl">
              {formatPrice(property.price, property.currency, property.listingType)}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[#90AFAC] text-xs">
            <Eye size={13} />
            {property.requestCount} مشاهدة
          </div>
        </div>

        {/* ── Stats grid ── */}
        <div className={`grid gap-3 ${
          (property.bedrooms != null && property.bathrooms != null) ? 'grid-cols-3' : 'grid-cols-2'
        }`}>
          {property.bedrooms != null && (
            <div className="card-glass dark:bg-gray-800 rounded-2xl p-3.5 text-center">
              <Bed size={22} className="text-[#00BFA5] mx-auto mb-1" />
              <div className="font-black text-[#0D2926] dark:text-gray-100 text-lg">{property.bedrooms}</div>
               <div className="text-[#4A7B76] dark:text-gray-400 text-xs">الكمية</div>
            </div>
          )}
          {property.bathrooms != null && (
            <div className="card-glass dark:bg-gray-800 rounded-2xl p-3.5 text-center">
              <Bath size={22} className="text-[#00BFA5] mx-auto mb-1" />
              <div className="font-black text-[#0D2926] dark:text-gray-100 text-lg">{property.bathrooms}</div>
               <div className="text-[#4A7B76] dark:text-gray-400 text-xs">التقييم</div>
            </div>
          )}
          <div className="card-glass dark:bg-gray-800 rounded-2xl p-3.5 text-center">
            <Maximize2 size={22} className="text-[#00BFA5] mx-auto mb-1" />
            <div className="font-black text-[#0D2926] dark:text-gray-100 text-lg">{property.area}</div>
             <div className="text-[#4A7B76] dark:text-gray-400 text-xs">تفاصيل</div>
          </div>
        </div>

        {/* ── Extra features ── */}
        {(property.parking || property.hasPool || property.hasGarden || property.yearBuilt || property.floor || property.hasMaids) && (
          <div className="card-glass dark:bg-gray-800 rounded-2xl p-4">
            <h3 className="font-bold text-[#0D2926] dark:text-gray-100 mb-3 flex items-center gap-2">
             <span className="w-1 h-5 bg-[#00BFA5] rounded-full" /> تفاصيل المنتج
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {property.parking && (
                <div className="flex flex-col items-center gap-1 bg-[#F0FEFA] dark:bg-gray-700 rounded-xl py-2.5">
                  <Car size={16} className="text-[#00BFA5]" />
                   <span className="text-[#0D2926] dark:text-gray-200 text-[11px] font-bold">{property.parking} قطعة</span>
                </div>
              )}
              {property.hasPool && (
                <div className="flex flex-col items-center gap-1 bg-[#F0FEFA] dark:bg-gray-700 rounded-xl py-2.5">
                  <Droplets size={16} className="text-blue-500" />
                   <span className="text-[#0D2926] dark:text-gray-200 text-[11px] font-bold">متوفر</span>
                </div>
              )}
              {property.hasGarden && (
                <div className="flex flex-col items-center gap-1 bg-[#F0FEFA] dark:bg-gray-700 rounded-xl py-2.5">
                  <Trees size={16} className="text-green-500" />
                   <span className="text-[#0D2926] dark:text-gray-200 text-[11px] font-bold">مميز</span>
                </div>
              )}
              {property.hasMaids && (
                <div className="flex flex-col items-center gap-1 bg-[#F0FEFA] dark:bg-gray-700 rounded-xl py-2.5">
                  <Users size={16} className="text-purple-500" />
                   <span className="text-[#0D2926] dark:text-gray-200 text-[11px] font-bold">جديد</span>
                </div>
              )}
              {property.floor && (
                <div className="flex flex-col items-center gap-1 bg-[#F0FEFA] dark:bg-gray-700 rounded-xl py-2.5">
                  <ChevronUp size={16} className="text-[#00BFA5]" />
                   <span className="text-[#0D2926] dark:text-gray-200 text-[11px] font-bold">خيار {property.floor}</span>
                </div>
              )}
              {property.yearBuilt && (
                <div className="flex flex-col items-center gap-1 bg-[#F0FEFA] dark:bg-gray-700 rounded-xl py-2.5">
                  <Calendar size={16} className="text-[#00BFA5]" />
                  <span className="text-[#0D2926] dark:text-gray-200 text-[11px] font-bold">{property.yearBuilt}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Description ── */}
        <div className="card-glass dark:bg-gray-800 rounded-2xl p-4">
          <h3 className="font-bold text-[#0D2926] dark:text-gray-100 mb-2 flex items-center gap-2">
             <span className="w-1 h-5 bg-[#00BFA5] rounded-full" /> وصف المنتج
          </h3>
          <p className="text-[#4A7B76] dark:text-gray-400 leading-relaxed text-sm">{property.description}</p>
        </div>

        {/* ── Agent card ── */}
        {property.agentName && (
          <div className="card-glass dark:bg-gray-800 rounded-2xl p-4">
            <h3 className="font-bold text-[#0D2926] dark:text-gray-100 mb-3 flex items-center gap-2">
               <span className="w-1 h-5 bg-[#00BFA5] rounded-full" /> صاحب المتجر
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#E0F7F4] dark:bg-gray-700 rounded-full flex items-center justify-center text-xl font-black text-[#00897B]">
                {property.agentName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-[#0D2926] dark:text-gray-100">{property.agentName}</p>
                {property.isVerified && (
                  <p className="flex items-center gap-1 text-blue-500 text-xs font-bold mt-0.5">
                     <ShieldCheck size={11} /> متجر موثّق
                  </p>
                )}
                {property.rating && <StarRow rating={property.rating} count={property.reviewCount || 0} />}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <a href={`tel:${property.agentPhone}`}
                className="flex flex-col items-center gap-1.5 py-3 bg-[#00BFA5] text-white rounded-2xl shadow-md active:scale-95 transition-all">
                <Phone size={18} />
                 <span className="text-xs font-bold">تواصل</span>
              </a>
              <a href={`https://wa.me/${property.agentWhatsapp}?text=مرحباً، أرغب في الاستفسار عن: ${property.title}`}
                target="_blank" rel="noreferrer"
                className="flex flex-col items-center gap-1.5 py-3 bg-[#25D366] text-white rounded-2xl shadow-md active:scale-95 transition-all">
                <MessageCircle size={18} />
                <span className="text-xs font-bold">واتساب</span>
              </a>
              <button
                className="flex flex-col items-center gap-1.5 py-3 bg-[#E0F7F4] dark:bg-gray-700 text-[#009688] dark:text-teal-400 rounded-2xl active:scale-95 transition-all">
                <MessageCircle size={18} />
                 <span className="text-xs font-bold">دردشة</span>
              </button>
            </div>
          </div>
        )}

        {/* ── Mortgage calculator ── */}
        <MortgageCalc price={property.price} />

        {/* ── Map ── */}
        {hasMap && (
          <div className="card-glass dark:bg-gray-800 rounded-2xl p-4">
            <h3 className="font-bold text-[#0D2926] dark:text-gray-100 mb-3 flex items-center gap-2">
             <span className="w-1 h-5 bg-[#00BFA5] rounded-full" /> موقع المتجر
            </h3>
            <MapPicker lat={property.lat!} lng={property.lng!} readonly height="220px" />
            <p className="text-[#4A7B76] text-xs mt-2 flex items-center gap-1">
              <MapPin size={11} className="text-[#00BFA5]" />
              {property.neighborhood} — {property.city}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

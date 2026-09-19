import { useState } from 'react';
import { Bed, Bath, Maximize2, MapPin, Star, Tag, Heart, BadgeCheck } from 'lucide-react';
import { Property, formatPrice, typeLabel, listingLabel } from '../data/mockData';

interface Props {
  property: Property;
  onClick: () => void;
  isFav?: boolean;
  onToggleFav?: (id: string) => void;
  compact?: boolean;
}

export default function PropertyCard({ property, onClick, isFav = false, onToggleFav, compact }: Props) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      className={`card-glass card-glass-hover rounded-3xl overflow-hidden cursor-pointer shadow-sm`}
      onClick={onClick}
    >
      {/* ── Image ── */}
      <div className={`relative overflow-hidden ${compact ? 'h-40' : 'h-56'}`}>
        <img
          src={imgErr ? 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900' : property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={() => setImgErr(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

        {/* ── Top-right: type + listing badges ── */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <span className="flex items-center gap-1 bg-[#00BFA5] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            <Tag size={10} />
            {typeLabel(property.type)}
          </span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-md ${
            property.listingType === 'forSale'
              ? 'bg-white/90 text-[#007B69]'
              : 'bg-orange-400 text-white'
          }`}>
            {listingLabel(property.listingType)}
          </span>
        </div>

        {/* ── Top-left: favourite ♥ ── */}
        {onToggleFav && (
          <button
            className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 ${
              isFav ? 'bg-red-500' : 'bg-black/30 backdrop-blur-sm'
            }`}
            onClick={e => { e.stopPropagation(); onToggleFav(property.id); }}
          >
            <Heart size={16} className="text-white" fill={isFav ? 'white' : 'none'} />
          </button>
        )}

        {/* ── Featured badge (below heart) ── */}
        {property.isFeatured && (
          <div className={`absolute left-3 flex items-center gap-1 bg-amber-400 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow ${onToggleFav ? 'top-[52px]' : 'top-3'}`}>
            <Star size={9} fill="white" /> مميز
          </div>
        )}

        {/* ── Price overlay (bottom) ── */}
        <div className="absolute bottom-3 right-3 left-3 flex items-end justify-between">
          <span className="bg-black/60 text-white text-sm font-black px-3 py-1.5 rounded-xl backdrop-blur-sm">
            {formatPrice(property.price, property.currency, property.listingType)}
          </span>
          {property.rating && (
            <span className="flex items-center gap-1 bg-amber-400/90 text-white text-xs font-bold px-2 py-1 rounded-xl">
              <Star size={10} fill="white" /> {property.rating}
            </span>
          )}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="p-4">
        {/* Title + verified badge on same line */}
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="font-bold text-[#0D2926] dark:text-gray-100 text-base leading-snug line-clamp-1 flex-1">
            {property.title}
          </h3>
          {property.isVerified && (
            <span className="flex-none flex items-center gap-1 text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-700 whitespace-nowrap">
              <BadgeCheck size={11} /> موثّق
            </span>
          )}
        </div>

        <p className="text-[#4A7B76] dark:text-teal-400 text-xs mb-3 flex items-center gap-1">
          <MapPin size={11} className="text-[#00BFA5] flex-none" />
          {property.city} — {property.neighborhood}
        </p>
        <div className="flex items-center gap-4 text-[#4A7B76] dark:text-gray-400 text-xs border-t border-[#E0F7F4] dark:border-gray-700 pt-2.5">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1.5"><Bed size={13} className="text-[#00BFA5]" />{property.bedrooms} قطعة</span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1.5"><Bath size={13} className="text-[#00BFA5]" />{property.bathrooms}</span>
          )}
          <span className="flex items-center gap-1.5"><Maximize2 size={13} className="text-[#00BFA5]" />تفاصيل {property.area}</span>
        </div>
      </div>
    </div>
  );
}

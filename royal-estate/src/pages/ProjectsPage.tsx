import { useState } from 'react';
import { ChevronRight, MapPin, Building2, ExternalLink } from 'lucide-react';
import { projects, Project, ProjectStatus, statusLabel, statusColor, formatPrice } from '../data/mockData';
import MapPicker from '../components/MapPicker';

type Filter = ProjectStatus | 'all';
const FILTERS: [Filter, string][] = [['all','الكل'],['upcoming','قادم'],['underConstruction','تحت الإنشاء'],['completed','مكتمل']];

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter(p => statusFilter === 'all' || p.status === statusFilter);

  if (selected) {
    return (
      <div className="page-enter pb-28">
        <div className="relative" style={{ height: 260 }}>
          <img src={selected.images[0]} alt={selected.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button onClick={() => setSelected(null)}
            className="absolute top-12 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 right-4">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-white/90 ${statusColor(selected.status)}`}>
              {statusLabel(selected.status)}
            </span>
          </div>
        </div>

        <div className="px-4 mt-4 space-y-4">
          <div>
            <h1 className="font-black text-[#0D2926] text-xl">{selected.title}</h1>
            <p className="text-[#4A7B76] text-sm mt-1 flex items-center gap-1"><Building2 size={13} className="text-[#00BFA5]" /> {selected.developer}</p>
            <p className="text-[#4A7B76] text-sm flex items-center gap-1"><MapPin size={13} className="text-[#00BFA5]" /> {selected.neighborhood}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="card-glass rounded-2xl p-4 text-center">
              <div className="font-black text-[#00897B] text-2xl">{selected.totalUnits}</div>
              <div className="text-[#4A7B76] text-xs">وحدة سكنية</div>
            </div>
            <div className="card-glass rounded-2xl p-4 text-center">
              <div className={`font-black text-base ${statusColor(selected.status)}`}>{statusLabel(selected.status)}</div>
              <div className="text-[#4A7B76] text-xs">الحالة</div>
            </div>
          </div>

          <div className="card-glass rounded-2xl p-4">
            <p className="text-[#4A7B76] text-xs mb-1">نطاق الأسعار</p>
            <p className="font-bold text-[#00897B] text-base">
              {formatPrice(selected.minPrice, selected.currency, 'forSale')} — {formatPrice(selected.maxPrice, selected.currency, 'forSale')}
            </p>
          </div>

          {selected.website && (
            <a href={selected.website} target="_blank" rel="noreferrer"
              className="flex items-center justify-between w-full p-4 card-glass rounded-2xl border-2 border-[#00BFA5]/30">
              <div>
                <p className="font-bold text-[#0D2926] text-sm">صفحة المتجر</p>
                <p className="text-[#4A7B76] text-xs truncate max-w-[200px]">{selected.website}</p>
              </div>
              <div className="flex items-center gap-2 bg-[#00BFA5] text-white px-3 py-2 rounded-xl text-sm font-bold">
                <ExternalLink size={14} /> زيارة
              </div>
            </a>
          )}

          <div className="card-glass rounded-2xl p-4">
            <h3 className="font-bold text-[#0D2926] mb-2">الوصف</h3>
            <p className="text-[#4A7B76] leading-relaxed text-sm">{selected.description}</p>
          </div>

          {selected.lat && selected.lng && (
            <div className="card-glass rounded-2xl p-4">
              <h3 className="font-bold text-[#0D2926] mb-3">موقع المتجر</h3>
              <MapPicker lat={selected.lat} lng={selected.lng} readonly height="200px" />
            </div>
          )}

          <button className="w-full py-4 bg-[#00BFA5] text-white font-bold rounded-2xl shadow-lg">
            طلب معلومات إضافية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter pb-28">
      <div className="hero-gradient hero-curved text-white px-5 pt-12">
           <h1 className="text-2xl font-black mb-4">قصص المتاجر</h1>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {FILTERS.map(([v, label]) => (
            <button key={v} onClick={() => setStatusFilter(v)}
              className={`flex-none px-4 py-2 rounded-full text-sm font-bold transition-all ${
                statusFilter === v ? 'bg-white text-[#00897B]' : 'bg-white/20 text-white'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {filtered.map(p => (
          <div key={p.id} className="card-glass card-glass-hover rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setSelected(p)}>
            <div className="relative h-48">
              <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 right-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/90 ${statusColor(p.status)}`}>
                  {statusLabel(p.status)}
                </span>
              </div>
              {p.website && (
                <a href={p.website} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                  className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 text-[#009688] text-xs font-bold px-2.5 py-1 rounded-full">
                  <ExternalLink size={10} /> الموقع
                </a>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[#0D2926] text-base mb-1">{p.title}</h3>
              <p className="text-[#4A7B76] text-xs flex items-center gap-1 mb-2">
                <Building2 size={11} className="text-[#00BFA5]" /> {p.developer}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#00897B] font-bold text-sm">
                  {new Intl.NumberFormat('ar-SA').format(p.minPrice)} – {new Intl.NumberFormat('ar-SA').format(p.maxPrice)} {p.currency}
                </span>
                <span className="text-[#4A7B76] text-xs">{p.totalUnits} وحدة</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Phone, Mail, MessageCircle, Instagram, Clock, MapPin, ChevronRight } from 'lucide-react';

interface Props { onBack: () => void; }

const CHANNELS = [
  {
    icon: MessageCircle,
    color: '#25D366',
    bg: 'rgba(37,211,102,0.08)',
    label: 'واتساب — الخط الأول',
    value: '+966 50 000 0000',
    action: 'تواصل الآن',
    href: 'https://wa.me/966500000000',
  },
  {
    icon: MessageCircle,
    color: '#25D366',
    bg: 'rgba(37,211,102,0.08)',
    label: 'واتساب — الخط الثاني',
    value: '+966 55 000 0000',
    action: 'تواصل الآن',
    href: 'https://wa.me/966550000000',
  },
  {
    icon: Mail,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    label: 'البريد الإلكتروني',
    value: 'info@safsaf.sa',
    action: 'إرسال',
    href: 'mailto:info@safsaf.sa',
  },
  {
    icon: Instagram,
    color: '#e1306c',
    bg: 'rgba(225,48,108,0.08)',
    label: 'إنستغرام',
    value: '@safsaf.sa',
    action: 'متابعة',
    href: 'https://instagram.com',
  },
  {
    icon: Phone,
    color: '#00BFA5',
    bg: 'rgba(0,191,165,0.08)',
    label: 'هاتف مباشر',
    value: '+966 11 000 0000',
    action: 'اتصال',
    href: 'tel:+96611000000',
  },
];

const HOURS = [
  { day: 'الأحد — الخميس', time: '9:00 ص – 6:00 م' },
  { day: 'الجمعة',           time: 'مغلق' },
  { day: 'السبت',            time: '10:00 ص – 4:00 م' },
];

export default function ContactPage({ onBack }: Props) {
  return (
    <div className="page-enter min-h-screen pb-28">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="hero-gradient text-white px-5 pt-16 pb-14 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

        <button onClick={onBack} className="flex items-center gap-1.5 text-white/80 mb-6 text-sm font-semibold w-fit">
          <ChevronRight size={18} /> رجوع
        </button>

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-white/20 border border-white/25 flex items-center justify-center flex-none">
            <Phone size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black">تواصل معنا</h1>
            <p className="text-white/70 text-sm mt-1">نحن هنا لمساعدتك دائماً</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-5 space-y-3">

        {/* ── Channels ─────────────────────────────────── */}
        {CHANNELS.map(({ icon: Icon, color, bg, label, value, action, href }) => (
          <div key={label} className="card-glass rounded-3xl p-4 shadow-sm flex items-center gap-3">
            <a
              href={href}
              target="_blank" rel="noopener noreferrer"
              className="flex-none px-3 py-2 rounded-xl text-white text-xs font-bold transition-all hover:opacity-90 active:scale-95"
              style={{ background: color }}
            >
              {action}
            </a>
            <div className="flex-1 text-right">
              <p className="text-[#0D2926] font-bold text-sm">{label}</p>
              <p className="text-[#4A7B76] text-xs mt-0.5">{value}</p>
            </div>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-none" style={{ background: bg }}>
              <Icon size={19} style={{ color }} />
            </div>
          </div>
        ))}

        {/* ── Office hours ─────────────────────────────── */}
        <div className="card-glass rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E0F7F4] flex items-center justify-center flex-none">
              <Clock size={19} className="text-[#00897B]" />
            </div>
            <h2 className="font-black text-[#0D2926] text-base">أوقات العمل</h2>
          </div>
          <div className="h-px bg-[#E0F7F4] mb-3" />
          <div className="space-y-2">
            {HOURS.map(h => (
              <div key={h.day} className="flex justify-between items-center">
                <span className={`text-sm font-semibold ${h.time === 'مغلق' ? 'text-red-400' : 'text-[#4A7B76]'}`}>
                  {h.time}
                </span>
                <span className="text-[#0D2926] font-bold text-sm">{h.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Location ────────────────────────────────── */}
        <div className="card-glass rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E0F7F4] flex items-center justify-center flex-none">
              <MapPin size={19} className="text-[#00897B]" />
            </div>
            <div className="text-right">
              <p className="font-black text-[#0D2926] text-sm">المقر الرئيسي</p>
              <p className="text-[#4A7B76] text-xs mt-0.5">الرياض، حي العليا — المملكة العربية السعودية</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

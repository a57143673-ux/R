import { Star, Award, Users, ShieldCheck, Zap, HeartHandshake, ChevronRight } from 'lucide-react';

interface Props { onBack: () => void; }

const FEATURES = [
   { icon: Star,          color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',    title: 'آلاف المنتجات المتنوعة',     body: 'تشكيلة واسعة تضم منتجات يومية ومميزة تُحدَّث باستمرار من المتاجر في جميع المناطق.' },
   { icon: ShieldCheck,   color: '#10b981', bg: 'rgba(16,185,129,0.08)',    title: 'موثوقية وشفافية تامة',       body: 'كل متجر ومنتج موثوق. نعرض الأسعار والتفاصيل بوضوح لتتسوق وأنت مطمئن.' },
   { icon: Zap,           color: '#00BFA5', bg: 'rgba(0,191,165,0.08)',     title: 'تجربة اكتشاف سريعة وذكية',   body: 'فلاتر متقدمة وبحث فوري يوصّلك إلى ما يناسبك في ثوانٍ، بدون تعقيد أو ضياع وقت.' },
   { icon: HeartHandshake,color: '#6366f1', bg: 'rgba(99,102,241,0.08)',    title: 'تواصل مباشر مع المتاجر',    body: 'تواصل فوري عبر الدردشة وواتساب مع أصحاب المتاجر، بدون وسيط أو رسوم خفية.' },
  { icon: Award,         color: '#f43f5e', bg: 'rgba(244,63,94,0.08)',     title: '5 سنوات خبرة موثوقة',      body: 'منذ 2019 ونحن نخدم آلاف العملاء في المملكة بأعلى معايير الجودة والاحترافية.' },
  { icon: Users,         color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)',    title: 'فريق متخصص على مدار الساعة', body: 'فريق دعم محترف يرد على استفساراتك في أي وقت ويساعدك على اتخاذ القرار الصحيح.' },
];

const STATS = [
  { value: '5,000+', label: 'عميل سعيد' },
   { value: '200+',   label: 'منتج مُدرج' },
   { value: '50+',    label: 'قصة يومية' },
   { value: '20+',    label: 'متجر شريك' },
];

export default function WhyUsPage({ onBack }: Props) {
  return (
    <div className="page-enter min-h-screen pb-28">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="hero-gradient text-white px-5 pt-16 pb-16 relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-8 -right-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

        <button onClick={onBack} className="flex items-center gap-1.5 text-white/80 mb-6 text-sm font-semibold w-fit">
          <ChevronRight size={18} /> رجوع
        </button>

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-white/20 border border-white/25 flex items-center justify-center mb-4">
            <Award size={28} />
          </div>
           <h1 className="text-2xl font-black mb-1">لماذا صفصاف للتجارة الإلكترونية؟</h1>
          <p className="text-white/75 text-sm leading-relaxed">
             نحن لسنا مجرد متجر —<br />نحن شريكك الموثوق في رحلة اكتشاف منتجاتك المفضلة
          </p>
        </div>
      </div>

      {/* ── Stats row ────────────────────────────────────── */}
      <div className="px-4 -mt-6 mb-5">
        <div className="card-glass rounded-3xl p-4 grid grid-cols-4 gap-2 shadow-xl">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-[#00897B] font-black text-lg leading-tight">{s.value}</div>
              <div className="text-[#4A7B76] text-[10px] leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ─────────────────────────────────────── */}
      <div className="px-4 space-y-3">
        {FEATURES.map(({ icon: Icon, color, bg, title, body }) => (
          <div key={title} className="card-glass rounded-3xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="font-black text-[#0D2926] text-base mb-2">{title}</h3>
                <p className="text-[#4A7B76] text-sm leading-6">{body}</p>
              </div>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-none mt-0.5" style={{ background: bg }}>
                <Icon size={22} style={{ color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className="px-4 mt-5">
        <div className="rounded-3xl p-6 text-center" style={{ background: 'linear-gradient(135deg,#00897B,#00BFA5)' }}>
          <p className="text-white font-black text-lg mb-1">انضم لآلاف العملاء الراضين</p>
           <p className="text-white/80 text-sm">ابدأ رحلة التسوق والاكتشاف اليوم بثقة</p>
        </div>
      </div>
    </div>
  );
}

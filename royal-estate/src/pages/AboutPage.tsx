import { ChevronRight, Building2, Target, Users, Star, Globe, Award } from 'lucide-react';

interface Props { onBack: () => void; }

const TEAM = [
  { name: 'محمد العتيبي', role: 'المؤسس والرئيس التنفيذي', emoji: '👔' },
  { name: 'سارة الغامدي',  role: 'مديرة التسويق',             emoji: '🎯' },
  { name: 'أحمد الزهراني', role: 'مطور التطبيق',              emoji: '💻' },
];

const STATS = [
   { value: '+2000', label: 'منتج متاح' },
   { value: '+500',  label: 'طلب ناجح' },
   { value: '+150',  label: 'متجر موثوق' },
  { value: '4.9★',  label: 'تقييم المستخدمين' },
];

export default function AboutPage({ onBack }: Props) {
  return (
    <div className="min-h-screen page-enter">
      {/* Hero */}
      <div className="hero-gradient relative overflow-hidden px-5 pt-14 pb-24">
        <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

        <button onClick={onBack} className="flex items-center gap-1.5 text-white/80 mb-8 text-sm font-semibold relative z-10">
          <ChevronRight size={18} /> رجوع
        </button>

        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-white/15 border-2 border-white/25 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Building2 size={36} className="text-white" />
          </div>
           <h1 className="text-3xl font-black text-white">عن صفصاف للتجارة الإلكترونية</h1>
           <p className="text-white/70 mt-2 text-sm">منصتك لاكتشاف المنتجات والمتاجر في المملكة العربية السعودية</p>
        </div>
      </div>

      <div className="px-4 -mt-10 relative z-10 pb-28 space-y-4">

        {/* Stats */}
        <div className="card-glass rounded-3xl p-5 shadow-xl">
          <div className="grid grid-cols-4 gap-2">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-[#00897B] font-black text-lg leading-tight">{value}</p>
                <p className="text-[#4A7B76] text-[10px] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="card-glass rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-[#E0F7F4] rounded-xl flex items-center justify-center">
              <Target size={17} className="text-[#00897B]" />
            </div>
            <h2 className="text-[#0D2926] font-black text-base">قصتنا</h2>
          </div>
          <p className="text-[#4A7B76] text-sm leading-relaxed">
             انطلقنا في عام 2020 برؤية واضحة: تبسيط تجربة اكتشاف المنتجات والمتاجر في المملكة.
             نؤمن أن كل شخص يستحق تجربة تسوق سهلة، وأن التقنية هي الجسر الذي يوصله إلى ما يناسبه.
             اليوم، نفخر بخدمة آلاف العملاء والمتاجر عبر المملكة بثقة واحترافية.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-2 gap-3">
          {[
             { icon: Target, title: 'رسالتنا', text: 'تسهيل الوصول إلى أفضل المنتجات والمتاجر بشفافية تامة', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
             { icon: Globe,  title: 'رؤيتنا',  text: 'أن نكون منصة التسوق والاكتشاف الأكثر ثقة في المنطقة', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
          ].map(({ icon: Icon, title, text, color, bg }) => (
            <div key={title} className="card-glass rounded-2xl p-4 shadow-lg">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: bg }}>
                <Icon size={17} style={{ color }} />
              </div>
              <p className="text-[#0D2926] font-black text-sm mb-1">{title}</p>
              <p className="text-[#4A7B76] text-xs leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="card-glass rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-[#E0F7F4] rounded-xl flex items-center justify-center">
              <Award size={17} className="text-[#00897B]" />
            </div>
            <h2 className="text-[#0D2926] font-black text-base">قيمنا</h2>
          </div>
          <div className="space-y-3">
            {[
               { emoji: '🤝', title: 'الثقة والشفافية', desc: 'نضمن معلومات دقيقة وموثوقة لكل منتج ومتجر' },
              { emoji: '⚡', title: 'السرعة والكفاءة', desc: 'نوفر تجربة بحث سلسة وسريعة' },
               { emoji: '💎', title: 'الجودة أولاً',   desc: 'نختار المنتجات والمتاجر بعناية وفق معايير واضحة' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-3 bg-[#F0FEFA] rounded-2xl">
                <span className="text-xl">{emoji}</span>
                <div>
                  <p className="text-[#0D2926] font-bold text-sm">{title}</p>
                  <p className="text-[#4A7B76] text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="card-glass rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-[#E0F7F4] rounded-xl flex items-center justify-center">
              <Users size={17} className="text-[#00897B]" />
            </div>
            <h2 className="text-[#0D2926] font-black text-base">فريقنا</h2>
          </div>
          <div className="space-y-3">
            {TEAM.map(({ name, role, emoji }) => (
              <div key={name} className="flex items-center gap-3 p-3 bg-[#F0FEFA] rounded-2xl">
                <span className="text-2xl w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">{emoji}</span>
                <div>
                  <p className="text-[#0D2926] font-bold text-sm">{name}</p>
                  <p className="text-[#4A7B76] text-xs">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-4">
          <div className="flex justify-center mb-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
          </div>
           <p className="text-[#4A7B76] text-xs">صفصاف للتجارة الإلكترونية — نبني الثقة منتجاً تلو الآخر</p>
        </div>
      </div>
    </div>
  );
}

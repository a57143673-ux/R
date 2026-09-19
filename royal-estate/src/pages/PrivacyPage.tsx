import { Shield, Lock, Eye, UserCheck, Mail, ChevronRight } from 'lucide-react';

interface Props { onBack: () => void; }

const SECTIONS = [
  {
    icon: Eye,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    title: 'جمع البيانات',
    body: `نجمع فقط المعلومات الضرورية لتقديم خدماتنا:\n• البريد الإلكتروني عند التسجيل\n• تفضيلات البحث والتسوق\n• بيانات الجهاز لتحسين الأداء\n\nلا نجمع أي معلومات شخصية حساسة دون موافقتك الصريحة.`,
  },
  {
    icon: Lock,
    color: '#00BFA5',
    bg: 'rgba(0,191,165,0.08)',
    title: 'حماية البيانات',
    body: `نلتزم بأعلى معايير الأمان:\n• تشفير كامل (SSL/TLS 256-bit)\n• تخزين آمن في خوادم معتمدة\n• لا نشارك بياناتك مع أي طرف ثالث\n• حق الحذف الكامل في أي وقت`,
  },
  {
    icon: Shield,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    title: 'استخدام البيانات',
    body: `نستخدم بياناتك من أجل:\n• تقديم خدمات البحث المخصصة\n• تحسين تجربة المستخدم\n• إرسال إشعارات بالعروض الجديدة (بموافقتك)\n• التواصل لأغراض الدعم الفني فقط`,
  },
  {
    icon: UserCheck,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    title: 'حقوقك',
    body: `يحق لك في أي وقت:\n• الاطلاع على بياناتك الشخصية\n• تعديل معلوماتك أو حذفها\n• طلب حذف حسابك نهائياً\n• إلغاء الاشتراك في الإشعارات\n• التواصل بشأن أي مخاوف`,
  },
];

export default function PrivacyPage({ onBack }: Props) {
  return (
    <div className="page-enter min-h-screen pb-28">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="hero-gradient text-white px-5 pt-16 pb-14 relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-16 -right-12 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />

        <button onClick={onBack} className="flex items-center gap-1.5 text-white/80 mb-6 text-sm font-semibold w-fit">
          <ChevronRight size={18} /> رجوع
        </button>

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-white/20 border border-white/25 flex items-center justify-center flex-none">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black">سياسة الخصوصية</h1>
            <p className="text-white/70 text-sm mt-1">نحمي خصوصيتك دائماً</p>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="px-4 -mt-5 space-y-4">
        {SECTIONS.map(({ icon: Icon, color, bg, title, body }) => (
          <div key={title} className="card-glass rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-none" style={{ background: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <h2 className="font-black text-[#0D2926] text-base">{title}</h2>
            </div>
            <div className="h-px bg-[#E0F7F4] mb-3" />
            <p className="text-[#4A7B76] text-sm leading-7 whitespace-pre-line">{body}</p>
          </div>
        ))}

        {/* Contact for privacy */}
        <div className="card-glass rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <Mail size={20} className="text-indigo-500" />
            </div>
            <h2 className="font-black text-[#0D2926] text-base">التواصل بخصوص الخصوصية</h2>
          </div>
          <div className="h-px bg-[#E0F7F4] mb-3" />
          <p className="text-[#4A7B76] text-sm leading-7">
            لأي استفسار حول سياسة الخصوصية، تواصل معنا:<br />
            <span className="text-[#00BFA5] font-bold">privacy@safsaf.sa</span><br />
            نلتزم بالرد خلال 48 ساعة عمل.
          </p>
        </div>

        <p className="text-center text-[#90AFAC] text-xs pb-4">آخر تحديث: يناير 2025</p>
      </div>
    </div>
  );
}

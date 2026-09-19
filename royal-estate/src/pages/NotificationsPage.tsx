import { useState, useEffect, useRef } from 'react';
import { Bell, Trash2, CheckCheck, X, Home, Megaphone, Star, Settings, ChevronRight, Send, Phone, MoreHorizontal, Search, Image as ImageIcon, Mic, Smile, Pin, Reply, Ban, Flag, User, AlertTriangle } from 'lucide-react';

interface Notif {
  id: string;
  title: string;
  body: string;
  type: 'property' | 'ad' | 'welcome' | 'admin' | 'general';
  createdAt: string;
  isRead: boolean;
}

function ChatInbox({ chats, onSelect }: { chats: ChatSummary[]; onSelect: (chat: ChatSummary) => void }) {
  return (
    <div className="card-glass overflow-hidden rounded-2xl divide-y divide-gray-100 dark:divide-gray-800">
      {chats.map(chat => (
        <button
          key={chat.id}
          onClick={() => onSelect(chat)}
          className="w-full flex items-center gap-3 px-4 py-4 text-right hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors"
        >
          <div className="relative w-12 h-12 rounded-full flex items-center justify-center text-white font-black flex-none" style={{ backgroundColor: chat.accent }}>
            {chat.initials}
            {chat.online && <span className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-gray-900" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-gray-400 dark:text-gray-500 text-[10px] whitespace-nowrap">{chat.time}</span>
              <p className="text-gray-900 dark:text-gray-100 font-bold text-sm truncate">{chat.name}</p>
            </div>
            <div className="flex items-center justify-between gap-2 mt-1">
              {chat.unread > 0 && <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#00BFA5] text-white text-[10px] font-black flex items-center justify-center">{chat.unread}</span>}
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{chat.lastMessage}</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 rotate-180 flex-none" />
        </button>
      ))}
    </div>
  );
}

function ChatRoom({ chat, onBack }: { chat: ChatSummary; onBack: () => void }) {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, body: 'مرحباً، كيف يمكننا مساعدتك؟', mine: false, time: '10:42' },
    { id: 2, body: 'أرغب بمعرفة توفر المنتج ووقت التوصيل.', mine: true, time: '10:43' },
    { id: 3, body: chat.lastMessage, mine: false, time: '10:44' },
  ]);
  const [openMessage, setOpenMessage] = useState<number | null>(null);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [confirmationAction, setConfirmationAction] = useState<'block' | 'report' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setMessages(current => [...current, { id: Date.now(), body: draft.trim(), mine: true, time: 'الآن', replyTo: replyingTo?.body }]);
    setDraft('');
    setReplyingTo(null);
  };

  const sendAudio = () => {
    setMessages(current => [...current, { id: Date.now(), body: 'بصمة صوتية · 0:08', mine: true, time: 'الآن', kind: 'audio' }]);
  };

  const sendTemplate = (text: string) => {
    setMessages(current => [...current, { id: Date.now(), body: text, mine: true, time: 'الآن' }]);
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessages(current => [...current, { id: Date.now(), body: URL.createObjectURL(file), mine: true, time: 'الآن', kind: 'image' }]);
    event.target.value = '';
  };

  const togglePin = (id: number) => {
    setMessages(current => current.map(message => message.id === id ? { ...message, pinned: !message.pinned } : message));
    setOpenMessage(null);
  };

  const deleteMessage = (id: number) => {
    setMessages(current => current.filter(message => message.id !== id));
    setOpenMessage(null);
  };

  return (
    <div className="page-enter min-h-screen pb-32 dark:bg-gray-900">
      <header className="relative sticky top-14 z-10 flex items-center gap-3 px-4 py-2.5 bg-white/95 dark:bg-[#111E25]/95 backdrop-blur border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} aria-label="العودة إلى المحادثات" className="p-1 text-gray-500 dark:text-gray-300">
          <ChevronRight size={21} />
        </button>
        <div className="relative w-10 h-10 rounded-full flex items-center justify-center text-white font-black" style={{ backgroundColor: chat.accent }}>
          {chat.initials}
          {chat.online && <span className="absolute bottom-0 left-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#111E25]" />}
        </div>
        <div className="flex-1 min-w-0 text-right">
          <p className="text-gray-900 dark:text-white font-bold text-sm truncate">{chat.name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-[11px]">{chat.online ? 'متصل الآن' : 'آخر ظهور مؤخراً'}</p>
        </div>
        <button aria-label="اتصال" className="p-2 text-gray-500 dark:text-gray-300"><Phone size={18} /></button>
        <button onClick={() => setShowAccountMenu(value => !value)} aria-label="خيارات الحساب" className="p-2 text-gray-500 dark:text-gray-300"><MoreHorizontal size={19} /></button>
        <div className={`absolute left-3 top-12 w-52 origin-top-left rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-700 p-1.5 z-20 transition-all duration-200 ease-out ${showAccountMenu ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'}`}>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-right text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/70 rounded-xl transition-colors"><User size={15} className="text-gray-400" /> معلومات الحساب</button>
            <button onClick={() => { setShowAccountMenu(false); setConfirmationAction('block'); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-right text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"><Ban size={15} /> حظر الحساب</button>
            <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
            <button onClick={() => { setShowAccountMenu(false); setConfirmationAction('report'); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/70 rounded-xl transition-colors"><Flag size={15} className="text-gray-400" /> الإبلاغ عن الحساب</button>
          </div>
      </header>

      <main className="px-4 py-4 space-y-2.5">
        <p className="text-center text-gray-400 text-[10px]">اليوم</p>
        {messages.map(message => (
          <div key={message.id} className={`group relative flex ${message.mine ? 'justify-start' : 'justify-end'} items-end gap-1.5`}>
            <div className={`relative max-w-[82%] px-4 py-2.5 rounded-2xl ${message.mine ? 'bg-[#00BFA5] text-white rounded-br-md' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-md shadow-sm'} ${message.pinned ? 'ring-2 ring-amber-300' : ''}`}>
              {message.replyTo && <p className="border-r-2 border-white/50 pr-2 mb-2 text-[11px] opacity-75 truncate">رداً على: {message.replyTo}</p>}
              {message.kind === 'image' ? <img src={message.body} alt="صورة مرفقة" className="max-w-full rounded-xl" /> : message.kind === 'audio' ? <div className="flex items-center gap-2 text-sm"><Mic size={16} /> {message.body}</div> : <p className="text-sm leading-6">{message.body}</p>}
              <div className="flex items-center justify-between gap-3 mt-1">
                {message.pinned && <Pin size={11} className={message.mine ? 'text-white/70' : 'text-amber-500'} />}
                <p className={`text-[10px] ${message.mine ? 'text-white/70' : 'text-gray-400'}`}>{message.time}</p>
              </div>
            </div>
            <button onClick={() => setOpenMessage(openMessage === message.id ? null : message.id)} aria-label="إجراءات الرسالة" className="p-1 text-gray-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"><MoreHorizontal size={15} /></button>
            {openMessage === message.id && (
              <div className={`absolute mt-8 ${message.mine ? 'left-8' : 'right-8'} z-10 flex items-center gap-1 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 p-1`}>
                <button onClick={() => setReplyingTo(message)} title="رد" className="p-2 text-gray-500 hover:text-[#00BFA5]"><Reply size={14} /></button>
                <button onClick={() => togglePin(message.id)} title="تثبيت" className="p-2 text-gray-500 hover:text-amber-500"><Pin size={14} /></button>
                {message.mine && <button onClick={() => deleteMessage(message.id)} title="حذف" className="p-2 text-red-500"><Trash2 size={14} /></button>}
              </div>
            )}
          </div>
        ))}
      </main>

      <form onSubmit={sendMessage} className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] max-w-lg px-3 py-2 rounded-2xl bg-white/90 dark:bg-[#111E25]/90 backdrop-blur border border-gray-100 dark:border-gray-800 shadow-lg z-30">
        {replyingTo && <div className="flex items-center justify-between px-2 pb-2 text-[11px] text-gray-500 dark:text-gray-400"><span className="truncate">رداً على: {replyingTo.body}</span><button type="button" onClick={() => setReplyingTo(null)}><X size={14} /></button></div>}
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={() => fileInputRef.current?.click()} aria-label="إرفاق صورة" className="p-2 text-gray-400 hover:text-[#00BFA5]"><ImageIcon size={18} /></button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          <button type="button" onClick={() => sendTemplate('مرحباً، سأعود إليك بالتفاصيل قريباً.')} aria-label="قوالب سريعة" className="p-2 text-gray-400 hover:text-[#00BFA5]"><Smile size={18} /></button>
        <input value={draft} onChange={event => setDraft(event.target.value)} placeholder="اكتب رسالة..." className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2.5 outline-none text-sm text-gray-900 dark:text-white placeholder:text-gray-400" />
          {draft.trim() ? <button type="submit" aria-label="إرسال الرسالة" className="w-10 h-10 rounded-xl bg-[#00BFA5] text-white flex items-center justify-center"><Send size={17} /></button> : <button type="button" onClick={sendAudio} aria-label="تسجيل بصمة صوتية" className="p-2 text-gray-400 hover:text-[#00BFA5]"><Mic size={18} /></button>}
        </div>
      </form>

      <div
        role="presentation"
        onClick={() => setConfirmationAction(null)}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${confirmationAction ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-confirmation-title"
          onClick={event => event.stopPropagation()}
          className={`w-full max-w-sm rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-2xl text-center transform transition-transform duration-300 ${confirmationAction ? 'scale-100' : 'scale-95'}`}
        >
          <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${confirmationAction === 'block' ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'}`}>
            <AlertTriangle size={23} strokeWidth={1.7} />
          </div>
          <h3 id="chat-confirmation-title" className="text-base font-bold text-gray-900 dark:text-white mt-4">
            {confirmationAction === 'block' ? 'هل تريد حظر هذا الحساب؟' : 'هل تريد الإبلاغ عن هذا الحساب؟'}
          </h3>
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400 mt-2">
            {confirmationAction === 'block' ? 'لن يتمكن الحساب من إرسال رسائل إليك بعد الآن.' : 'سيتم إرسال المحادثة إلى فريق الدعم للمراجعة.'}
          </p>
          <div className="flex gap-2 mt-5">
            <button onClick={() => setConfirmationAction(null)} className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">إلغاء</button>
            <button onClick={() => setConfirmationAction(null)} className={`flex-1 py-2.5 rounded-xl text-white text-xs font-medium shadow-lg transition-colors ${confirmationAction === 'block' ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/20' : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'}`}>
              {confirmationAction === 'block' ? 'تأكيد الحظر' : 'إرسال البلاغ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  onBack: () => void;
  view?: 'chat' | 'notifications';
}

interface ChatSummary {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  accent: string;
}

type ChatMessage = {
  id: number;
  body: string;
  mine: boolean;
  time: string;
  kind?: 'text' | 'image' | 'audio';
  pinned?: boolean;
  replyTo?: string;
};

const CHATS: ChatSummary[] = [
  { id: 'elite', name: 'متجر النخبة', initials: 'ن', lastMessage: 'مرحباً، المنتج متوفر الآن ويمكن توصيله اليوم.', time: 'منذ 5 د', unread: 2, online: true, accent: '#00BFA5' },
  { id: 'tech', name: 'عالم التقنية', initials: 'ت', lastMessage: 'أرسلنا لك تفاصيل العرض الجديد.', time: 'منذ ساعة', unread: 0, online: true, accent: '#3B82F6' },
  { id: 'home', name: 'بيتك أجمل', initials: 'ب', lastMessage: 'شكراً لتواصلك معنا.', time: 'أمس', unread: 0, online: false, accent: '#F59E0B' },
];

const STORAGE_KEY = 'safsaf_notifications_v2';

const TYPE_META: Record<Notif['type'], { icon: typeof Bell; color: string; bg: string; emoji: string }> = {
  property: { icon: Home,      color: '#00BFA5', bg: 'rgba(0,191,165,0.1)',    emoji: '🏡' },
  ad:       { icon: Megaphone, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',   emoji: '📢' },
  welcome:  { icon: Star,      color: '#6366f1', bg: 'rgba(99,102,241,0.1)',   emoji: '👋' },
  admin:    { icon: Settings,  color: '#f43f5e', bg: 'rgba(244,63,94,0.1)',    emoji: '⚙️' },
  general:  { icon: Bell,      color: '#00897B', bg: 'rgba(0,137,123,0.1)',    emoji: '🔔' },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'الآن';
  if (m < 60) return `منذ ${m} دقيقة`;
  const h = Math.floor(m / 60);
  if (h < 24) return `منذ ${h} ساعة`;
  const d = Math.floor(h / 24);
  if (d < 7)  return `منذ ${d} يوم`;
  return `منذ ${Math.floor(d / 7)} أسبوع`;
}

function loadNotifs(): Notif[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function saveNotifs(list: Notif[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ── Exported helper so other components can push notifications ──
export function pushNotif(n: Omit<Notif, 'id' | 'createdAt' | 'isRead'>) {
  const list = loadNotifs();
  list.unshift({ ...n, id: `${Date.now()}`, createdAt: new Date().toISOString(), isRead: false });
  if (list.length > 50) list.pop();
  saveNotifs(list);
}

export function unreadCount(): number {
  return loadNotifs().filter(n => !n.isRead).length;
}

export default function NotificationsPage({ onBack, view = 'notifications' }: Props) {
  const [list, setList] = useState<Notif[]>([]);
  const [section, setSection] = useState<'chats' | 'notifications'>(view === 'chat' ? 'chats' : 'notifications');
  const [selectedChat, setSelectedChat] = useState<ChatSummary | null>(null);
  const [chatSearch, setChatSearch] = useState('');

  useEffect(() => {
    const data = loadNotifs();
    // seed demo notifications if empty
    if (data.length === 0) {
      const demos: Notif[] = [
         { id: '1', title: '🛍️ منتج جديد', body: 'سماعات لاسلكية عصرية — توصيل سريع وعرض خاص', type: 'property', createdAt: new Date(Date.now() - 5 * 60000).toISOString(), isRead: false },
         { id: '2', title: '📢 عرض خاص', body: 'خصم 15% على منتجات متجر النخبة حتى نهاية الأسبوع', type: 'ad', createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), isRead: false },
         { id: '3', title: '👋 مرحباً بك!', body: 'أهلاً بك في صفصاف للتجارة الإلكترونية — اكتشف منتجاتك المفضلة الآن', type: 'welcome', createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), isRead: true },
         { id: '4', title: '🛍️ سعر مخفّض', body: 'حقيبة جلدية مميزة — تخفيض السعر لفترة محدودة', type: 'property', createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), isRead: true },
      ];
      saveNotifs(demos);
      setList(demos);
    } else {
      setList(data);
    }
  }, []);

  const unread = list.filter(n => !n.isRead).length;

  const markAllRead = () => {
    const updated = list.map(n => ({ ...n, isRead: true }));
    setList(updated); saveNotifs(updated);
  };

  const remove = (id: string) => {
    const updated = list.filter(n => n.id !== id);
    setList(updated); saveNotifs(updated);
  };

  const markRead = (id: string) => {
    const updated = list.map(n => n.id === id ? { ...n, isRead: true } : n);
    setList(updated); saveNotifs(updated);
  };

  const clearAll = () => {
    setList([]); saveNotifs([]);
  };

  if (selectedChat) {
    return <ChatRoom chat={selectedChat} onBack={() => setSelectedChat(null)} />;
  }

  return (
    <div className="page-enter min-h-screen pb-28">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="hero-gradient text-white px-5 pt-4 pb-4 relative overflow-hidden">
        <button onClick={onBack} className="flex items-center gap-1.5 text-white/80 mb-3 text-sm font-semibold w-fit">
          <ChevronRight size={18} /> رجوع
        </button>

        <div className="relative z-10 text-right">
          <h1 className="text-2xl font-black">{view === 'chat' ? 'المحادثات' : 'الإشعارات'}</h1>
          <p className="text-white/75 text-sm">{view === 'chat' ? 'تواصل مع المتاجر والمتابعين' : unread > 0 ? `${unread} تحديث غير مقروء` : 'كل الإشعارات مقروءة'}</p>
        </div>

        {view === undefined && <div className="relative z-10 flex gap-1 mt-4 p-1 rounded-xl bg-black/10">
          <button onClick={() => setSection('chats')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${section === 'chats' ? 'bg-white text-[#00897B]' : 'text-white/80'}`}>المحادثات</button>
          <button onClick={() => setSection('notifications')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${section === 'notifications' ? 'bg-white text-[#00897B]' : 'text-white/80'}`}>الإشعارات {unread > 0 && <span className="mr-1">({unread})</span>}</button>
        </div>}

        {/* ── Actions toolbar ── */}
        {section === 'notifications' && <div className="relative z-10 flex items-center justify-between gap-2 mt-3 pt-3 border-t border-white/20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-white/15 text-white text-[11px] font-bold">
              {list.length} تحديث
            </span>
            {unread > 0 && (
              <span className="px-2.5 py-1 rounded-lg bg-red-400/25 text-red-50 text-[11px] font-bold">
                {unread} جديد
              </span>
            )}
          </div>
          {list.length > 0 && (
            <div className="flex items-center gap-2">
              {unread > 0 && (
                <button onClick={markAllRead} className="px-2.5 py-1.5 rounded-lg bg-white/15 text-white text-[11px] font-bold flex items-center gap-1.5 hover:bg-white/25">
                  <CheckCheck size={12} /> قراءة الكل
                </button>
              )}
              <button onClick={clearAll} className="px-2.5 py-1.5 rounded-lg bg-white/15 text-white text-[11px] font-bold flex items-center gap-1.5 hover:bg-white/25">
                <Trash2 size={12} /> مسح الكل
              </button>
            </div>
          )}
        </div>}
      </div>

      {/* ── List ─────────────────────────────────────────── */}
      <div className="px-4 -mt-5 space-y-3">
        {section === 'chats' ? (
          <>
            <div className="card-glass flex items-center gap-2 rounded-xl px-3 py-2.5">
              <Search size={16} className="text-gray-400" />
              <input value={chatSearch} onChange={event => setChatSearch(event.target.value)} placeholder="ابحث في المحادثات..." className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder:text-gray-400" />
              {chatSearch && <button onClick={() => setChatSearch('')} aria-label="مسح البحث"><X size={14} className="text-gray-400" /></button>}
            </div>
            <ChatInbox chats={CHATS.filter(chat => chat.name.includes(chatSearch) || chat.lastMessage.includes(chatSearch))} onSelect={setSelectedChat} />
          </>
        ) : list.length === 0 ? (
          <div className="card-glass rounded-3xl p-12 text-center shadow-sm mt-4">
            <Bell size={52} className="text-[#B2DFDB] mx-auto mb-4" />
            <p className="text-[#0D2926] font-black text-base mb-1">لا توجد إشعارات</p>
             <p className="text-[#90AFAC] text-sm">ستظهر هنا رسائل المتاجر والعروض الجديدة</p>
          </div>
        ) : (
          list.map(n => {
            const meta = TYPE_META[n.type];
            const Icon = meta.icon;
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`card-glass rounded-3xl p-4 shadow-sm cursor-pointer transition-all active:scale-[0.98]
                  ${!n.isRead ? 'border-l-2' : 'opacity-90'}`}
                style={!n.isRead ? { borderLeftColor: meta.color } : {}}
              >
                <div className="flex items-start gap-3">
                  {/* Icon: right side in RTL */}
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-none" style={{ background: meta.bg }}>
                    <Icon size={19} style={{ color: meta.color }} />
                  </div>

                  {/* Content: title and description stay together */}
                  <div className="flex-1 text-right">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      {!n.isRead && <span className="w-2 h-2 rounded-full flex-none" style={{ background: meta.color }} />}
                      <p className={`text-sm leading-snug ${n.isRead ? 'font-semibold text-[#4A7B76]' : 'font-black text-[#0D2926]'}`}>
                        {n.title}
                      </p>
                    </div>
                    <p className="text-[#263B38] dark:text-gray-200 text-xs leading-5">{n.body}</p>
                    <div className="flex items-center justify-end mt-2">
                      <div className="px-2 py-0.5 rounded-lg text-[10px] font-bold" style={{ background: meta.bg, color: meta.color }}>
                        {meta.emoji}
                      </div>
                    </div>
                  </div>

                  {/* Time and delete: left side in RTL */}
                  <div className="flex flex-col items-center gap-2 flex-none">
                    <span className="text-[#536B66] dark:text-gray-400 text-[10px] whitespace-nowrap">{timeAgo(n.createdAt)}</span>
                    <button
                      onClick={e => { e.stopPropagation(); remove(n.id); }}
                      aria-label="حذف الإشعار"
                      className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                      <X size={13} className="text-red-500 dark:text-red-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

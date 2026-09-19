import { useState } from 'react';
import { Mail, Lock, User, LogIn, Eye, EyeOff, ChevronRight, Chrome, AlertCircle } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

interface Props {
  onLogin: (name: string, isAdmin: boolean) => void;
  onBack: () => void;
}

type Mode = 'login' | 'register';

export default function LoginPage({ onLogin, onBack }: Props) {
  const [mode, setMode]         = useState<Mode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const reset = () => { setError(''); setUsername(''); setEmail(''); setPassword(''); setConfirm(''); };

  /* ── Google OAuth ─────────────────────────────────────── */
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        // Fetch user info from Google
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const info = await res.json();
        const displayName = info.given_name || info.name || info.email?.split('@')[0] || 'مستخدم';
        onLogin(displayName, false);
      } catch {
        setError('فشل تسجيل الدخول بـ Google — حاول مرة أخرى');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('تعذّر الاتصال بـ Google — تأكد من الاتصال بالإنترنت');
    },
  });

  /* ── Email/password submit ────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email.trim() || !password)   { setError('يرجى إدخال البريد الإلكتروني وكلمة المرور'); return; }
      if (!email.includes('@'))         { setError('البريد الإلكتروني غير صحيح'); return; }
      if (password.length < 6)          { setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل'); return; }
    } else {
      if (!username.trim())             { setError('يرجى إدخال اسم المستخدم'); return; }
      if (!email.includes('@'))         { setError('البريد الإلكتروني غير صحيح'); return; }
      if (password.length < 6)          { setError('كلمة المرور 6 أحرف على الأقل'); return; }
      if (password !== confirm)         { setError('كلمتا المرور غير متطابقتين'); return; }
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);

    const isAdmin = email.toLowerCase().includes('admin');
    onLogin(username || email.split('@')[0], isAdmin);
  };

  return (
    <div className="min-h-screen page-enter bg-gray-50 dark:bg-gray-950 px-4 py-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-400 hover:text-gray-700 dark:hover:text-white text-sm font-semibold transition-colors">
          <ChevronRight size={17} /> رجوع
        </button>

        <div className="text-center space-y-2">
          <h1 className="font-brand text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">أهلاً بك في salix</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">سجّل دخولك لمتابعة طلباتك وإدارتها بسهولة</p>
        </div>

          {/* ── Google login ─────────────────────────────── */}
          <button
            type="button"
            onClick={() => loginWithGoogle()}
            disabled={loading}
            className="w-full py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#0D2926] dark:text-gray-200 font-bold rounded-2xl flex items-center justify-center gap-3 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 active:scale-[0.98] transition-all mb-5 disabled:opacity-60"
          >
            <Chrome size={18} strokeWidth={1.8} className="text-gray-700" />
            <span className="text-sm">المتابعة باستخدام Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
            <span className="bg-white dark:bg-gray-900 px-3 text-[10px] text-gray-400 dark:text-gray-500 font-semibold">أو بالبريد الإلكتروني</span>
            <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-50 dark:bg-gray-800 rounded-2xl p-1 mb-5">
            {(['login', 'register'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); reset(); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  mode === m ? 'bg-[#00BFA5] text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {m === 'login' ? 'تسجيل الدخول' : 'حساب جديد'}
              </button>
            ))}
          </div>

          <form key={mode} onSubmit={handleSubmit} className="space-y-4 auth-form-enter">

            {/* Username — register only */}
            {mode === 'register' && (
              <div>
                <label className="text-gray-700 dark:text-gray-300 text-xs font-medium mb-1.5 block">اسم المستخدم *</label>
                <div className={`input-field bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-2xl ${username ? 'border-[#00BFA5]' : ''}`}>
                  <User size={16} className="text-gray-400 ml-3" />
                  <input
                    type="text" value={username} onChange={e => setUsername(e.target.value)}
                    className="flex-1 py-3 bg-transparent outline-none text-gray-900 dark:text-white text-sm"
                    placeholder="محمد أحمد" dir="rtl"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-gray-700 dark:text-gray-300 text-xs font-medium mb-1.5 block">البريد الإلكتروني *</label>
              <div className={`input-field bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-2xl ${email ? 'border-[#00BFA5]' : ''}`}>
                <Mail size={16} className="text-gray-400 ml-3" />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="flex-1 py-3 bg-transparent outline-none text-gray-900 dark:text-white text-sm"
                  placeholder="name@example.com" dir="ltr"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-gray-700 dark:text-gray-300 text-xs font-medium">كلمة المرور *</label>
                {mode === 'login' && <button type="button" className="text-[11px] text-[#00897B] dark:text-teal-400 hover:underline">نسيت كلمة المرور؟</button>}
              </div>
              <div className={`input-field bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-2xl ${password ? 'border-[#00BFA5]' : ''}`}>
                <Lock size={16} className="text-gray-400 ml-3" />
                <input
                  type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  className="flex-1 py-3 bg-transparent outline-none text-gray-900 dark:text-white text-sm"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="ml-3 text-[#90AFAC] hover:text-[#00BFA5] transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm password — register only */}
            {mode === 'register' && (
              <div>
                <label className="text-gray-700 dark:text-gray-300 text-xs font-medium mb-1.5 block">تأكيد كلمة المرور *</label>
                <div className={`input-field bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-2xl ${confirm ? (confirm === password ? 'border-green-400' : 'border-red-300') : ''}`}>
                  <Lock size={16} className={confirm ? (confirm === password ? 'text-green-500' : 'text-red-400') : 'text-gray-400'} style={{ marginLeft: 12 }} />
                  <input
                    type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                    className="flex-1 py-3 bg-transparent outline-none text-gray-900 dark:text-white text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 text-red-500 dark:text-red-300 text-sm px-4 py-3 rounded-2xl flex items-center gap-2">
                <AlertCircle size={17} className="text-red-500 flex-none" /> {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-[#00BFA5] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#00BFA5]/20 disabled:opacity-60 flex items-center justify-center gap-2 transition-all hover:bg-[#009688] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جاري المعالجة...
                </span>
              ) : (
                <>
                  <LogIn size={18} />
                  {mode === 'login' ? 'دخول' : 'إنشاء الحساب'}
                </>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-4">
            {mode === 'login' ? (
              <>مستخدم جديد؟{' '}
                <button onClick={() => { setMode('register'); reset(); }} className="text-[#00897B] dark:text-teal-400 font-semibold hover:underline">
                  إنشاء حساب
                </button>
              </>
            ) : (
              <>لديك حساب؟{' '}
                <button onClick={() => { setMode('login'); reset(); }} className="text-[#00897B] dark:text-teal-400 font-semibold hover:underline">
                  تسجيل الدخول
                </button>
              </>
            )}
          </p>
      </div>
    </div>
  );
}

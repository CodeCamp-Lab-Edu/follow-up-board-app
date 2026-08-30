'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email.trim() || !password) {
        setError('กรุณากรอกอีเมลและรหัสผ่าน');
        setIsLoading(false);
        return;
      }

      const res = await signIn.email({
        email: email.trim(),
        password,
      });

      if (res?.error) {
        setError(res.error.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        setIsLoading(false);
        return;
      }

      // Hard redirect to dashboard to ensure fresh cookies synchronization
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4 py-12 text-on-surface">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-md mb-3">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            dataset
          </span>
        </div>
        <h1 className="text-[24px] font-bold text-primary dark:text-primary-fixed-dim tracking-tight">
          Follow-up Board
        </h1>
        <p className="text-[14px] text-on-surface-variant mt-1">
          ระบบ CRM ติดตามงานและลูกค้าสำหรับทีมขายมืออาชีพ
        </p>
      </div>

      {/* Sign In Card */}
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-[0px_4px_20px_rgba(15,23,42,0.06)] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-6 text-center">
          <h2 className="text-[20px] font-bold text-on-surface">เข้าสู่ระบบ</h2>
          <p className="text-[13px] text-on-surface-variant mt-1">
            กรอกข้อมูลเพื่อเข้าสู่ระบบบัญชีของคุณ
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-error-container text-on-error-container text-[13px] flex items-center gap-2 border border-error/20">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label className="block text-[13px] font-semibold text-on-surface mb-1.5" htmlFor="email">
              อีเมล
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                mail
              </span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-outline-variant rounded-lg text-[14px] text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[13px] font-semibold text-on-surface" htmlFor="password">
                รหัสผ่าน
              </label>
              <Link
                href="#"
                className="text-[12px] text-primary hover:underline font-medium"
              >
                ลืมรหัสผ่าน?
              </Link>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                lock
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-surface border border-outline-variant rounded-lg text-[14px] text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer p-0.5"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center pt-1">
            <label className="flex items-center gap-2 text-[13px] text-on-surface-variant cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary/30 border-outline-variant cursor-pointer"
              />
              จดจำการเข้าสู่ระบบ
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-primary text-on-primary font-semibold text-[14px] py-2.5 px-4 rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">
                  progress_activity
                </span>
                กำลังเข้าสู่ระบบ...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">login</span>
                เข้าสู่ระบบ
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Sign Up */}
        <div className="mt-6 pt-6 border-t border-outline-variant/60 text-center">
          <p className="text-[13px] text-on-surface-variant">
            ยังไม่มีบัญชีผู้ใช้?{' '}
            <Link
              href="/sign-up"
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              สมัครสมาชิก
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

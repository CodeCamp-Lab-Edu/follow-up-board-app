'use client';

import { useState, useEffect } from 'react';

export function useSession() {
  const [data, setData] = useState<{ user: { id: string; name: string; email: string } } | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const json = await res.json();
          if (mounted) {
            setData(json.user ? { user: json.user } : null);
          }
        }
      } catch {
        if (mounted) setData(null);
      } finally {
        if (mounted) setIsPending(false);
      }
    }
    checkSession();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, isPending };
}

export const signIn = {
  email: async ({ email, password }: { email: string; password: string; callbackURL?: string }) => {
    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        return { error: { message: json.error || 'เข้าสู่ระบบไม่สำเร็จ' } };
      }
      return { data: json, error: null };
    } catch (err: any) {
      return { error: { message: err?.message || 'เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ' } };
    }
  },
};

export const signUp = {
  email: async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
    callbackURL?: string;
  }) => {
    try {
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const json = await res.json();
      if (!res.ok) {
        return { error: { message: json.error || 'สมัครสมาชิกไม่สำเร็จ' } };
      }
      return { data: json, error: null };
    } catch (err: any) {
      return { error: { message: err?.message || 'เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ' } };
    }
  },
};

export async function signOut() {
  await fetch('/api/auth/sign-out', { method: 'POST' });
  window.location.href = '/sign-in';
}

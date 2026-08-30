'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-surface text-on-surface">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 pt-20 md:pt-24 max-w-3xl mx-auto w-full text-center">
          <h2 className="font-bold text-[32px] text-primary mb-2">ยินดีต้อนรับสู่ Follow-up Board</h2>
          <p className="text-[16px] text-on-surface-variant mb-6">ระบบ CRM ติดตามงานและลูกค้าสำหรับทีมขายมืออาชีพ</p>
          
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm w-full max-w-md space-y-3">
            <h3 className="font-bold text-[18px] mb-2">เริ่มต้นใช้งาน</h3>
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center bg-primary text-on-primary rounded font-semibold text-[14px] py-3 hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
            >
              ไปที่แดชบอร์ด
            </Link>
            <div className="flex gap-2 pt-1">
              <Link
                href="/sign-in"
                className="flex-1 inline-flex items-center justify-center border border-outline-variant text-on-surface hover:bg-surface-container-low rounded font-semibold text-[13px] py-2.5 transition-all cursor-pointer"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/sign-up"
                className="flex-1 inline-flex items-center justify-center bg-surface-container-high text-primary hover:bg-surface-container-highest rounded font-semibold text-[13px] py-2.5 transition-all cursor-pointer"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

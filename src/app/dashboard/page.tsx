'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const followUps = [
    {
      initials: 'SC',
      name: 'สมชาย ใจดี',
      company: 'บจก. พัฒนาไทย',
      status: 'สนใจสูง',
      statusColor: 'bg-secondary-container/20 text-on-secondary-container',
      dotColor: 'bg-secondary',
      channel: 'โทรศัพท์',
      icon: 'call',
      actionText: 'โทรเลย',
      btnStyle: 'bg-primary text-on-primary hover:bg-primary/90 shadow-sm',
    },
    {
      initials: 'WR',
      name: 'วิภา รุ่งเรือง',
      company: 'สยามกรุ๊ป',
      status: 'รอตัดสินใจ',
      statusColor: 'bg-tertiary-fixed/30 text-on-tertiary-fixed-variant',
      dotColor: 'bg-tertiary',
      channel: 'อีเมล',
      icon: 'mail',
      actionText: 'ส่งอีเมล',
      btnStyle: 'border border-outline-variant text-on-surface hover:bg-surface-container-low',
    },
    {
      initials: 'AK',
      name: 'อนันต์ กิจเจริญ',
      company: 'หจก. รุ่งเรืองพาณิชย์',
      status: 'ลูกค้าใหม่',
      statusColor: 'bg-primary-container/10 text-primary',
      dotColor: 'bg-primary',
      channel: 'แชท',
      icon: 'chat_bubble',
      actionText: 'ทักแชท',
      btnStyle: 'border border-outline-variant text-on-surface hover:bg-surface-container-low',
    },
  ];

  const chartBars = [
    { day: 'จ.', height: 'h-[40%]', value: 12 },
    { day: 'อ.', height: 'h-[60%]', value: 18 },
    { day: 'พ.', height: 'h-[30%]', value: 9 },
    { day: 'พฤ.', height: 'h-[80%]', value: 24 },
    { day: 'ศ.', height: 'h-[100%]', value: 30 },
    { day: 'ส.', height: 'h-[50%]', value: 15 },
    { day: 'อา.', height: 'h-[70%]', value: 21 },
  ];

  return (
    <div className="min-h-screen flex bg-surface text-on-surface">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 pt-20 md:pt-24 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <h2 className="font-bold text-[24px] text-on-surface">ภาพรวมแดชบอร์ด</h2>
            <p className="text-[14px] text-on-surface-variant">สรุปข้อมูลและงานที่ต้องติดตามในวันนี้</p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">ผู้ติดต่อทั้งหมด</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                </div>
              </div>
              <div className="text-[32px] font-bold text-on-surface">1,248</div>
              <div className="text-[13px] text-secondary mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +12% จากสัปดาห์ที่แล้ว
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">รอการติดตาม</span>
                <div className="w-8 h-8 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[18px]">pending_actions</span>
                </div>
              </div>
              <div className="text-[32px] font-bold text-on-surface">42</div>
              <div className="text-[13px] text-error mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                15 รายการเกินกำหนด
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">ลูกค้าเป้าหมาย</span>
                <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[18px]">moving</span>
                </div>
              </div>
              <div className="text-[32px] font-bold text-on-surface">89</div>
              <div className="text-[13px] text-secondary mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +5% จากสัปดาห์ที่แล้ว
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">งานที่เสร็จสิ้น</span>
                <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[18px]">task_alt</span>
                </div>
              </div>
              <div className="text-[32px] font-bold text-on-surface">312</div>
              <div className="text-[13px] text-on-surface-variant mt-1">ในเดือนนี้</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Table */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_1px_3px_rgba(15,23,42,0.05)] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
                <h3 className="font-bold text-[20px] text-on-surface">ต้องติดตามวันนี้</h3>
                <Link href="/contacts" className="text-primary font-semibold text-[12px] hover:underline cursor-pointer">
                  ดูทั้งหมด
                </Link>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30">
                      <th className="px-6 py-4 text-[12px] text-on-surface-variant font-semibold uppercase tracking-wider">ชื่อ / บริษัท</th>
                      <th className="px-6 py-4 text-[12px] text-on-surface-variant font-semibold uppercase tracking-wider">สถานะ</th>
                      <th className="px-6 py-4 text-[12px] text-on-surface-variant font-semibold uppercase tracking-wider">ช่องทาง</th>
                      <th className="px-6 py-4 text-[12px] text-on-surface-variant font-semibold uppercase tracking-wider text-right">การกระทำ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {followUps.map((item, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low/30 transition-colors group">
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-container/10 text-primary flex items-center justify-center font-bold text-[14px]">
                              {item.initials}
                            </div>
                            <div>
                              <div className="text-[14px] font-semibold text-on-surface group-hover:text-primary transition-colors">
                                {item.name}
                              </div>
                              <div className="text-[13px] text-on-surface-variant">
                                {item.company}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium ${item.statusColor}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`}></span>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-on-surface-variant">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            <span className="text-[13px]">{item.channel}</span>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-right">
                          <button className={`inline-flex items-center justify-center h-10 px-6 rounded-full text-[12px] font-semibold transition-all active:scale-95 cursor-pointer ${item.btnStyle}`}>
                            {item.actionText}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_1px_3px_rgba(15,23,42,0.05)] flex flex-col h-[400px]">
              <h3 className="font-bold text-[20px] text-on-surface mb-2">แนวโน้มการติดตาม</h3>
              <p className="text-[13px] text-on-surface-variant mb-6">จำนวนการติดต่อย้อนหลัง 7 วัน</p>
              <div className="flex-1 relative flex items-end justify-between px-4 pb-4 border-b border-l border-outline-variant pt-6">
                {chartBars.map((bar, idx) => (
                  <div
                    key={idx}
                    className={`w-8 bg-primary/30 rounded-t ${bar.height} hover:bg-primary transition-colors relative group cursor-pointer`}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[11px] font-semibold whitespace-nowrap bg-on-surface text-surface px-1.5 py-0.5 rounded shadow">
                      {bar.value} รายการ
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between px-4 mt-2 text-[11px] font-semibold text-on-surface-variant">
                {chartBars.map((bar, idx) => (
                  <span key={idx}>{bar.day}</span>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

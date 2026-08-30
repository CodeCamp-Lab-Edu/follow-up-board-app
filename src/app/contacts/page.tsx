'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Contact, ContactStatus } from '@/types/contact';

const INITIAL_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'สมชาย ใจดี',
    company: 'บริษัท เอบีซี จำกัด',
    email: 'somchai@abc.co.th',
    phone: '081-234-5678',
    channel: ['phone', 'email'],
    status: 'รอติดตาม',
    followUpDate: '15 ต.ค. 2023',
    notes: 'สนใจแพ็กเกจ Enterprise ส่งใบเสนอราคาแล้ว',
    interests: 'Enterprise Package',
    initials: 'ส',
  },
  {
    id: '2',
    name: 'วิไลวรรณ มั่นคง',
    company: 'Startup X',
    email: 'wilaiwan@startupx.io',
    phone: '089-876-5432',
    channel: ['email', 'line'],
    status: 'กำลังคุย',
    followUpDate: '18 ต.ค. 2023',
    notes: 'ขอดู Demo ระบบเพิ่มเติมวันศุกร์นี้',
    interests: 'Demo ระบบ CRM',
    initials: 'ว',
  },
  {
    id: '3',
    name: 'ณัฐพล ศรีสุข',
    company: 'อิสระ (Freelance)',
    email: 'nuttapol.s@gmail.com',
    phone: '086-555-4321',
    channel: ['phone'],
    status: 'ปิดงาน',
    followUpDate: '-',
    notes: 'สมัครแพ็กเกจ Pro รายปีเรียบร้อย',
    interests: 'Pro Annual Plan',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZNvu4wJYeaJocex2gUN48FRgZxYnbgsWMEoVbuDM3vVKkyaDjvgSfb_vdLccPIj5Bd0-S3H3uKEqLw2205k7WejfMZ1ykB1hGo2gdaYagXUqQKs5uAb_YxZHV6lkppG9dObpAUM6ML7VwKIcUeIrBqKjy20G95js7Kg8QN2rSI_E0AzUhSHx6GoGHBP0HjS24sdXNVv72TkbVVUXC_hq-PMKTLSisXQ6P_ZLLci2z2qAzRJx6LHgW',
  },
  {
    id: '4',
    name: 'กิตติศักดิ์ เจริญดี',
    company: 'บจก. นวัตกรรมไทย',
    email: 'kittisak@thaitech.co.th',
    phone: '082-999-8877',
    channel: ['line', 'phone'],
    status: 'รายการใหม่',
    followUpDate: '20 ต.ค. 2023',
    notes: 'ติดต่อผ่านหน้าเว็บ ต้องการระบบจัดการทีมขาย',
    interests: 'Sales Management',
    initials: 'ก',
  },
];

function ContactsContent() {
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ทั้งหมด');
  const [dateFilter, setDateFilter] = useState('ทั้งหมด');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  // Form state for add/edit
  const [formData, setFormData] = useState<{
    name: string;
    company: string;
    email: string;
    phone: string;
    channelPhone: boolean;
    channelEmail: boolean;
    channelLine: boolean;
    interests: string;
    status: ContactStatus;
    followUpDate: string;
    notes: string;
  }>({
    name: '',
    company: '',
    email: '',
    phone: '',
    channelPhone: true,
    channelEmail: false,
    channelLine: false,
    interests: '',
    status: 'รายการใหม่',
    followUpDate: '',
    notes: '',
  });

  // Open add modal if query param is set
  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      openAddModal();
    }
  }, [searchParams]);

  const openAddModal = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      channelPhone: true,
      channelEmail: false,
      channelLine: false,
      interests: '',
      status: 'รายการใหม่',
      followUpDate: '',
      notes: '',
    });
    setEditingContact(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      company: contact.company,
      email: contact.email,
      phone: contact.phone,
      channelPhone: contact.channel.includes('phone'),
      channelEmail: contact.channel.includes('email'),
      channelLine: contact.channel.includes('line'),
      interests: contact.interests || '',
      status: contact.status,
      followUpDate: contact.followUpDate === '-' ? '' : contact.followUpDate,
      notes: contact.notes || '',
    });
    setIsAddModalOpen(true);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    const channels: string[] = [];
    if (formData.channelPhone) channels.push('phone');
    if (formData.channelEmail) channels.push('email');
    if (formData.channelLine) channels.push('line');

    if (editingContact) {
      // Edit
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingContact.id
            ? {
                ...c,
                name: formData.name,
                company: formData.company,
                email: formData.email,
                phone: formData.phone,
                channel: channels.length > 0 ? channels : ['phone'],
                interests: formData.interests,
                status: formData.status,
                followUpDate: formData.followUpDate.trim() || '-',
                notes: formData.notes,
                initials: formData.name ? formData.name.charAt(0) : 'ค',
              }
            : c
        )
      );
    } else {
      // Add
      const newContact: Contact = {
        id: Date.now().toString(),
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        channel: channels.length > 0 ? channels : ['phone'],
        interests: formData.interests,
        status: formData.status,
        followUpDate: formData.followUpDate.trim() || '-',
        notes: formData.notes,
        initials: formData.name ? formData.name.charAt(0) : 'ค',
      };
      setContacts((prev) => [newContact, ...prev]);
    }

    setIsAddModalOpen(false);
    setEditingContact(null);
  };

  const handleDeleteContact = () => {
    if (deletingContact) {
      setContacts((prev) => prev.filter((c) => c.id !== deletingContact.id));
      setDeletingContact(null);
    }
  };

  // Filter contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((item) => {
      // Search filter
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.includes(q) ||
        (item.notes && item.notes.toLowerCase().includes(q));

      // Status filter
      let matchStatus = true;
      if (statusFilter !== 'ทั้งหมด') {
        if (statusFilter === 'รายการใหม่') matchStatus = item.status === 'รายการใหม่';
        else if (statusFilter === 'กำลังคุย' || statusFilter === 'กำลังเจรจา')
          matchStatus = item.status === 'กำลังคุย';
        else if (statusFilter === 'รอติดตาม' || statusFilter === 'ต้องติดตาม')
          matchStatus = item.status === 'รอติดตาม';
        else if (statusFilter === 'ปิดงาน' || statusFilter === 'ปิดการขายแล้ว')
          matchStatus = item.status === 'ปิดงาน';
      }

      return matchQuery && matchStatus;
    });
  }, [contacts, searchQuery, statusFilter]);

  const getStatusBadge = (status: ContactStatus) => {
    switch (status) {
      case 'รอติดตาม':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-error-container text-on-error-container border border-error/20">
            ต้องติดตาม
          </span>
        );
      case 'กำลังคุย':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary-fixed text-on-primary-fixed-variant border border-primary/20">
            กำลังเจรจา
          </span>
        );
      case 'ปิดงาน':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-surface-container-high text-on-surface-variant border border-outline-variant">
            ปิดการขายแล้ว
          </span>
        );
      case 'รายการใหม่':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-secondary-container/20 text-on-secondary-container border border-secondary/20">
            รายการใหม่
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-background text-on-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onAddContact={openAddModal}
      />
      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 md:p-8 pt-20 md:pt-24 max-w-7xl mx-auto w-full">
          {/* Top Title & Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-[24px] font-bold text-on-background">รายชื่อผู้ติดต่อ</h2>
              <p className="text-[14px] text-on-surface-variant">
                จัดการและติดตามสถานะผู้ติดต่อทั้งหมด ({filteredContacts.length} รายการ)
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-surface-container-lowest border border-outline-variant rounded-md px-3 py-1.5 text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface-variant cursor-pointer"
              >
                <option value="ทั้งหมด">สถานะทั้งหมด</option>
                <option value="รายการใหม่">รายการใหม่</option>
                <option value="รอติดตาม">ต้องติดตาม</option>
                <option value="กำลังคุย">กำลังเจรจา</option>
                <option value="ปิดงาน">ปิดการขายแล้ว</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-surface-container-lowest border border-outline-variant rounded-md px-3 py-1.5 text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface-variant cursor-pointer"
              >
                <option value="ทั้งหมด">วันที่ติดตาม (ทั้งหมด)</option>
                <option value="วันนี้">วันนี้</option>
                <option value="สัปดาห์นี้">สัปดาห์นี้</option>
              </select>

              <button
                onClick={openAddModal}
                className="bg-primary text-on-primary font-semibold text-[13px] px-4 py-1.5 rounded-md hover:bg-primary/90 transition-all flex items-center gap-1 shadow-sm cursor-pointer ml-auto sm:ml-0"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                เพิ่มผู้ติดต่อ
              </button>
            </div>
          </div>

          {/* Search bar inside content */}
          <div className="mb-4 relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อ, บริษัท, อีเมล, เบอร์โทร..."
              className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-md text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Data Table Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0px_1px_3px_rgba(15,23,42,0.05)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface border-b border-outline-variant">
                    <th className="py-3 px-4 text-[12px] font-semibold text-on-surface-variant sticky top-0 bg-surface z-10 w-[260px]">
                      ชื่อ - นามสกุล / บริษัท
                    </th>
                    <th className="py-3 px-4 text-[12px] font-semibold text-on-surface-variant sticky top-0 bg-surface z-10 w-[140px]">
                      ช่องทางติดต่อ
                    </th>
                    <th className="py-3 px-4 text-[12px] font-semibold text-on-surface-variant sticky top-0 bg-surface z-10 w-[130px]">
                      สถานะ
                    </th>
                    <th className="py-3 px-4 text-[12px] font-semibold text-on-surface-variant sticky top-0 bg-surface z-10 w-[150px]">
                      วันที่ติดตามถัดไป
                    </th>
                    <th className="py-3 px-4 text-[12px] font-semibold text-on-surface-variant sticky top-0 bg-surface z-10">
                      บันทึกเพิ่มเติม
                    </th>
                    <th className="py-3 px-4 text-[12px] font-semibold text-on-surface-variant sticky top-0 bg-surface z-10 w-[120px] text-right">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-[40px] text-outline mb-2">
                          person_search
                        </span>
                        <p className="text-[14px]">ไม่พบข้อมูลผู้ติดต่อที่ตรงกับเงื่อนไข</p>
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((contact) => (
                      <tr
                        key={contact.id}
                        className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                        onClick={() => setViewingContact(contact)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {contact.avatar ? (
                              <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant shrink-0">
                                <img
                                  alt={contact.name}
                                  className="w-full h-full object-cover"
                                  src={contact.avatar}
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-[13px] shrink-0">
                                {contact.initials || contact.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-[14px] text-on-background group-hover:text-primary transition-colors">
                                {contact.name}
                              </div>
                              <div className="text-[12px] text-on-surface-variant">
                                {contact.company}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2 text-on-surface-variant">
                            {contact.channel.includes('phone') && (
                              <a
                                href={`tel:${contact.phone}`}
                                title={`โทร: ${contact.phone}`}
                                className="hover:text-primary transition-colors"
                              >
                                <span className="material-symbols-outlined text-[18px] text-primary">
                                  call
                                </span>
                              </a>
                            )}
                            {contact.channel.includes('email') && (
                              <a
                                href={`mailto:${contact.email}`}
                                title={`อีเมล: ${contact.email}`}
                                className="hover:text-primary transition-colors"
                              >
                                <span className="material-symbols-outlined text-[18px]">mail</span>
                              </a>
                            )}
                            {contact.channel.includes('line') && (
                              <span
                                className="material-symbols-outlined text-[18px] text-[#00c300]"
                                title="Line"
                              >
                                forum
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(contact.status)}</td>
                        <td className="py-3 px-4 text-[13px] text-on-background">
                          {contact.followUpDate}
                        </td>
                        <td
                          className="py-3 px-4 text-[13px] text-on-surface-variant truncate max-w-[220px]"
                          title={contact.notes}
                        >
                          {contact.notes || '-'}
                        </td>
                        <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setViewingContact(contact)}
                              className="p-1 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                              title="ดูรายละเอียด"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                visibility
                              </span>
                            </button>
                            <button
                              onClick={() => openEditModal(contact)}
                              className="p-1 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                              title="แก้ไข"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              onClick={() => setDeletingContact(contact)}
                              className="p-1 rounded text-on-surface-variant hover:text-error hover:bg-error-container transition-colors cursor-pointer"
                              title="ลบ"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-outline-variant flex items-center justify-between bg-surface">
              <div className="text-[13px] text-on-surface-variant">
                แสดง {filteredContacts.length > 0 ? 1 : 0} ถึง {filteredContacts.length} จาก{' '}
                {contacts.length} รายการ
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-1 rounded text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50"
                  disabled
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded bg-primary text-on-primary text-[12px] font-semibold">
                  1
                </button>
                <button
                  className="p-1 rounded text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50"
                  disabled
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* View Contact Details Modal */}
      {viewingContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
              <h3 className="font-bold text-[18px] text-on-background">รายละเอียดผู้ติดต่อ</h3>
              <button
                onClick={() => setViewingContact(null)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[18px]">
                  {viewingContact.initials || viewingContact.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[16px] text-on-background">
                    {viewingContact.name}
                  </h4>
                  <p className="text-[13px] text-on-surface-variant">{viewingContact.company}</p>
                </div>
                <div className="ml-auto">{getStatusBadge(viewingContact.status)}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-[13px]">
                <div>
                  <span className="text-on-surface-variant block font-medium">เบอร์โทรศัพท์:</span>
                  <a href={`tel:${viewingContact.phone}`} className="text-primary hover:underline">
                    {viewingContact.phone || '-'}
                  </a>
                </div>
                <div>
                  <span className="text-on-surface-variant block font-medium">อีเมล:</span>
                  <a
                    href={`mailto:${viewingContact.email}`}
                    className="text-primary hover:underline"
                  >
                    {viewingContact.email || '-'}
                  </a>
                </div>
                <div>
                  <span className="text-on-surface-variant block font-medium">
                    วันที่ต้อง Follow-up:
                  </span>
                  <span className="text-on-background">{viewingContact.followUpDate || '-'}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block font-medium">สิ่งที่สนใจ:</span>
                  <span className="text-on-background">{viewingContact.interests || '-'}</span>
                </div>
              </div>

              {viewingContact.notes && (
                <div className="pt-2">
                  <span className="text-on-surface-variant block font-medium text-[13px] mb-1">
                    หมายเหตุ:
                  </span>
                  <p className="text-[13px] bg-surface-container-low p-3 rounded-md text-on-background">
                    {viewingContact.notes}
                  </p>
                </div>
              )}
            </div>
            <div className="px-6 py-3 bg-surface border-t border-outline-variant flex justify-end gap-2">
              <button
                onClick={() => {
                  const contactToEdit = viewingContact;
                  setViewingContact(null);
                  openEditModal(contactToEdit);
                }}
                className="px-4 py-2 rounded-md border border-outline-variant text-[13px] font-semibold text-on-background hover:bg-surface-container-low cursor-pointer"
              >
                แก้ไข
              </button>
              <button
                onClick={() => setViewingContact(null)}
                className="px-4 py-2 rounded-md bg-primary text-on-primary text-[13px] font-semibold hover:bg-primary/90 cursor-pointer"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Contact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
              <h3 className="font-bold text-[18px] text-on-background">
                {editingContact ? 'แก้ไขข้อมูลผู้ติดต่อ' : 'เพิ่มผู้ติดต่อใหม่'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSaveContact}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-on-background mb-1">
                      ชื่อ - นามสกุล *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-outline-variant rounded-md text-[14px] bg-surface focus:outline-none focus:border-primary"
                      placeholder="เช่น สมชาย ใจดี"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-on-background mb-1">
                      บริษัทหรือองค์กร
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2 border border-outline-variant rounded-md text-[14px] bg-surface focus:outline-none focus:border-primary"
                      placeholder="เช่น บจก. นวัตกรรมไทย"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-on-background mb-1">
                      อีเมล
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-outline-variant rounded-md text-[14px] bg-surface focus:outline-none focus:border-primary"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-on-background mb-1">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-outline-variant rounded-md text-[14px] bg-surface focus:outline-none focus:border-primary"
                      placeholder="081-234-5678"
                    />
                  </div>
                </div>

                {/* Contact Channels */}
                <div>
                  <label className="block text-[13px] font-semibold text-on-background mb-1">
                    ช่องทางติดต่อ
                  </label>
                  <div className="flex gap-4 pt-1">
                    <label className="inline-flex items-center gap-1.5 text-[13px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.channelPhone}
                        onChange={(e) =>
                          setFormData({ ...formData, channelPhone: e.target.checked })
                        }
                        className="rounded text-primary focus:ring-primary"
                      />
                      โทรศัพท์
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-[13px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.channelEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, channelEmail: e.target.checked })
                        }
                        className="rounded text-primary focus:ring-primary"
                      />
                      อีเมล
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-[13px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.channelLine}
                        onChange={(e) =>
                          setFormData({ ...formData, channelLine: e.target.checked })
                        }
                        className="rounded text-primary focus:ring-primary"
                      />
                      Line
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-on-background mb-1">
                      สถานะ
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as ContactStatus })
                      }
                      className="w-full px-3 py-2 border border-outline-variant rounded-md text-[14px] bg-surface focus:outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="รายการใหม่">รายการใหม่</option>
                      <option value="กำลังคุย">กำลังคุย (เจรจา)</option>
                      <option value="รอติดตาม">รอติดตาม (ต้องติดตาม)</option>
                      <option value="ปิดงาน">ปิดงาน (ปิดการขายแล้ว)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-on-background mb-1">
                      วันที่ต้อง Follow-up
                    </label>
                    <input
                      type="text"
                      value={formData.followUpDate}
                      onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                      className="w-full px-3 py-2 border border-outline-variant rounded-md text-[14px] bg-surface focus:outline-none focus:border-primary"
                      placeholder="เช่น 25 ต.ค. 2023"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-on-background mb-1">
                    สิ่งที่สนใจ
                  </label>
                  <input
                    type="text"
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    className="w-full px-3 py-2 border border-outline-variant rounded-md text-[14px] bg-surface focus:outline-none focus:border-primary"
                    placeholder="เช่น แพ็กเกจ Enterprise, สนใจ Demo"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-on-background mb-1">
                    หมายเหตุ
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-outline-variant rounded-md text-[14px] bg-surface focus:outline-none focus:border-primary"
                    placeholder="บันทึกรายละเอียดเพิ่มเติม..."
                  />
                </div>
              </div>

              <div className="px-6 py-3 bg-surface border-t border-outline-variant flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-md border border-outline-variant text-[13px] font-semibold text-on-background hover:bg-surface-container-low cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-primary text-on-primary text-[13px] font-semibold hover:bg-primary/90 cursor-pointer shadow-sm"
                >
                  {editingContact ? 'บันทึกการแก้ไข' : 'เพิ่มผู้ติดต่อ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-error mb-3">
              <span className="material-symbols-outlined text-[28px]">warning</span>
              <h3 className="font-bold text-[18px] text-on-background">ยืนยันการลบ?</h3>
            </div>
            <p className="text-[14px] text-on-surface-variant mb-6">
              คุณต้องการลบรายชื่อผู้ติดต่อ <strong>{deletingContact.name}</strong> ออกจากระบบใช่หรือไม่?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeletingContact(null)}
                className="px-4 py-2 rounded-md border border-outline-variant text-[13px] font-semibold text-on-background hover:bg-surface-container-low cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDeleteContact}
                className="px-4 py-2 rounded-md bg-error text-on-error text-[13px] font-semibold hover:bg-error/90 cursor-pointer"
              >
                ลบผู้ติดต่อ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-on-background">
          <div className="text-center">
            <span className="material-symbols-outlined text-[36px] animate-spin text-primary mb-2">
              progress_activity
            </span>
            <p className="text-[14px] text-on-surface-variant">กำลังโหลดข้อมูลผู้ติดต่อ...</p>
          </div>
        </div>
      }
    >
      <ContactsContent />
    </Suspense>
  );
}

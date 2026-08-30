export type ContactStatus = 'รายการใหม่' | 'กำลังคุย' | 'รอติดตาม' | 'ปิดงาน';

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  channel: string[]; // e.g. ['phone', 'email', 'line']
  interests?: string;
  status: ContactStatus;
  followUpDate: string;
  notes?: string;
  avatar?: string;
  initials?: string;
}

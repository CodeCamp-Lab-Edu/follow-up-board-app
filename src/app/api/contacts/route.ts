import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('followup_session')?.value;
  if (!token || !prisma?.session) return null;
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!session || new Date() > session.expiresAt) return null;
  return session.user;
}

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบก่อนทำรายการ' }, { status: 401 });
    }

    if (!prisma?.contact) {
      return NextResponse.json({ contacts: [] });
    }

    const dbContacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const contacts = dbContacts.map((c: any) => ({
      id: c.id,
      name: c.name,
      company: c.company || '',
      email: c.email || '',
      phone: c.phone || '',
      channel: c.channel ? c.channel.split(',') : ['phone'],
      interests: c.interests || '',
      status: c.status || 'รายการใหม่',
      followUpDate: c.followUpDate
        ? new Date(c.followUpDate).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : '-',
      notes: c.notes || '',
      initials: c.name ? c.name.charAt(0) : 'ค',
    }));

    return NextResponse.json({ contacts });
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบก่อนทำรายการ' }, { status: 401 });
    }

    const body = await req.json();
    const { name, company, email, phone, channel, interests, status, followUpDate, notes } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'ชื่อผู้ติดต่อเป็นข้อมูลจำเป็น' }, { status: 400 });
    }

    const channelStr = Array.isArray(channel) ? channel.join(',') : channel || 'phone';

    let parsedDate: Date | null = null;
    if (followUpDate && followUpDate !== '-') {
      const d = new Date(followUpDate);
      if (!isNaN(d.getTime())) {
        parsedDate = d;
      }
    }

    if (!prisma?.contact) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
    }

    const newContact = await prisma.contact.create({
      data: {
        name: name.trim(),
        company: company?.trim() || null,
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        channel: channelStr,
        interests: interests?.trim() || null,
        status: status || 'รายการใหม่',
        followUpDate: parsedDate,
        notes: notes?.trim() || null,
      },
    });

    const contact = {
      id: newContact.id,
      name: newContact.name,
      company: newContact.company || '',
      email: newContact.email || '',
      phone: newContact.phone || '',
      channel: newContact.channel ? newContact.channel.split(',') : ['phone'],
      interests: newContact.interests || '',
      status: newContact.status || 'รายการใหม่',
      followUpDate: newContact.followUpDate
        ? new Date(newContact.followUpDate).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : '-',
      notes: newContact.notes || '',
      initials: newContact.name ? newContact.name.charAt(0) : 'ค',
    };

    return NextResponse.json({ contact }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create contact' },
      { status: 500 }
    );
  }
}

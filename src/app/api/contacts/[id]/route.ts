import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบก่อนทำรายการ' }, { status: 401 });
    }

    const { id } = await params;
    if (!prisma?.contact) {
      return NextResponse.json({ error: 'Database not available' }, { status: 404 });
    }

    const c = await prisma.contact.findUnique({
      where: { id },
    });

    if (!c) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    const contact = {
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
    };

    return NextResponse.json({ contact });
  } catch (error: any) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch contact' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบก่อนทำรายการ' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { name, company, email, phone, channel, interests, status, followUpDate, notes } = body;

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

    const updated = await prisma.contact.update({
      where: { id },
      data: {
        name: name?.trim(),
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
      id: updated.id,
      name: updated.name,
      company: updated.company || '',
      email: updated.email || '',
      phone: updated.phone || '',
      channel: updated.channel ? updated.channel.split(',') : ['phone'],
      interests: updated.interests || '',
      status: updated.status || 'รายการใหม่',
      followUpDate: updated.followUpDate
        ? new Date(updated.followUpDate).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : '-',
      notes: updated.notes || '',
      initials: updated.name ? updated.name.charAt(0) : 'ค',
    };

    return NextResponse.json({ contact });
  } catch (error: any) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update contact' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบก่อนทำรายการ' }, { status: 401 });
    }

    const { id } = await params;

    if (prisma?.contact) {
      await prisma.contact.delete({
        where: { id },
      });
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to delete contact' },
      { status: 500 }
    );
  }
}

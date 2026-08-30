import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('followup_session')?.value;

    if (token && prisma?.session) {
      await prisma.session.deleteMany({
        where: { token },
      });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete('followup_session');
    return response;
  } catch (error) {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('followup_session');
    return response;
  }
}

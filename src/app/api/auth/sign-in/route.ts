import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import prisma from '@/lib/prisma';

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return hash === key;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอกอีเมลและรหัสผ่าน' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!prisma?.user) {
      return NextResponse.json(
        { error: 'Database connection not initialized' },
        { status: 500 }
      );
    }

    // Find User and Account
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: { accounts: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้งานด้วยอีเมลนี้ หรืออีเมลไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    const credentialAccount = user.accounts.find(
      (a: any) => a.providerId === 'credential' || a.password
    );

    if (!credentialAccount || !credentialAccount.password) {
      return NextResponse.json(
        { error: 'บัญชีนี้ยังไม่ได้ตั้งรหัสผ่าน' },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, credentialAccount.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง' },
        { status: 401 }
      );
    }

    // Create session
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await prisma.session.create({
      data: {
        token: sessionToken,
        userId: user.id,
        expiresAt,
      },
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    // Set cookie
    response.cookies.set('followup_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    });

    return response;
  } catch (error: any) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: error?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' },
      { status: 500 }
    );
  }
}

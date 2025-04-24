// lib/auth.ts
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export const getUserIdFromSession = async () => {
  const session = await getServerSession({ res: undefined, ...authOptions });
  return session?.user?.id || null;
};

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  
  const userData = cookieStore.get('user_data');

  if (!userData) {
    cookieStore.delete('user_data')
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const token = JSON.parse(userData.value).access_token;

  if (!token) {
    cookieStore.delete('user_data')
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Verifique a validade do token aqui, se necessário

  if ( userData.value)
    try {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      const isExpired = payload.exp * 1000 < Date.now();
  
      if (isExpired) {
        cookieStore.delete('user_data'); // Deleta o cookie se o token estiver expirado
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch (error) {
      console.error('Invalid token', error);
      cookieStore.delete('user_data'); // Deleta o cookie se o token for inválido
      return NextResponse.redirect(new URL('/login', req.url));
    }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
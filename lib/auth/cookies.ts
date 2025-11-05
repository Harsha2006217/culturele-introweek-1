import { cookies } from 'next/headers'

export async function setAuthCookie(token: string) {
  const cookieStore = cookies()
  
  // Delete any existing auth cookie
  cookieStore.delete('auth_token')
  
  // Set the new auth cookie
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
}

export function getAuthCookie() {
  return cookies().get('auth_token')?.value
}

export function deleteAuthCookie() {
  cookies().delete('auth_token')
}
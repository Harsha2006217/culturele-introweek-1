import { cookies } from 'next/headers'

export async function serverLogin(email: string, password: string) {
  'use server'
  
  const { loginUser } = await import('@/lib/auth/auth')
  const result = await loginUser(email, password)
  
  if (!result) {
    throw new Error('Invalid email or password')
  }
  
  // Set the session cookie
  cookies().set({
    name: 'auth_token',
    value: result.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
  
  return result.user
}
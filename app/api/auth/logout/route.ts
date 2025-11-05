import { NextResponse } from 'next/server'
import { logoutUser } from '@/lib/auth/auth'

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie')
    const token = cookieHeader?.split(';')
      .find(c => c.trim().startsWith('auth_token='))
      ?.split('=')?.[1]
    
    if (token) {
      await logoutUser(token)
    }
    
    const response = NextResponse.json({ success: true })
    
    // Clear the auth cookie
    response.cookies.set({
      name: 'auth_token',
      value: '',
      expires: new Date(0),
      path: '/'
    })
    
    return response
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'An error occurred during logout' }),
      { status: 500 }
    )
  }
}
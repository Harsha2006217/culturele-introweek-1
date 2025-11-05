import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { loginUser } from '@/lib/auth/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const result = await loginUser(email, password)
    
    if (!result) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401 }
      )
    }

    const response = NextResponse.json({ user: result.user })
    
    // Set the auth cookie
    response.cookies.set({
      name: 'auth_token',
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    
    return response
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'An error occurred' }),
      { status: 500 }
    )
  }
}
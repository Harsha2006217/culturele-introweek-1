import { NextResponse } from 'next/server'
import { createUser } from '@/lib/auth/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    // Add any validation here
    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400 }
      )
    }
    
    if (password.length < 8) {
      return new NextResponse(
        JSON.stringify({ error: 'Password must be at least 8 characters long' }),
        { status: 400 }
      )
    }
    
    const user = await createUser(email, password)
    
    return NextResponse.json({ user })
  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === '23505') {
      return new NextResponse(
        JSON.stringify({ error: 'Email already exists' }),
        { status: 400 }
      )
    }
    
    return new NextResponse(
      JSON.stringify({ error: 'An error occurred during registration' }),
      { status: 500 }
    )
  }
}
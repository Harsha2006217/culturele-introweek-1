import { query } from '@/lib/db/client'
import { sendResetPasswordEmail } from '@/lib/emails'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

// Function to create a password reset token
async function createPasswordResetToken(userId: number, expiresIn: number = 3600000) {
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + expiresIn)

  await query(
    `INSERT INTO password_reset_tokens (user_id, token, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, token, expiresAt]
  )

  return token
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Find user with the provided email
    const result = await query(
      'SELECT id, email FROM users WHERE email = $1',
      [email]
    )
    
    const user = result.rows[0]
    if (!user) {
      // Don't reveal whether a user exists or not
      return NextResponse.json({ 
        success: true,
        message: 'If this email exists, you will receive a password reset link'
      })
    }

    // Create a password reset token
    const token = await createPasswordResetToken(user.id)

    // Send password reset email
    await sendResetPasswordEmail(email, token)

    return NextResponse.json({ 
      success: true,
      message: 'If this email exists, you will receive a password reset link'
    })
  } catch (error) {
    console.error('[Password reset error]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
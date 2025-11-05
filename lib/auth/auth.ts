import { query, queryRow } from '../db/client'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export interface User {
  id: number
  email: string
  created_at: Date
}

export interface Session {
  id: number
  user_id: number
  token: string
  expires_at: Date
}

export async function createUser(email: string, password: string): Promise<User> {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  
  const result = await query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
    [email, passwordHash]
  )
  
  return result.rows[0]
}

export async function loginUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  const user = await queryRow<User & { password_hash: string }>(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )
  
  if (!user) return null
  
  const validPassword = await bcrypt.compare(password, user.password_hash)
  if (!validPassword) return null
  
  // Create a new session
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // Session expires in 7 days
  
  await query(
    'INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)',
    [user.id, token, expiresAt]
  )
  
  const { password_hash, ...userWithoutPassword } = user
  return { user: userWithoutPassword, token }
}

export async function getUserByToken(token: string): Promise<User | null> {
  return queryRow<User>(
    `SELECT users.* FROM users 
     JOIN sessions ON users.id = sessions.user_id 
     WHERE sessions.token = $1 AND sessions.expires_at > NOW()`,
    [token]
  )
}

export async function logoutUser(token: string): Promise<void> {
  await query('DELETE FROM sessions WHERE token = $1', [token])
}

export async function getUser(userId: number): Promise<User | null> {
  return queryRow<User>('SELECT * FROM users WHERE id = $1', [userId])
}
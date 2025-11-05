import { Pool } from 'pg'

let pool: Pool | null = null

export function createClient() {
  if (pool) return pool

  const connectionString = process.env.DATABASE_URL
  
  if (!connectionString) {
    throw new Error(
      "Database configuration missing. Please add DATABASE_URL to your environment variables."
    )
  }

  pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined
  })

  return pool
}

export async function query(text: string, params?: any[]) {
  const client = await createClient().connect()
  try {
    return await client.query(text, params)
  } finally {
    client.release()
  }
}

// Helper function for single-row queries
export async function queryRow<T = any>(text: string, params?: any[]): Promise<T | null> {
  const result = await query(text, params)
  return result.rows[0] || null
}

// Helper function for multiple-row queries
export async function queryRows<T = any>(text: string, params?: any[]): Promise<T[]> {
  const result = await query(text, params)
  return result.rows
}
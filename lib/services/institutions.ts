import { query, queryRow } from '../db/client'
import type { ProgramDuration } from '@/lib/types'

export interface Institution {
  id: number
  name: string
  general_email: string
  contact_person: string
  email: string
  logo_url: string | null
  postal_address: string
  visit_address: string
  description: string
  activity_description: string
  capacity_per_slot: number
  program_duration: ProgramDuration
  comments: string | null
  edit_token: string
  created_at: Date
  updated_at?: Date
}

// Ensure program_duration is a valid duration type
function validateProgramDuration(duration: number): duration is ProgramDuration {
  return [60, 75, 90].includes(duration)
}

export async function getInstitutionByToken(token: string): Promise<Institution | null> {
  return queryRow<Institution>(
    'SELECT * FROM institutions WHERE edit_token = $1',
    [token]
  )
}

export async function getInstitutionAvailability(institutionId: number) {
  const result = await query(
    'SELECT * FROM institution_availability WHERE institution_id = $1',
    [institutionId]
  )
  return result.rows
}

export async function updateInstitution(id: number, data: Partial<Institution>): Promise<void> {
  const fields = Object.keys(data)
    .filter(key => key !== 'id' && key !== 'created_at')
    .map((key, i) => `${key} = $${i + 2}`)
    .join(', ')

  const values = Object.values(data)
    .filter((_, i) => {
      const key = Object.keys(data)[i]
      return key !== 'id' && key !== 'created_at'
    })

  // Validate program_duration if it's being updated
  if (data.program_duration !== undefined) {
    const duration = parseInt(data.program_duration.toString())
    if (!validateProgramDuration(duration)) {
      throw new Error('Invalid program duration')
    }
    data.program_duration = duration
  }

  await query(
    `UPDATE institutions SET ${fields} WHERE id = $1`,
    [id, ...values]
  )
}

export async function deleteInstitutionAvailability(institutionId: number): Promise<void> {
  await query(
    'DELETE FROM institution_availability WHERE institution_id = $1',
    [institutionId]
  )
}

export async function createInstitution(data: Omit<Institution, 'id' | 'created_at'>): Promise<Institution> {
  // Validate program duration
  const duration = parseInt(data.program_duration.toString())
  if (!validateProgramDuration(duration)) {
    throw new Error('Invalid program duration')
  }

  const result = await queryRow<Institution>(
    `INSERT INTO institutions (
      name, general_email, contact_person, email, logo_url, 
      postal_address, visit_address, description, activity_description,
      capacity_per_slot, program_duration, comments, edit_token
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
    ) RETURNING *`,
    [
      data.name,
      data.general_email,
      data.contact_person,
      data.email,
      data.logo_url,
      data.postal_address,
      data.visit_address,
      data.description,
      data.activity_description,
      data.capacity_per_slot,
      duration,
      data.comments,
      data.edit_token
    ]
  )

  if (!result) {
    throw new Error('Failed to create institution')
  }

  return result
}

export async function createInstitutionAvailability(records: Array<{
  institution_id: number
  date: string
  start_time: string
  end_time: string
  is_available: boolean
}>) {
  const values = records.map((_, i) => 
    `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5})`
  ).join(', ')

  const params = records.flatMap(record => [
    record.institution_id,
    record.date,
    record.start_time,
    record.end_time,
    record.is_available
  ])

  await query(
    `INSERT INTO institution_availability 
     (institution_id, date, start_time, end_time, is_available)
     VALUES ${values}`,
    params
  )
}
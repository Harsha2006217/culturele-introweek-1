import { query, queryRow } from '../db/client'

export interface SiteContent {
  id: number
  content_key: string
  content: string
  section: string
  updated_by: number | null
  updated_at: Date
  created_at: Date
}

export async function getAllContent() {
  const result = await query<SiteContent>(
    'SELECT * FROM site_content ORDER BY section ASC',
    []
  )
  return result.rows
}

export async function updateContent(id: number, content: string, userId: number) {
  const result = await queryRow<SiteContent>(
    'UPDATE site_content SET content = $1, updated_by = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
    [content, userId, id]
  )
  return result
}

export async function getContentByKey(key: string) {
  return queryRow<SiteContent>(
    'SELECT * FROM site_content WHERE content_key = $1',
    [key]
  )
}

export async function createContent(data: {
  content_key: string
  content: string
  section: string
  updated_by: number | null
}) {
  return queryRow<SiteContent>(
    'INSERT INTO site_content (content_key, content, section, updated_by) VALUES ($1, $2, $3, $4) RETURNING *',
    [data.content_key, data.content, data.section, data.updated_by]
  )
}
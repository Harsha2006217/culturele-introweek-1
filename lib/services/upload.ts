import { writeFile } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/logos')

export async function uploadLogo(file: Buffer, filename: string): Promise<string> {
  // Ensure filename is safe
  const safeName = filename.replace(/[^a-z0-9.-]/gi, '_')
  const fullPath = path.join(UPLOAD_DIR, safeName)
  
  // Write the file
  await writeFile(fullPath, file)
  
  // Return the public URL
  return `/uploads/logos/${safeName}`
}
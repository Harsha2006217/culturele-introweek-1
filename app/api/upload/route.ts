import { NextResponse } from 'next/server'
import { uploadLogo } from '@/lib/services/upload'

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const file = data.get('file') as File
    const editToken = data.get('editToken') as string
    
    if (!file || !editToken) {
      return new NextResponse(
        JSON.stringify({ error: 'File and editToken are required' }),
        { status: 400 }
      )
    }
    
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${editToken}.${file.name.split('.').pop()}`
    
    const publicUrl = await uploadLogo(buffer, filename)
    
    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error('[Upload error]:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Upload failed' }),
      { status: 500 }
    )
  }
}
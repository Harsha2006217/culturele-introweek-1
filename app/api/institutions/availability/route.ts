import { NextResponse } from 'next/server'
import { createInstitutionAvailability } from '@/lib/services/institutions'

export async function POST(request: Request) {
  try {
    const records = await request.json()
    
    if (!Array.isArray(records) || records.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid availability records' }),
        { status: 400 }
      )
    }
    
    await createInstitutionAvailability(records)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Availability creation error]:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Failed to create availability records' }),
      { status: 500 }
    )
  }
}
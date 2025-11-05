import { NextResponse } from 'next/server'
import { getInstitutionByToken, deleteInstitutionAvailability, createInstitutionAvailability } from '@/lib/services/institutions'

export async function POST(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token
    const availabilityRecords = await request.json()
    
    const institution = await getInstitutionByToken(token)
    if (!institution) {
      return new NextResponse(
        JSON.stringify({ error: 'Institution not found' }),
        { status: 404 }
      )
    }
    
    // Delete old availability
    await deleteInstitutionAvailability(institution.id)
    
    // Create new availability records
    if (availabilityRecords.length > 0) {
      await createInstitutionAvailability(availabilityRecords)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Availability update error]:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Failed to update availability' }),
      { status: 500 }
    )
  }
}
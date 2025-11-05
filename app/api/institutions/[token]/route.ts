import { NextResponse } from 'next/server'
import { getInstitutionByToken, getInstitutionAvailability, updateInstitution } from '@/lib/services/institutions'
import type { ProgramDuration } from '@/lib/types'

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const token = params.token
  try {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Token is required' }),
        { status: 400 }
      )
    }
    
    const institution = await getInstitutionByToken(token)
    if (!institution) {
      return new NextResponse(
        JSON.stringify({ error: 'Institution not found' }),
        { status: 404 }
      )
    }
    
    const availability = await getInstitutionAvailability(institution.id)
    
    return NextResponse.json({
      institution,
      availability
    })
  } catch (error) {
    console.error('[Institution fetch error]:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch institution' }),
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { token: string } }
) {
  const token = params.token
  try {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Token is required' }),
        { status: 400 }
      )
    }

    const institution = await getInstitutionByToken(token)
    if (!institution) {
      return new NextResponse(
        JSON.stringify({ error: 'Institution not found' }),
        { status: 404 }
      )
    }

    const data = await request.json()

    // Validate program duration
    if (data.program_duration !== undefined) {
      const duration = parseInt(data.program_duration)
      if (![60, 75, 90].includes(duration)) {
        return new NextResponse(
          JSON.stringify({ error: 'Invalid program duration' }),
          { status: 400 }
        )
      }
      data.program_duration = duration as ProgramDuration
    }

    await updateInstitution(institution.id, data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Institution update error]:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Failed to update institution' }),
      { status: 500 }
    )
  }
}
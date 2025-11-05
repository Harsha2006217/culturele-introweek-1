import { NextResponse } from 'next/server'
import { createInstitution } from '@/lib/services/institutions'
import type { ProgramDuration } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Basic validation
    if (!data.name || !data.email) {
      return new NextResponse(
        JSON.stringify({ error: 'Required fields are missing' }),
        { status: 400 }
      )
    }
    
    // Validate program duration
    const duration = parseInt(data.program_duration)
    if (![60, 75, 90].includes(duration)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid program duration' }),
        { status: 400 }
      )
    }
    
    const institution = await createInstitution({
      name: data.name,
      general_email: data.general_email,
      contact_person: data.contact_person,
      email: data.email,
      logo_url: data.logo_url,
      postal_address: data.postal_address,
      visit_address: data.visit_address,
      description: data.description,
      activity_description: data.activity_description,
      capacity_per_slot: data.capacity_per_slot,
      program_duration: data.program_duration as ProgramDuration,
      comments: data.comments,
      edit_token: data.edit_token,
    })
    
    return NextResponse.json(institution)
  } catch (error) {
    console.error('[Institution creation error]:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Failed to create institution' }),
      { status: 500 }
    )
  }
}
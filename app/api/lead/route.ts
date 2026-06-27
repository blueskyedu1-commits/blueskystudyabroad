import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const lead = {
    student_name:           formData.get('student_name')           as string,
    email:                  formData.get('email')                  as string,
    phone:                  formData.get('phone')                  as string | undefined,
    destination_preference: formData.get('destination_preference') as string | undefined,
    course_interest:        formData.get('course_interest')        as string | undefined,
  }

  if (!lead.student_name || !lead.email) {
    return NextResponse.redirect(new URL('/?error=missing_fields', request.url))
  }

  await supabase.from('leads').insert(lead)

  return NextResponse.redirect(new URL('/?success=true#contact', request.url))
}

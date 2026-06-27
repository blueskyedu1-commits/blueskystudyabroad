import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types matching the database schema
export type UniversityStatus = 'partner' | 'verified'
export type ProgrammeLevel = 'foundation' | 'bachelor' | 'master' | 'mba' | 'phd' | 'diploma'

export interface University {
  id: string
  name: string
  country: string
  city: string
  status: UniversityStatus
  logo_url?: string
  world_ranking?: number
  website?: string
  last_verified?: string
  created_at: string
}

export interface Programme {
  id: string
  university_id: string
  university?: University
  name: string
  level: ProgrammeLevel
  field_of_study: string
  duration?: string
  tuition_fee_amount?: number
  tuition_fee_currency: string
  tuition_fee_per: string
  entry_requirements?: string
  ielts_score?: number
  toefl_score?: number
  intake_dates?: string[]
  application_deadline?: string
  application_fee?: number
  scholarship: boolean
  scholarship_type?: string
  programme_link?: string
  gap_year_accepted: string
  last_verified?: string
  verified_source?: string
  created_at: string
}

export interface Lead {
  id?: string
  student_name: string
  phone?: string
  email: string
  course_interest?: string
  university_interest?: string
  grades?: string
  test_scores?: string
  budget_range?: string
  destination_preference?: string
  status?: string
  created_at?: string
}

export type College =
  | "Hout en Meubileringscollege"
  | "Mediacollege"
  | "MBO College Amstelland"
  | "MBO College Airport"
  | "MBO College Almere"
  | "MBO College Almere Poort"
  | "MBO College Centrum"
  | "MBO College Hilversum"
  | "MBO College Lelystad"
  | "MBO College Noord"
  | "MBO College West"
  | "MBO College Westpoort"
  | "MBO College Zuid"
  | "MBO College Zuidoost"

export type StudentCount = "<20" | "<25" | "<30"

export type ClassYear = 1 | 2 | 3 | 4

export type ProgramDuration = 60 | 75 | 90

export interface Institution {
  id: string
  name: string
  contact_person: string
  email: string
  logo_url: string | null
  visit_address: string
  description: string
  activity_description: string
  capacity_per_slot: number
  program_duration: ProgramDuration
  comments: string | null
  edit_token: string
  created_at: string
  updated_at: string
}

export interface InstitutionAvailability {
  id: string
  institution_id: string
  date: string
  start_time: string
  end_time: string
  is_available: boolean
  created_at: string
}

export interface Teacher {
  id: string
  name: string
  function: string
  college: College
  program: string
  address: string
  email: string
  edit_token: string
  created_at: string
  updated_at: string
}

export interface Class {
  id: string
  teacher_id: string
  class_name: string
  student_count: StudentCount
  year: ClassYear
  participated_before: boolean
  previous_visits: string | null
  preferred_day: string | null
  preferred_time_slot: string | null
  activity_count: 1 | 2
  created_at: string
}

export interface Planning {
  id: string
  class_id: string
  institution_id: string
  visit_date: string
  start_time: string
  end_time: string
  activity_order: 1 | 2
  status: "pending" | "confirmed" | "cancelled"
  created_at: string
  updated_at: string
}

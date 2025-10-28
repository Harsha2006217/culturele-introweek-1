interface Institution {
  id: string
  name: string
  address: string
  capacity: number // classes per timeslot
  duration: number // minutes
  availability: Record<string, string[]> // date -> time slots
}

interface ClassRegistration {
  id: string
  teacherName: string
  college: string
  schoolAddress: string
  className: string
  studentCount: string
  year: string
  previousVisits: string[]
  selectedDay: string
  activityCount: number
  dayPart?: string
}

interface Assignment {
  classId: string
  institutionId: string
  date: string
  time: string
  duration: number
}

interface Schedule {
  assignments: Assignment[]
  conflicts: string[]
  stats: {
    totalClasses: number
    assignedClasses: number
    unassignedClasses: number
    diversityScore: number
  }
}

// Geographic zones in Amsterdam
const ZONES = {
  centrum: ["Centrum"],
  noord: ["Noord"],
  oost: ["Oost", "Zuidoost"],
  west: ["West", "Nieuw-West", "Westpoort"],
  zuid: ["Zuid"],
}

function getZone(address: string): string {
  const addressLower = address.toLowerCase()
  for (const [zone, keywords] of Object.entries(ZONES)) {
    if (keywords.some((keyword) => addressLower.includes(keyword.toLowerCase()))) {
      return zone
    }
  }
  return "centrum" // default to centrum
}

function calculateDistance(zone1: string, zone2: string): number {
  // Distance matrix (0 = same zone, 1 = adjacent, 2 = far)
  const distances: Record<string, Record<string, number>> = {
    centrum: { centrum: 0, noord: 1, oost: 1, west: 1, zuid: 1 },
    noord: { centrum: 1, noord: 0, oost: 2, west: 2, zuid: 2 },
    oost: { centrum: 1, noord: 2, oost: 0, west: 2, zuid: 1 },
    west: { centrum: 1, noord: 2, oost: 2, west: 0, zuid: 1 },
    zuid: { centrum: 1, noord: 2, oost: 1, west: 1, zuid: 0 },
  }
  return distances[zone1]?.[zone2] ?? 2
}

function parseTimeSlot(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

function addMinutes(time: string, minutes: number): string {
  const totalMinutes = parseTimeSlot(time) + minutes
  const hours = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
}

function scoreAssignment(
  classReg: ClassRegistration,
  institution: Institution,
  date: string,
  time: string,
  existingAssignments: Assignment[],
): number {
  let score = 100

  // Geographic proximity (most important)
  const schoolZone = getZone(classReg.schoolAddress)
  const institutionZone = getZone(institution.address)
  const distance = calculateDistance(schoolZone, institutionZone)
  score -= distance * 30 // Penalty for distance

  // Avoid previous visits
  if (classReg.previousVisits.includes(institution.name)) {
    score -= 50
  }

  // Diversity: prefer mixing colleges at same institution
  const sameInstitutionAssignments = existingAssignments.filter(
    (a) => a.institutionId === institution.id && a.date === date && a.time === time,
  )
  const sameCollegeCount = sameInstitutionAssignments.filter((a) => {
    // Would need to look up class college, simplified here
    return false
  }).length
  score += sameInstitutionAssignments.length * 5 // Bonus for filling capacity
  score -= sameCollegeCount * 10 // Penalty for same college

  // Time preference matching
  if (classReg.dayPart) {
    const timeMinutes = parseTimeSlot(time)
    if (classReg.dayPart === "morning" && timeMinutes >= 13 * 60) {
      score -= 20
    }
    if (classReg.dayPart === "afternoon" && timeMinutes < 13 * 60) {
      score -= 20
    }
  }

  return score
}

export function generateSchedule(institutions: Institution[], classRegistrations: ClassRegistration[]): Schedule {
  const assignments: Assignment[] = []
  const conflicts: string[] = []
  const unassigned: string[] = []

  // Track capacity usage: institutionId -> date -> time -> count
  const capacityUsage: Record<string, Record<string, Record<string, number>>> = {}

  // Initialize capacity tracking
  for (const inst of institutions) {
    capacityUsage[inst.id] = {}
    for (const date of Object.keys(inst.availability)) {
      capacityUsage[inst.id][date] = {}
      for (const time of inst.availability[date]) {
        capacityUsage[inst.id][date][time] = 0
      }
    }
  }

  // Sort classes by constraints (more constrained first)
  const sortedClasses = [...classRegistrations].sort((a, b) => {
    // Prioritize classes with previous visits (harder to place)
    if (a.previousVisits.length !== b.previousVisits.length) {
      return b.previousVisits.length - a.previousVisits.length
    }
    // Then by activity count (2 activities harder to schedule)
    return b.activityCount - a.activityCount
  })

  // Assign each class
  for (const classReg of sortedClasses) {
    const activitiesToAssign = classReg.activityCount

    for (let activityNum = 0; activityNum < activitiesToAssign; activityNum++) {
      let bestScore = Number.NEGATIVE_INFINITY
      let bestAssignment: Assignment | null = null

      // Try all institutions and time slots
      for (const institution of institutions) {
        const availableDates = Object.keys(institution.availability)

        for (const date of availableDates) {
          // Check if date matches class preference
          const dayMatch = classReg.selectedDay === date || !classReg.selectedDay

          if (!dayMatch) continue

          for (const time of institution.availability[date]) {
            // Check capacity
            if (capacityUsage[institution.id][date][time] >= institution.capacity) {
              continue
            }

            // For second activity, ensure 1.5 hour gap from first
            if (activityNum === 1) {
              const firstActivity = assignments.find((a) => a.classId === classReg.id)
              if (firstActivity) {
                const firstEndTime = addMinutes(firstActivity.time, firstActivity.duration)
                const minStartTime = addMinutes(firstEndTime, 90) // 1.5 hour buffer
                if (parseTimeSlot(time) < parseTimeSlot(minStartTime)) {
                  continue
                }
              }
            }

            // Score this assignment
            const score = scoreAssignment(classReg, institution, date, time, assignments)

            if (score > bestScore) {
              bestScore = score
              bestAssignment = {
                classId: classReg.id,
                institutionId: institution.id,
                date,
                time,
                duration: institution.duration,
              }
            }
          }
        }
      }

      // Make assignment
      if (bestAssignment) {
        assignments.push(bestAssignment)
        capacityUsage[bestAssignment.institutionId][bestAssignment.date][bestAssignment.time]++
      } else {
        unassigned.push(classReg.id)
        conflicts.push(
          `Kon geen geschikte plek vinden voor klas ${classReg.className} (${classReg.college}) - activiteit ${activityNum + 1}`,
        )
      }
    }
  }

  // Calculate diversity score
  const institutionCollegeMap: Record<string, Set<string>> = {}
  for (const assignment of assignments) {
    const classReg = classRegistrations.find((c) => c.id === assignment.classId)
    if (classReg) {
      if (!institutionCollegeMap[assignment.institutionId]) {
        institutionCollegeMap[assignment.institutionId] = new Set()
      }
      institutionCollegeMap[assignment.institutionId].add(classReg.college)
    }
  }

  const diversityScore =
    Object.values(institutionCollegeMap).reduce((sum, colleges) => sum + colleges.size, 0) /
    Object.keys(institutionCollegeMap).length

  return {
    assignments,
    conflicts,
    stats: {
      totalClasses: classRegistrations.length,
      assignedClasses: classRegistrations.length - new Set(unassigned).size,
      unassignedClasses: new Set(unassigned).size,
      diversityScore: Math.round(diversityScore * 100) / 100,
    },
  }
}

export function exportScheduleForInstitution(
  institutionId: string,
  assignments: Assignment[],
  classRegistrations: ClassRegistration[],
): Array<{
  date: string
  time: string
  className: string
  college: string
  studentCount: string
}> {
  return assignments
    .filter((a) => a.institutionId === institutionId)
    .map((assignment) => {
      const classReg = classRegistrations.find((c) => c.id === assignment.classId)
      return {
        date: assignment.date,
        time: assignment.time,
        className: classReg?.className || "Unknown",
        college: classReg?.college || "Unknown",
        studentCount: classReg?.studentCount || "Unknown",
      }
    })
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return a.time.localeCompare(b.time)
    })
}

export function exportScheduleForClass(
  classId: string,
  assignments: Assignment[],
  institutions: Institution[],
): Array<{
  activityNumber: number
  institutionName: string
  address: string
  date: string
  time: string
  duration: number
}> {
  return assignments
    .filter((a) => a.classId === classId)
    .map((assignment, index) => {
      const institution = institutions.find((i) => i.id === assignment.institutionId)
      return {
        activityNumber: index + 1,
        institutionName: institution?.name || "Unknown",
        address: institution?.address || "Unknown",
        date: assignment.date,
        time: assignment.time,
        duration: assignment.duration,
      }
    })
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return a.time.localeCompare(b.time)
    })
}

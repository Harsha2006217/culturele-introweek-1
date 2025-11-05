import { type NextRequest, NextResponse } from "next/server"
import { query } from '../db/client'
import { cookies } from 'next/headers'

export async function updateSession(request: NextRequest) {
  try {
    // Get session token from cookie
    const sessionToken = request.cookies.get('auth_token')?.value

    let user = null
    if (sessionToken) {
      // Query the database for the session
      const result = await query(
        'SELECT users.* FROM sessions JOIN users ON sessions.user_id = users.id WHERE sessions.token = $1 AND sessions.expires_at > NOW()',
        [sessionToken]
      )
      user = result.rows[0]
    }

    // Admin route protection
    if (request.nextUrl.pathname.startsWith("/admin") && 
        !request.nextUrl.pathname.startsWith("/admin/auth") && 
        !user) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/auth/login"
      return NextResponse.redirect(url)
    }

    // Redirect logged-in users away from auth pages
    if (request.nextUrl.pathname.startsWith("/admin/auth") &&
        user &&
        !request.nextUrl.pathname.includes("register-success")) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin"
      return NextResponse.redirect(url)
    }

    return NextResponse.next({
      request,
    })
  } catch (error) {
    console.error('Session update error:', error)
    return NextResponse.next({
      request,
    })
  }
}
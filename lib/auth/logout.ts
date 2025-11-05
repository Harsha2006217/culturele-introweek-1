'use client'

export async function logout() {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Logout failed')
    }

    // Refresh the page to clear the client-side state
    window.location.href = '/admin/auth/login'
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export const getAllEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`)
    return await response.json()
  } catch (err) {
    console.error('Failed to fetch events:', err)
    return []
  }
}

export const getEventsByLocation = async (locationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events?locationId=${locationId}`)
    return await response.json()
  } catch (err) {
    console.error(`Failed to fetch events for location ${locationId}:`, err)
    return []
  }
}
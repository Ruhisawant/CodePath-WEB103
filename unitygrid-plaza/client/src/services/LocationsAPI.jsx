const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export const getAllLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`)
    return await response.json()
  } catch (err) {
    console.error('Failed to fetch locations:', err)
    return []
  }
}

export const getLocationById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`)
    return await response.json()
  } catch (err) {
    console.error(`Failed to fetch location with ID ${id}:`, err)
    return null
  }
}
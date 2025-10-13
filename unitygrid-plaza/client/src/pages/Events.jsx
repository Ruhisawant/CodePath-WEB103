import React, { useState, useEffect } from 'react'
import { getAllEvents } from '../services/EventsAPI'
import '../css/Events.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('all')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents()
        if (Array.isArray(data)) {
          setEvents(data)
          setFilteredEvents(data)
        } else {
          console.error('Expected array but received:', data)
          setEvents([])
          setFilteredEvents([])
        }
      } catch (error) {
        console.error('Error fetching events:', error)
        setEvents([])
        setFilteredEvents([])
      }
    }
    fetchEvents()
  }, [])

  // Filter events by location
  const handleLocationFilter = (location) => {
    setSelectedLocation(location)
    if (location === 'all') {
      setFilteredEvents(events)
    } else {
      const filtered = events.filter(event => event.location === location)
      setFilteredEvents(filtered)
    }
  }

  // Get unique locations from events
  const locations = Array.isArray(events) ? [...new Set(events.map(event => event.location))] : []

  // Calculate time remaining until event
  const getTimeRemaining = (eventDate) => {
    const now = new Date()
    const event = new Date(eventDate)
    const diff = event - now
    
    if (diff < 0) {
      return 'Event has passed'
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} remaining`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} remaining`
    } else {
      return 'Starting soon!'
    }
  }

  // Check if event has passed
  const hasEventPassed = (eventDate) => {
    const now = new Date()
    const event = new Date(eventDate)
    return event < now
  }

  return (
    <div className='events-page'>
      <h2>All Events</h2>
      
      {/* Location filter */}
      <div className='location-filter'>
        <label htmlFor='location-select'>Filter by location: </label>
        <select 
          id='location-select'
          value={selectedLocation} 
          onChange={(e) => handleLocationFilter(e.target.value)}
        >
          <option value='all'>All Locations</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Events list */}
      <div className='events-list'>
        {filteredEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          filteredEvents.map((event) => {
            const isPast = hasEventPassed(event.date)
            return (
              <div 
                key={event.id} 
                className={`event-card ${isPast ? 'past-event' : ''}`}
              >
                <h3>{event.title}</h3>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {event.time}</p>
                {event.description && <p>{event.description}</p>}
                <p className='countdown'>
                  {getTimeRemaining(event.date)}
                </p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Events
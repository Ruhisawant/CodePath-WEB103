import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getLocationById } from '../services/LocationsAPI'
import { getEventsByLocation } from '../services/EventsAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const LocationEvents = () => {
	const { id } = useParams()
	const [location, setLocation] = useState(null)
	const [events, setEvents] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const locationData = await getLocationById(id)
				setLocation(locationData)

				const eventsData = await getEventsByLocation(id)
				setEvents(eventsData)
			} catch (error) {
				console.error('Error loading location events page:', error)
			}
		}
		fetchData()
	}, [id])

	if (!location) {
		return <div className="location-events"><h2>Loading...</h2></div>
	}

	return (
		<div className='location-events'>
			<header>
				<div className='location-image'>
					{location.image ? (
						<img src={location.image} alt={location.name} />
					) : (
						<div className='placeholder-img'>No image</div>
					)}
				</div>

				<div className='location-info'>
					<h2>{location.name}</h2>
					<p>{location.address}</p>
				</div>
			</header>

			<main>
				{events && events.length > 0 ? (
					events.map(event => (
						<Event
							key={event.id}
							id={event.id}
							title={event.title}
							date={event.date}
							time={event.time}
							image={event.image}
							description={event.description}
						/>
					))
				) : (
					<h2>
						<i className="fa-regular fa-calendar-xmark fa-shake"></i>{' '}
						No events scheduled at this location yet!
					</h2>
				)}
			</main>
		</div>
	)
}

export default LocationEvents
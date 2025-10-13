import React from 'react'
import '../css/Event.css'

const Event = (props) => {
	const { title, date, time, image, description } = props

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

	const isPast = hasEventPassed(date)
	const remaining = getTimeRemaining(date)

	return (
		<article className={`event-information ${isPast ? 'past-event' : ''}`}>
			{image ? (
				<img src={image} alt={title} />
			) : (
				<div className="placeholder-image">No Image</div>
			)}

			<div className='event-information-overlay'>
				<div className='text'>
					<h3>{title}</h3>
					<p><i className="fa-regular fa-calendar fa-bounce"></i> {new Date(date).toLocaleDateString()} <br /> {time}</p>
					{description && <p>{description}</p>}
					<p className={`countdown ${isPast ? 'negative-time-remaining' : ''}`}>
						{remaining}
					</p>
				</div>
			</div>
		</article>
	)
}

export default Event
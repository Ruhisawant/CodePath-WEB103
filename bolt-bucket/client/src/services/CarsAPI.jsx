const baseUrl = '/api/cars'

async function handle(res) {
	if (!res.ok) {
		let msg = 'Request failed'
		try {
			const data = await res.json()
			msg = data.error || msg
		} catch (_) {}
		throw new Error(msg)
	}
	return res.json()
}

export async function getAllCars() {
	const res = await fetch(baseUrl)
	return handle(res)
}

export async function getCar(id) {
	const res = await fetch(`${baseUrl}/${id}`)
	return handle(res)
}

export async function createCar(payload) {
	const res = await fetch(baseUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	})
	return handle(res)
}

export async function updateCar(id, payload) {
	const res = await fetch(`${baseUrl}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	})
	return handle(res)
}

export async function deleteCar(id) {
	const res = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
	return handle(res)
}

export default { getAllCars, getCar, createCar, updateCar, deleteCar }

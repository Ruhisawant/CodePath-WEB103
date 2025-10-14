import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import { deleteCar, getCar } from '../services/CarsAPI'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const data = await getCar(id)
                setCar(data)
            } catch (e) {
                setError(e.message)
            }
        })()
    }, [id])

    async function onDelete() {
        if (!confirm('Delete this car?')) return
        try {
            await deleteCar(id)
            navigate('/customcars')
        } catch (e) {
            alert(e.message)
        }
    }

    if (error) return <p role="alert" style={{ color: 'crimson' }}>{error}</p>
    if (!car) return <p>Loading...</p>

    return (
        <div className="container">
            <h2>{car.model}</h2>
                <figure style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8, background: ({ Red: '#ffefef', Blue: '#eef3ff', Black: '#1e1e1e', 'Neon Green': '#e9ffe9' }[car.exterior_color]) || '#fafafa', color: car.exterior_color === 'Black' ? 'white' : 'inherit' }}>
                <img src="/lightning.png" alt="car" width={64} height={64} />
                <figcaption>
                    {car.exterior_color} / {car.wheels} / {car.interior} / {car.package}
                </figcaption>
            </figure>
            <p>Base: ${Number(car.base_price).toLocaleString()}</p>
            <p>Total: <strong>${Number(car.total_price).toLocaleString()}</strong></p>
            <div className="grid">
                <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                <button className="contrast" onClick={onDelete}>Delete</button>
                <button className="secondary" onClick={() => navigate('/customcars')}>Back</button>
            </div>
        </div>
    )
}

export default CarDetails
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { deleteCar, getAllCars } from '../services/CarsAPI'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function load() {
        setLoading(true)
        try {
            const data = await getAllCars()
            setCars(data)
            setError('')
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    async function onDelete(id) {
        if (!confirm('Delete this car?')) return
        try {
            await deleteCar(id)
            await load()
        } catch (e) {
            alert(e.message)
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p role="alert" style={{ color: 'crimson' }}>{error}</p>

    return (
        <div className="container">
            <h2>Custom Cars</h2>
            {cars.length === 0 && <p>No cars yet. <Link to="/">Create one</Link>.</p>}
            <div className="grid">
                {cars.map(car => (
                    <article key={car.id}>
                        <header>
                            <strong>{car.model}</strong>
                        </header>
                        <img src="/lightning.png" alt="car" width={48} height={48} />
                        <p>{car.exterior_color} / {car.wheels} / {car.interior} / {car.package}</p>
                        <p><strong>${Number(car.total_price).toLocaleString()}</strong></p>
                        <footer>
                            <div className="grid">
                                <button onClick={() => navigate(`/customcars/${car.id}`)}>View</button>
                                <button onClick={() => navigate(`/edit/${car.id}`)} className="secondary">Edit</button>
                                <button onClick={() => onDelete(car.id)} className="contrast">Delete</button>
                            </div>
                        </footer>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default ViewCars
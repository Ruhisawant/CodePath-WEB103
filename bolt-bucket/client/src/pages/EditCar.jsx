import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import { getCar, updateCar } from '../services/CarsAPI'
import { calcTotal, basePrices, optionPrices } from '../utilities/calcprice'
import { validateCombo } from '../utilities/validate'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const car = await getCar(id)
                setForm({
                    model: car.model,
                    exteriorColor: car.exterior_color,
                    wheels: car.wheels,
                    interior: car.interior,
                    package: car.package
                })
            } catch (e) {
                setError(e.message)
            }
        })()
    }, [id])

    const total = useMemo(() => form ? calcTotal(form) : 0, [form])
    const base = form ? (basePrices[form.model] ?? 0) : 0
        const colorMap = { Red: '#ffefef', Blue: '#eef3ff', Black: '#1e1e1e', 'Neon Green': '#e9ffe9' }

    function onChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    async function onSubmit(e) {
        e.preventDefault()
        if (!form) return
        const msg = validateCombo(form)
        if (msg) { setError(msg); return }
        try {
            await updateCar(id, { ...form, basePrice: base, totalPrice: total })
            navigate(`/customcars/${id}`)
        } catch (err) {
            setError(err.message)
        }
    }

    if (error) return <p role="alert" style={{ color: 'crimson' }}>{error}</p>
    if (!form) return <p>Loading...</p>

    return (
        <div className="container">
            <h2>Edit car</h2>
            <form onSubmit={onSubmit}>
                <div className="grid">
                    <label>
                        Model
                        <select name="model" value={form.model} onChange={onChange}>
                            {Object.keys(basePrices).map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </label>
                    <label>
                        Exterior Color
                        <select name="exteriorColor" value={form.exteriorColor} onChange={onChange}>
                            {Object.keys(optionPrices.exteriorColor).map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </label>
                    <label>
                        Wheels
                        <select name="wheels" value={form.wheels} onChange={onChange}>
                            {Object.keys(optionPrices.wheels).map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </label>
                    <label>
                        Interior
                        <select name="interior" value={form.interior} onChange={onChange}>
                            {Object.keys(optionPrices.interior).map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </label>
                    <label>
                        Package
                        <select name="package" value={form.package} onChange={onChange}>
                            {Object.keys(optionPrices.package).map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </label>
                </div>
                <div style={{ marginTop: 12 }}>
                    <strong>Base:</strong> ${base.toLocaleString()} | <strong>Total:</strong> ${total.toLocaleString()}
                </div>
                        <div style={{ marginTop: 12 }}>
                            <figure style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8, background: colorMap[form.exteriorColor] || '#fafafa', color: form.exteriorColor === 'Black' ? 'white' : 'inherit' }}>
                        <img src="/lightning.png" alt="car" width={64} height={64} />
                        <figcaption>
                            {form.model} — {form.exteriorColor} / {form.wheels} / {form.interior} / {form.package}
                        </figcaption>
                    </figure>
                </div>
                <div className="grid">
                    <button type="submit">Save</button>
                    <button type="button" className="secondary" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditCar
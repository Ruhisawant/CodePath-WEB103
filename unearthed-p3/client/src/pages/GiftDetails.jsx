import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './GiftDetails.css'

const GiftDetails = ({ data }) => {
  const [gift, setGift] = useState({
    id: 0,
    name: "",
    pricepoint: "",
    audience: "",
    image: "",
    description: "",
    submittedby: "",
    submittedon: ""
  })

  const { id } = useParams()

  useEffect(() => {
    const fetchGiftById = async () => {
      try {
        const response = await fetch(`/gifts/${id}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch gift with id ${id}`)
        }
        const data = await response.json()
        setGift(data)
      } catch (error) {
        console.error("Error fetching gift:", error)
      }
    }

    fetchGiftById()
  }, [data, id])

  return (
    <div className="GiftDetails">
      <main id="gift-content" className="gift-info">
        <div className="image-container">
          <img id="image" src={gift.image} alt={gift.name} />
        </div>
        <div className="gift-details">
          <h2 id="name">{gift.name}</h2>
          <p id="submittedBy">{'Submitted By: ' + gift.submittedby}</p>
          <p id="pricePoint">{'Price: ' + gift.pricepoint}</p>
          <p id="audience">{'Great For: ' + gift.audience}</p>
          <p id="description">{gift.description}</p>
        </div>
      </main>
    </div>
  )
}

export default GiftDetails
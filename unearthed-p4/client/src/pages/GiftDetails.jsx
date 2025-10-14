import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../css/GiftDetails.css'

const GiftDetails = ({data}) => {
  const {id} = useParams();
  const [gift, setGift] = useState({id: 0, name: "", pricepoint: "", audience: "", image: "", description: "", submittedby: "", submittedon: ""})

  useEffect(() => {
    const result = data.filter(gift => gift.id === parseInt(id))[0];
    setGift({id: parseInt(result.id), name: result.name, pricepoint: result.pricepoint, audience: result.audience, image: result.image, description: result.description, submittedby: result.submittedby, total_cost: result.submittedon.slice(0,10)});
  }, [data, id]);

  return (
    <div className="GiftDetails">
      <main id="gift-content" className="gift-info">
        <div className="image-container">
          <img id="image" src={gift.image} />
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
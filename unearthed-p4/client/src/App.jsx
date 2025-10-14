import './css/App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom'
import Gifts from './pages/Gifts'
import GiftDetails from './pages/GiftDetails'
import PageNotFound from './pages/PageNotFound'
import CreateGift from './pages/CreateGift'
import EditGift from './pages/EditGift'

const App = () => {
  const [gifts, setGifts] = useState([]);
  
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
        const basePath = API_BASE ? API_BASE.replace(/\/$/, '') : '/api';
        const response = await fetch(`${basePath}/gifts`);
        if (!response.ok) {
          const text = await response.text().catch(() => '');
          throw new Error(`Failed to fetch gifts: ${response.status} ${response.statusText} ${text}`);
        }
        const json = await response.json();
        setGifts(json);
        return json;
      } catch (err) {
        console.error(err);
      }
    };

    fetchGifts();
  }, []);

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <Gifts data={gifts}/>
    },
    {
      path: "/gift/:id",
      element: <GiftDetails data={gifts} />
    },
    {
      path: '/new',
      element: <CreateGift />
    },
    {
      path: '/edit/:id',
      element: <EditGift data={gifts} />
    },
    {
      path: "/*",
      element: <PageNotFound />
    }
  ]);

  return ( 
    <div className="App">
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src="/logo.png"/>
            <h1>UnEarthed</h1>
          </div>
          <div className="header-right">
            <Link to="/"><button className="homeBtn">Home</button></Link>
            <Link to='/new'><button className='addBtn'>+ Add Gift</button></Link>
          </div>
        </div>
      </header>

      {element}
    </div>
  );
}

export default App;
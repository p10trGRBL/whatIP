import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Time from './Time.jsx';
import {Flag, Segment, Card} from 'semantic-ui-react';



function App() {

  //console.log(import.meta.env.VITE_IPKEY) 
const [yourIP, setYourIP] = useState('');
const [rawData, setRawData] = useState({});

useEffect(()=>{
  axios
  .get(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_IPKEY}`)
  .then((resp)=>{
    //console.log(resp) 
    setRawData(resp.data)
    setYourIP(resp.data.ip)
  
  })
   .catch((err)=>{
    console.error(err)
  })

}, [])
 //console.log(yourIP)
 //console.log(rawData)
let countryCode= '';
 if(!rawData.location) { countryCode = "Flag loading...";
} else { countryCode = rawData.location.country.toLowerCase()}

  return (
    <>
      
        <h2>Hello Stranger! </h2>
        <p>I've got some info about YOU:<img className="finger" src="finger-pointing.jpeg" alt="finger-pointing"></img> </p>
        <Segment className='mainContainer'> 
        <Card.Group itemsPerRow={3}>
          <Card color="blue" className='cards'>
           <Card.Content className='cardsContent'>
            <Card.Header> Here's your IP address:</Card.Header>
              <Card.Description className='cardDescription'>{(!yourIP)? "... loading":<span>{yourIP}</span>}</Card.Description>
            </Card.Content>
          </Card>
          <Card color="violet">
          <Card.Content className='cardsContent'>
              <Card.Header> Your local time:</Card.Header>
              <Time/>
            </Card.Content>
          </Card>
          <Card color="purple">
            <Card.Content className='cardsContent'>
              <Card.Header> Your location:</Card.Header>
              <Card.Description className='cardDescription'>{(!rawData.location)? "... loading": <span>{rawData.location.city}, {rawData.location.region} <Flag name={countryCode} /></span>}</Card.Description>
            </Card.Content>
          </Card>
        
       
           
        </Card.Group>
        {(!rawData.location)? <div><img className="meme" src="a-little-creepy.jpg" alt="creepy meme" /></div>: 
           <div className='map'>

         <MapContainer center={[`${rawData.location.lat}`, `${rawData.location.lng}`]} zoom={6} scrollWheelZoom={false} >
     <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
     <Marker position={[`${rawData.location.lat}`, `${rawData.location.lng}`]} >
       <Popup>
         Are you here?  
         <Flag name={countryCode} />
       </Popup>
      
     </Marker>
   </MapContainer>
   </div>
         
          }


    </Segment>

    </>
  )
}

export default App

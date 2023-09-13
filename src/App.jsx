import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Time from './Time.jsx';



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
    console.log(err)
  })

}, [])
//  console.log(yourIP)
//  console.log(rawData)

  return (
    <>
     
        <h2>Hello Stranger! </h2>
        <p>I've got some info about YOU:<img className="finger" src="finger-pointing.jpeg" alt="finger-pointing"></img> </p>
        
        <h4>Here's your IP address :</h4>
        {(!yourIP)? <p>Loading...</p>:<h2>{yourIP}</h2>}
        {(!rawData.location)? <div><img src="a-little-creepy.jpg" alt="creepy meme" /></div>: 
           <div>
           <h4>And the approximate location: </h4>
           <h2>{rawData.location.city}, {rawData.location.region}</h2>
         <MapContainer center={[`${rawData.location.lat}`, `${rawData.location.lng}`]} zoom={6} scrollWheelZoom={false}>
     <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
     <Marker position={[`${rawData.location.lat}`, `${rawData.location.lng}`]}>
       <Popup>
         Are you here?
       </Popup>
     </Marker>
   </MapContainer>
         </div>
          }

    <Time/>
      
  

    </>
  )
}

export default App

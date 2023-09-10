import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


function App() {

  //console.log(import.meta.env.VITE_IPKEY);
const [yourIP, setYourIP] = useState('');
const [rawData, setRawData] = useState();

useEffect(()=>{
  axios
  .get(`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_IPKEY}`)
  .then((resp)=>{
    //console.log(resp)
    setRawData(resp.data)
    setYourIP(resp.data.ip)
    console.log(rawData)
  })
  .catch((err)=>{
    console.log(err)
  })

}, [])

  return (
    <>
      <div>
        <h2>Hello Stranger! </h2>
        <img src="a-little-creepy.jpg" alt="creepy meme" />
        <h3>But here's your IP address :</h3>
        {(!yourIP)? <p>Loading...</p>:<p>{yourIP}</p>}
      <div>
        <h3>And the approximate location: </h3>
      <MapContainer center={[52.51, 13.38]} zoom={5} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[52.51, 13.38]}>
    <Popup>
      Are you here?
    </Popup>
  </Marker>
</MapContainer>
      </div>
      
      </div>

    </>
  )
}

export default App

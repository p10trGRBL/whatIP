import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';



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
  })
  .catch((err)=>{
    console.log(err)
  })

}, [])

  return (
    <>
      <div>
        <h2>Hello Stranger! </h2>
        <img src="/public/a-little-creepy.jpg" alt="creepy meme" />
        <h3>But here's your IP address :</h3>
        {(!yourIP)? <p>Loading...</p>:<p>{yourIP}</p>}
      </div>
    </>
  )
}

export default App

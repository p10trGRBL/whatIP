import { DateTime } from "luxon";
import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

const Time = () => {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => setValue(new Date()), 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    return (
        <>
      <div className="withClock">
        <p>Your current local time:</p>
        <Clock className="clock" value={value} />
       <hr />
       </div>
       <div className= "grid-container">
        <div className="grid-item">
            <Clock/>
             <p>London</p>
        </div>
         <div className="grid-item">
            <Clock/>
            <p>Tokyo</p>
        </div>
        <div className="grid-item">
            <Clock/>
            <p>New York</p>
        </div>
       </div>
       </>
    );
}

export default Time;

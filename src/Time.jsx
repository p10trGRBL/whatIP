import { DateTime } from "luxon";
import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import {Segment } from 'semantic-ui-react';

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
        </div>
       
       </>
    );
}

export default Time;

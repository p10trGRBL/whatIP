import { DateTime } from "luxon";
import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import {Segment } from 'semantic-ui-react';

const ClockTrio=() => {

    const [value, setValue] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => setValue(new Date()), 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);

return (
    <>
        <hr/>
       <Segment className="clockTrio">
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
       </Segment>
    </>
);

}
export default ClockTrio;
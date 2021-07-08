import {React,useEffect,useState} from 'react';
import {getAllFlight} from '../../api/flight-api.js';
const FlightTable = (props)=>{
    const [Data,setData] = useState([]);
    useEffect(()=>{
        getAllFlight().then(res=>//props.getAllTable
            {
                // CHECK BOOGIE
                /*
                אם תוריד את השורה של הסט דטה זה יראה לך את המערך
                */
                res.data?setData(res.data.data?res.data.data:[]):console.log()
                //console.log(res.data.data);
            });
        //eslint-disable-next-line
        },[]);
    return(
            <div className = "Flight-Table">
                <div className  = "Row"> <div className = "Header-Cell">תאריך</div><div className = "Header-Cell">תדר</div> <div className = "Header-Cell">גרור</div> <div className = "Header-Cell">תחנה</div> <div className = "Header-Cell">זנב</div> </div>
                {
                    Data.splice(0,35).map((e)=><div key = {e._id} className  = "Row"> 
                        <div className = "Cell"></div>
                        <div className = "Cell"></div>
                        <div className = "Cell"></div>
                        <div className = "Cell"></div> 
                        <div className = "Cell"></div>
                        </div>)
                }
                <div className  = "Row"> 
                        <div className = "Cell">06-07-2021:// 20:13:12</div>
                        <div className = "Cell">fds</div>
                        <div className = "Cell">fds</div>
                        <div className = "Cell">fds</div> 
                        <div className = "Cell">fds</div>
                        </div>
                        <div className  = "Row"> 
                        <div className = "Cell">06-07-2021:// 20:13:12</div>
                        <div className = "Cell">fds</div>
                        <div className = "Cell">fds</div>
                        <div className = "Cell">fds</div> 
                        <div className = "Cell">fds</div>
                        </div>
                        <div className  = "Row"> 
                        <div className = "Cell">06-07-2021:// 20:13:12</div>
                        <div className = "Cell">fds</div>
                        <div className = "Cell">fds</div>
                        <div className = "Cell">fds</div> 
                        <div className = "Cell">fds</div>
                        </div>
            </div>
);
};

export default FlightTable;
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
                {!Data.length?[...Array(36)].map((d,index)=><div key = {index} className  = "Row"> 
                <div className = "Empty-Cell"></div>
                <div className = "Empty-Cell"></div>
                <div className = "Empty-Cell"></div>
                <div className = "Empty-Cell"></div> 
                <div className = "Empty-Cell"></div>
                </div>):[...Data.splice(0,35),...Array(36-Data.splice(0,35).length)].map((d,index)=>{
                    if(d)
                    return(<div key = {d._id} className  = "Row"> 
                    <div className = "Cell"></div>
                    <div className = "Cell"></div>
                    <div className = "Cell"></div>
                    <div className = "Cell"></div> 
                    <div className = "Cell"></div>
                    </div>);
                    else
                   return(<div key = {index} className  = "Row"> 
                    <div className = "Empty-Cell"></div>
                    <div className = "Empty-Cell"></div>
                    <div className = "Empty-Cell"></div>
                    <div className = "Empty-Cell"></div> 
                    <div className = "Empty-Cell"></div>
                    </div>);
                    })}
            </div>
);
};

export default FlightTable;
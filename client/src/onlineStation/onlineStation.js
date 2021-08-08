import React,{useEffect,useState} from 'react';
import h from '../icons/haziza.png';
import Octopus from '../icons/octopusLoading.png';
import './onlineStation.css'

const noOnlineStation =( 
<svg className="waiting" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 70 70" enableBackground="new 0 0 100 100">
  <defs>
    <clipPath id="circle-clip">
      <path className="clip" d="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
	c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z">
        <animate id="morph-one" dur="1" begin="0" repeatCount="indefinite" attributeName="d" from="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
	c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z" to="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
	c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z" values="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
	c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z;M101.807,135.303c10-0.352,18.193-6.531,18.193-6.531V0H0v128.771c0,0,9.701,4.952,17.069,4.952s10.464-9.299,20.877-9.299
	c10.175,0,12.703,9.299,22.053,9.299s11.981-9.123,20.578-9.123S91.807,135.654,101.807,135.303z
;M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
	c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z" />

      </path>
    </clipPath>
  </defs>
   <image className ="logo"  href={Octopus} clipPath="url(#circle-clip)" />
</svg>);



const OnlineStation = (props) => {
    const[focus,setFocus] = useState(undefined);
    //Current duplicate values in online stations by station id and duplicate id
    // example g = [{Station:55,Duplicate:44},{Station:65,Duplicate:44}]
    const [g,setG] = useState([]);
    useEffect(()=>{
            const newG =findDuplicate("ג");
            setG(newG);
// eslint-disable-next-line
    },[props.items]);
    if(props.items.length===0) //if there are no online stations return this
        return(<div className ="noOnlineStation">
              <div className = "animation">{noOnlineStation} </div>
              </div>);
    let array = props.items.map(item => {
        return (
            <div  onMouseLeave={()=>setFocus(undefined)} onMouseEnter ={()=>setFocus(item.id)} key = {item.id} className = "container">
             <div className = "card">
            <label className = "stationName">{item.id}</label>
            <img alt = ""  src = {h} className = {focus===item.id?"card-image selected":"card-image"}/>
            <div className = "card-footer">
                    <div className = "SRow">
                        <label className = {openNotificationToStation(g).indexOf(item.id)===-1?"SCell":"DuplicateCell"}>{item.message}</label>
                        <label className = {openNotificationToStation(g).indexOf(item.id)===-1?"SCell":"DuplicateCell"}>ג</label>                        
                    </div>
                    <div className = "SRow">
                        <label className = "SCell">1</label>
                        <label className = "SCell">ע</label>                       
                    </div>
                    <div className = "SRow">
                        <label className = "SCell">1</label>
                        <label className = "SCell">I</label>                        
                    </div>
                    <div className = "SRow">                        
                        <label className = "SCell">1</label>
                        <label className = "SCell">מ</label>
                    </div>
                    <div className = "SRow">
                        <label className = "SCell">1</label>
                        <label className = "SCell">ת</label>                        
                    </div>
                    <div className = "SRow">                        
                        <label className = "SCell">1</label>
                        <label className = "SCell">מ</label>
                    </div>
                    <div className = "SRow">
                        <label className = "SCell">1</label>
                        <label className = "SCell">1</label>
                    </div>
                    <div className = "SRow">                       
                        <label className = "SCell">1</label>
                        <label className = "SCell">מ</label>
                    </div>  
            </div>
            </div>
            </div>
        )
    })
    // finding all the duplicates of every item in the array 
    // exapmle [2,4,5,6,2,4][demo1,demo2,demo3,demo4,demo5,demo6] return [demo1,demo2,demo5,demo6]
    function findRepeating(arr,stations)
    {
        let res = [];
        for (let i = 0; i < arr.length; i++)
        {
            for (let j = i + 1; j < arr.length; j++)
            {
                // * 1 to convert string to int
                if (arr[i] === arr[j])
                    res = [...res,{Stations:[stations[i],stations[j]],Duplicate:arr[i]*1}];
            }
        }
        return res;
    }

    function findDuplicate(cell) {
        let res;
        switch (cell) {
            case "ג":{
               res = findRepeating(...new Array(props.items.map(item=>item.message)),
               ...new Array(props.items.map(item=>item.id)));
               return res;
            }
               
        
            default:
                return "Cell";
        }
    }

// get array of notification by stations and open it to one array of all the stations
function openNotificationToStation(arr) {
    let res = [];
    arr.forEach(e=>{
        e.Stations.forEach(s=>res.push(s))
    })
    return res;
}

    return(
        <div className= "contentDiv">
            <h1 className =  "textCenter">תחנות דולקות</h1>
            <div className = "StationPage">{array}</div>
        </div>
    )
}
export default OnlineStation;
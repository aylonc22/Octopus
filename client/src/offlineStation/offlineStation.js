import React,{useState} from 'react'
import './offlineStation.css'
import h from '../icons/haziza.png';

const OfflineStation = (props) => {
    const[focus,setFocus] = useState(undefined);
    let array = props.items.map(item => {
        return (
            <div  onMouseLeave={()=>setFocus(undefined)} onMouseEnter ={()=>setFocus(item.id)} key = {item.id} className = "container">
            <div className="card"> 
            <div  className = "stationName">{item.id}</div>
            <img src = {h} className = {focus===item.id?"card-image selected":"card-image"}/>
            <div className="card-footer">
            <div className = "SRow">
                    <label className = "SCell">{item.message}</label>
                        <label className = "SCell">ג</label>                        
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
            {/* <label className = "stationName">{item.id}</label>
            <div className = "top">
            <img src={h} alt="haziza"></img>
            </div>
            <div className = "bottom">
                    <div className = "Row">
                    <label className = "Cell">{item.message}</label>
                        <label className = "Cell">ג</label>                        
                    </div>
                    <div className = "Row">
                        <label className = "Cell">1</label>
                        <label className = "Cell">ע</label>                       
                    </div>
                    <div className = "Row">
                        <label className = "Cell">1</label>
                        <label className = "Cell">I</label>                        
                    </div>
                    <div className = "Row">                        
                        <label className = "Cell">1</label>
                        <label className = "Cell">מ</label>
                    </div>
                    <div className = "Row">
                        <label className = "Cell">1</label>
                        <label className = "Cell">ת</label>                        
                    </div>
                    <div className = "Row">                        
                        <label className = "Cell">1</label>
                        <label className = "Cell">מ</label>
                    </div>
                    <div className = "Row">
                        <label className = "Cell">1</label>
                        <label className = "Cell">1</label>
                    </div>
                    <div className = "Row">                       
                        <label className = "Cell">1</label>
                        <label className = "Cell">מ</label>
                    </div>  
            </div> */}
            </div>
        )
    });

    return (
        <div  className= "contentDiv">
            <h1 className =  "textCenter">תחנות מכובות</h1>
            <div className = "StationPage">{array}</div>
        </div>
    )
}
export default OfflineStation;
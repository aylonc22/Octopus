import React from 'react'
import './offlineStation.css'
import h from '../icons/haziza.png';

const OfflineStation = (props) => {
    let array = props.items.map(item => {
        return (
            <div  key = {item.id} className = "container">
            <label className = "stationName">{item.id}</label>
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
            </div>
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
import React from 'react'
import './offlineStation.css'

const OfflineStation = (props) => {
    let array = props.items.map(item => {
        return (
            <div key = {item.id} className = "containerOnline">
            <label className = "stationNameOnline">{item.id}</label>
                <div className = "dataContainer">
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
        <div>
            <div className = "boxOffline">{array}</div>
        </div>
    )
}
export default OfflineStation;
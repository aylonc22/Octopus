import React from 'react'
import './offlineStation.css'
// class OfflineStation extends React.Component
// {
//     render(){
//         return(
//         <div className = "containerOffline">
//         <label className = "stationNameOffline" >{this.props.id}</label>
//         </div>)
//         }
    
// }

const OfflineStation = (props) => {
    let array = props.items.map(item => {
        return (
            <div key = {item.id} className = "containerOnline">
            <label className = "stationNameOnline">{item.id}</label>
                <div className = "dataContainer">
                    <div className = "row">
                        <label className = "right">ג</label>
                        <label className = "left">{item.message}</label>
                    </div>
                    <div className = "row">
                        <label className = "right">ע</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">I</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">מ</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">ת</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">מ</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">1</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">מ</label>
                        <label className = "left">1</label>
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
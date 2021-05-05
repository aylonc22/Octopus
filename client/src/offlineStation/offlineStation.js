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
            <div key ={item.id} className = "containerOffline">
                <label className = "stationNameOffline" >{item.id}</label>
            </div>
        )
    })

    return (
        <div>
            <div className = "boxOffline">{array}</div>
        </div>
    )
}
export default OfflineStation;
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
            <div className = "containerOffline">
                <label className = "stationNameOffline" >{item.id}</label>
            </div>
        )
    })

    return (
        <div>
            <h1 className =  "textCenter">תחנות כבויות</h1>
            <div className = "boxOffline">{array}</div>
        </div>
    )
}
export default OfflineStation;
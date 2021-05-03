import React from 'react'
import './onlineStation.css'
// // class OnlineStation extends React.Component
// {
//     render(){
//         return(
//         <div className = "containerOnline">
        
//         <label className = "stationNameOnline">{this.props.id}</label>
//             {this.props.message}
//         </div>)
//         }
// }



const OnlineStation = (props) => {
    let array = props.items.map(item => {
        return (
            <div className = "containerOnline">
            <label className = "stationNameOnline">{item.id}</label>
                {item.message}
            </div>
        )
    })
    
    return(
        <div>
            <h1 className =  "textCenter">תחנות דולקות</h1>
            <div className = "boxOnline">{array}</div>
        </div>
    )
}
export default OnlineStation;
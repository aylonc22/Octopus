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
    if(props.items.length===0)
        return(<div>There are no online station at the moment</div>);
    let array = props.items.map(item => {
        return (
            <div key = {item.id} className = "containerOnline">
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
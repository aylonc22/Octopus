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
        return(<div>There are no online stations at the moment</div>);
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
    })
    
    return(
        <div>
            <h1 className =  "textCenter">תחנות דולקות</h1>
            <div className = "boxOnline">{array}</div>
        </div>
    )
}
export default OnlineStation;

import React ,{useState} from 'react';
import Slider from 'react-slick';
//Manage components
import SmallTable from './dashboard/SmallTable-Card.js';
import FlightTable from './dashboard/FlightTable-Card.js';
import NotificationTable from './dashboard/Notification-Card.js';
//Axios requests
import {getAllTail} from '../api/tail-api.js';
import {getAllFrequency} from '../api/frequency-api.js';
import {getAllStation} from '../api/station-api.js';
import {getAllGDT} from '../api/gdt-api.js';
import {getAllFlight} from '../api/flight-api.js';
import {getAllNotification,getNotificationsFromTo} from '../api/notification-api.js';
//Styling
import './Manage.css';
const Manage = props =>{    
    const settings = {
    autoplay:true,
    autoplaySpeed:10000,
    speed:600,
    slidesToShow:1,
    slidesToScroll:1,
    pauseOnHover:false,
    dots:false,
    pauseOnDotsHover:false,
    cssEase:'linear',
   // fade:true,
    draggable:false,
    arrows: false,
    };
    const[smallTable,setSmallTable] = useState("tail");
    const smallTableAttributes = table=>{
        if(table==="tail")
            return {getAllTable: getAllTail(),
                secondary:"Type",
                secondaryH:"סוג",
                name:"זנבות"};
         if(table==="frequency")
            return {getAllTable: getAllFrequency(),                       
                secondary:"Type",
                secondaryH:"סוג",
                name:"תדרים"};
        if(table==="station")
            return {getAllTable: getAllStation(), 
                secondary:"Type",
                secondaryH:"סוג",
                name:"תחנות"};
        if(table==="gdt")
            return {getAllTable: getAllGDT(),
                secondary:"Type",
                secondaryH:"מקום",
                name:"גרורים"};
        
    }
    return(
    <div className = "Page-Manage">
        <div className = "Top-Page">
            <div className = "Flights-Component">
                <FlightTable getAllTable = {getAllFlight()}/>
            </div>
            <div className = "Right-Page">
                <div className = "Notification-Component">  <NotificationTable notifications = {props.notifications} getAllOpen = {getNotificationsFromTo(0,21)} getAllTable = {getAllNotification()}/> </div> 
                 <div className = "Edit-Component" >
                    <div className  = "Row"><div className = "Header-Cell" onClick={()=>setSmallTable("gdt")}>גרור</div> <div className = "Header-Cell"  onClick={()=>setSmallTable("frequency")}>תדר</div> <div className = "Header-Cell" onClick={()=>setSmallTable("station")}>תחנה</div> <div className = "Header-Cell" onClick={()=>setSmallTable("tail")}>זנבות</div></div>
                    <SmallTable getAllTable = {smallTableAttributes(smallTable).getAllTable} secondary = {smallTableAttributes(smallTable).secondary} secondaryH = {smallTableAttributes(smallTable).secondaryH} name ={smallTableAttributes(smallTable).name}/>
                </div> 
            </div>           
        </div>
    </div>

)
};
export default Manage;


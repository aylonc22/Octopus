
import React ,{useState,useEffect} from 'react';
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
    const[smallTable,setSmallTable] = useState("tail");
    const[isClicked,setIsClicked] = useState(undefined);
    const [slider,setSlider] = useState(undefined);
    const names = ["tail","station","frequency","gdt"]
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

    // make the slider
    useEffect(()=>{
       
       setSlider( setTimeout(() => {
            if(!isClicked)setSmallTable(names.indexOf(smallTable)+2>names.length?names[0]:names[names.indexOf(smallTable)+1]);
        }, 5000)) // eslint-disable-next-line
    },[smallTable,isClicked]);

    useEffect(()=>{
        if(isClicked)
        {
            clearTimeout(slider);
            setTimeout(() => {
                setSmallTable(names.indexOf(smallTable)+2>names.length?names[0]:names[names.indexOf(smallTable)+1]);
                setIsClicked(false);
            }, 5000);
        } // eslint-disable-next-line
    },[isClicked]);

    return(
    <div className = "Page-Manage">
        <div className = "Top-Page">
            <div className = "Flights-Component">
                <FlightTable getAllTable = {getAllFlight()}/>
            </div>
            <div className = "Right-Page">
                <div className = "Notification-Component">  <NotificationTable notifications = {props.notifications} getAllOpen = {getNotificationsFromTo(0,21)} getAllTable = {getAllNotification()}/> </div> 
                 <div className = "Edit-Component" >
                    <div className  = "smallRow"><div className = {smallTable==="gdt"?"smallTableCardsClicked":"smallTableCards"} onClick={()=>{setSmallTable("gdt");setIsClicked(true);}}>גרור</div> <div className ={smallTable==="frequency"?"smallTableCardsClicked":"smallTableCards"}   onClick={()=>{setSmallTable("frequency");setIsClicked(true);}}>תדר</div> <div className ={smallTable==="station"?"smallTableCardsClicked":"smallTableCards"} onClick={()=>{setSmallTable("station");setIsClicked(true);}}>תחנה</div> <div className = {smallTable==="tail"?"smallTableCardsClicked":"smallTableCards"} onClick={()=>{setSmallTable("tail");setIsClicked(true);}}>זנבות</div></div>
                    <SmallTable getAllTable = {smallTableAttributes(smallTable).getAllTable} secondary = {smallTableAttributes(smallTable).secondary} secondaryH = {smallTableAttributes(smallTable).secondaryH} name ={smallTableAttributes(smallTable).name}/>
                </div> 
            </div>           
        </div>
    </div>

)
};
export default Manage;


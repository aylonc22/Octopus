
import React,{useState,useEffect} from 'react';
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
import {getAllNotification,getOpenNotificationFromTo,getNotificationsFromTo, getAllOpenNotification} from '../api/notification-api.js';
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
    return(
    <div className = "Page-Manage">
        <div className = "Top-Page">
            <div className = "Flights-Component">
                <FlightTable getAllTable = {getAllFlight()}/>
            </div>
            <div className = "Right-Page">
                <div className = "Notification-Component">  <NotificationTable notifications = {props.notifications} getAllOpen = {getNotificationsFromTo(0,21)} getAllTable = {getAllNotification()}/> </div> 
                 <div className = "Edit-Component" >
                     <div className = "Edit-Component-Left">
                        <Slider {...settings}>                
                        <div ><SmallTable getAllTable = {getAllTail()} secondary = "Type" secondaryH = "סוג" name ="זנבות"/></div>
                        <div><SmallTable getAllTable = {getAllFrequency()} secondary = "Type" secondaryH = "סוג" name ="תדרים"/></div>
                        </Slider>
                     </div>
                     <div className = "Edit-Component-Right">
                     <Slider {...settings}>                
                        <div ><SmallTable getAllTable = {getAllStation()} secondary = "Type" secondaryH = "סוג" name ="תחנות"/></div>
                        <div><SmallTable getAllTable = {getAllGDT()} secondary = "Location" secondaryH = "מקום" name ="גרורים"/></div>
                        </Slider>
                     </div>
                </div> 
            </div>           
        </div>
    </div>

)
};
export default Manage;


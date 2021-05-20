import React from 'react';
//Manage components
import SmallTable from './dashboard/SmallTable-Card.js';
import Flights from '../Manage-Items/Flights/flight.js';
import Notification from '../Manage-Items/Notification/Notification.js';
//Axios requests
import {getAllTail} from '../api/tail-api';
import {getAllFrequency} from '../api/frequency-api';
import {getAllStation} from '../api/station-api';
import {getAllGDT} from '../api/gdt-api';
//Styling
import './Manage.css';
const Manage = props =>{
return(
    <div className = "Page-Manage">
        <div className = "Top-Page">
            <div className = "Flights-Component"> <Flights/></div>
            <div className = "Right-Page">
                <div className = "Notification-Component">  <Notification/> </div>
                 <div className = "Edit-Component"> 
                 <SmallTable table = "Tail" getAllTable = {getAllTail()} secondary = "Location" secondaryH = "מקום"/>
                 <SmallTable table = "Frequency" getAllTable = {getAllFrequency()} secondary = "Location" secondaryH = "מקום"/>
                   
                </div>     
            </div>
            
        </div>
    </div>
)
};
export default Manage;
//<Edit/>


import React from 'react';
//Manage components
import Edit from '../Manage-Items/Edit/Edit.js';
import Flights from '../Manage-Items/Flights/flight.js';
import Notification from '../Manage-Items/Notification/Notification.js';
//Styling
import './Manage.css';
const Manage = props =>{
return(
    <div className = "Page-Manage">
        <div className = "Top-Page">
            <div className = "Flights-Component"> <Flights/></div>
            <div className = "Notification-Component"> <Notification/></div>
        </div>
        <div className = "Bottom-Page">
            <div className = "Edit-Component"> <Edit/> </div>
        </div>
    </div>
)
};
export default Manage;
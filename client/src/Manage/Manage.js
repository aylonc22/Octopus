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
            <div className = "Right-Page">
                <div className = "Notification-Component">  <Notification/> </div>
                 <div className = "Edit-Component"> 
                 <div className ="Card">
                 <div className  = "Header-Row"> <div className = "Header-Cell">d</div> <div className = "Header-Cell">d;</div> </div>
                    <div className  = "Row"> <div className = "Cell">777</div> <div className = "Cell">Normal</div> </div>
                    <div className  = "Row"> <div className = "Cell">777</div> <div className = "Cell">Normal</div> </div>
                    <div className  = "Row"> <div className = "Cell">777</div> <div className = "Cell">Normal</div> </div>
                    <div className  = "Row"> <div className = "Cell">777</div> <div className = "Cell">Normal</div> </div>
                    <div className  = "Row"> <div className = "Cell">777</div> <div className = "Cell">Normal</div> </div>
                    <div className  = "Row"> <div className = "Cell">777</div> <div className = "Cell">Normal</div> </div>
                    <div className  = "Row"> <div className = "Cell">777</div> <div className = "Cell">Normal</div> </div>
                    <div className  = "Row"> <div className = "Cell">777</div> <div className = "Cell">Normal</div> </div>
                    <div className  = "Row"> <div className = "Cell">777</div> <div className = "Cell">Normal</div> </div>
                    <div className  = "Row"> <div className = "Cell">777</div> <div className = "Cell">Normal</div> </div>
                   </div>  
                    <div className ="Card">           
                    <div className  = "Header-Row"> <div className = "Header-Cell">d</div> <div className = "Header-Cell">d;</div> </div>                
                    <div className  = "Row"> <div className = "Cell">40</div> <div className = "Cell">norma;</div> </div>
                    <div className  = "Row"> <div className = "Cell">40</div> <div className = "Cell">norma;</div> </div>
                    <div className  = "Row"> <div className = "Cell">40</div> <div className = "Cell">norma;</div> </div>
                    <div className  = "Row"> <div className = "Cell">40</div> <div className = "Cell">norma;</div> </div>
                    <div className  = "Row"> <div className = "Cell">40</div> <div className = "Cell">norma;</div> </div>
                    <div className  = "Row"> <div className = "Cell">40</div> <div className = "Cell">norma;</div> </div>
                    <div className  = "Row"> <div className = "Cell">40</div> <div className = "Cell">norma;</div> </div>
                    <div className  = "Row"> <div className = "Cell">40</div> <div className = "Cell">norma;</div> </div>
                    <div className  = "Row"> <div className = "Cell">40</div> <div className = "Cell">norma;</div> </div>
                    <div className  = "Row"> <div className = "Cell">40</div> <div className = "Cell">norma;</div> </div>
                 </div>
                  </div>     
            </div>
            
        </div>
    </div>
)
};
export default Manage;
//<Edit/>


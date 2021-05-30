import Slider from 'react-slick';
//Manage components
import SmallTable from './dashboard/SmallTable-Card.js';
import Flights from './dashboard/FlightTable-Card.js';
import Notification from '../Manage-Items/Notification/Notification.js';
//Axios requests
import {getAllTail} from '../api/tail-api';
import {getAllFrequency} from '../api/frequency-api';
import {getAllStation} from '../api/station-api';
import {getAllGDT} from '../api/gdt-api';
import {getAllFlight} from '../api/flight-api';
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
                <Flights getAllTable = {getAllFlight()}/>
            </div>
            <div className = "Right-Page">
                <div className = "Notification-Component">  <Notification/> </div> 
                 <div className = "Edit-Component" >
                     <div className = "Edit-Component-Left">
                        <Slider {...settings}>                
                        <div ><SmallTable getAllTable = {getAllTail()} secondary = "Location" secondaryH = "מקום" name ="זנבות"/></div>
                        <div><SmallTable getAllTable = {getAllFrequency()} secondary = "Location" secondaryH = "מקום" name ="תדרים"/></div>
                        </Slider>
                     </div>
                     <div className = "Edit-Component-Right">
                     <Slider {...settings}>                
                        <div ><SmallTable getAllTable = {getAllStation()} secondary = "Location" secondaryH = "מקום" name ="תחנות"/></div>
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


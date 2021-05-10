import {useEffect, useState} from 'react';
import {ManageItems}  from '../Items/ManageItems';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const ManageNav= (props)=>
{
   const[clicked,setClicked] = useState(props.url.length===0?"/":props.url);
   function onClick(item) {
       setClicked(item.url)
   }
   
    return(
          
            <div className="navDiv1">
                <nav className = "NavbarItems1"> 
                     <h1  className = "Manage-logo1">טבלאות</h1>
                    <div className = "Manage-icon1"></div>
                    <ul className = "ManageNav-menu1"> {ManageItems.map((item,index)=><li key = {index}>
                <Link onClick ={()=>onClick(item)} className = {clicked===item.url?"clicked-page1":item.cName} to = {item.url}>
                    {item.title}
            </Link> </li>)}
            </ul>
        </nav>
            </div>
           
    );
}
export default ManageNav;
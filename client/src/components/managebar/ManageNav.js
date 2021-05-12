import {useEffect, useState} from 'react';
import {ManageItems}  from '../Items/ManageItems';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './ManageNav.css';
const ManageNav= (props)=>
{
   const[clicked,setClicked] = useState(props.url.length===0?"/":props.url);
   function onClick(item) {
       setClicked(item.url)
   }
   
    return(
          
            <div className="ManagenNavDiv">
                <nav className = "ManageNavbarItems"> 
                     <h1  className = "Manage-logo">טבלאות</h1>
                    <div className = "Manage-icon"></div>
                    <ul className = "ManageNav-menu"> {ManageItems.map((item,index)=><li key = {index}>
                <label className = {item.cName + "-icon"}> </label>
                <Link onClick ={()=>onClick(item)} className = {/*clicked===item.url?"clicked-":*/item.cName} to = {item.url}>
                    {item.title}
            </Link> </li>)}
            </ul>
        </nav>
            </div>
           
    );
}
export default ManageNav;
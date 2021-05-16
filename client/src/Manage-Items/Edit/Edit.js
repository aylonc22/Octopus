import React from 'react';
//Table componnents
import Tail from './Tails/tail.js';
import GDT from './GDT/gdt.js';
import Station from './Stations/station.js'
import Frequency from './Frequencies/frequency.js';
//Styling 
import './Edit.css';
const Edit = props =>{
    const defaultColumns = 20;
return(
   <div className = "Page">
        <div className = "Edit-Page">
            <div className = "EditPageTop">
                <Tail defaultColumns = {defaultColumns} />
                <Tail defaultColumns = {defaultColumns} />
            </div>
            <div className = "EditPageBottom">
                <Tail defaultColumns = {defaultColumns} />
                <Tail defaultColumns = {defaultColumns} />
            </div>
        </div>
   </div>
)
};
export default Edit;
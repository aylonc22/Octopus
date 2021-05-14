import React , {useState,useEffect} from 'react';
import io from 'socket.io-client';
import {useRoutes} from 'hookrouter';
import {BrowserRouter as Router,Switch, Route, Link} from "react-router-dom";
import './App.css';

//Componnets
import OfflineStation from './offlineStation/offlineStation';
import OnlineStation from './onlineStation/onlineStation';
import HomePage from './homePage/HomePage';
import NotFoundPage from './notFoundPage/NotFoundPage';
import Navbar from './components/navbar/Navbar';
// ManageNav Componnets
import Tail from './homePage/Manage-Items/Tails/tail';
import Flight from './homePage/Manage-Items/Flights/flight';
import GDT from './homePage/Manage-Items/GDT/gdt';
import Frequency from './homePage/Manage-Items/Frequencies/frequency';
import Station from './homePage/Manage-Items/Stations/station';

//Client
const socket = io.connect('http://localhost:4000',{reconnectionDelay: 1000,
reconnection:true,
reconnectionAttempts: 10,
transports: ['websocket'],
agent: false, 
upgrade: false,
rejectUnauthorized: false});

//APP
function App() {
  const [onlineStations,setOnlineStations] =useState([]);//{id:"demo1",message:"ADIR NAHUM"}
  const [offlineStations,setOfflineStations] =useState([{id:"demo1"},{id:"demo2"},{id:"demo3"}]);
  const [data,setData] = useState({station:'',message:''});
  const [manager,setManager] = useState(null);
  socket.on('connection',()=>console.log("test"));
  socket.on('disconnect',()=>{
    socket.send("[Client] disconnected");
});
//socket.on('connect_error',(err)=>console.log(err));
socket.on('error',err=>console.log(`[Client] server is not up: ${err}`))
useEffect(()=>{
  socket.on('station-listener', (msg,s)=>{
    setData({message:msg,station:s})
  });// eslint-disable-next-line
},[]);
useEffect(()=>{
  let newOffline =  [...offlineStations].filter(item=>{return item.id!==data.station;})
  let newOnline = []; 
      let flag = false;
      for(let i = 0; i<onlineStations.length;i++)
        {
            if(onlineStations[i].id === data.station)
             { 
               flag = true;
              newOnline =[...newOnline,{id:data.station,message:data.message}];
            }
            else
            newOnline = [...newOnline,{id:onlineStations[i].id,message:onlineStations[i].message}];
        }
        if(!flag && (data.message || data.station))//if is not already in array and actually have value
        {newOnline =[...newOnline,{id:data.station,message:data.message}];;}
         
        setOnlineStations(newOnline.sort((a, b) => a.id.localeCompare(b.id)));
         setOfflineStations(newOffline.sort((a, b) =>  a.id.localeCompare(b.id)));// eslint-disable-next-line
},[data]);
  
return (
    
        <div>
           <Router>
             <div>
            <Navbar 
             Manager = {function(table){setManager(table)}}
             url={window.location.href.substring(window.location.href.lastIndexOf('/'))}/>
            <Switch>
          <Route exact path="/"><HomePage NotFoundPage = {NotFoundPage}/></Route>
          <Route path="/online"><OnlineStation  items = {onlineStations}/></Route>
          <Route path="/offline"><OfflineStation  items = {offlineStations} /></Route>
          <Route path="/tail"><Tail /></Route>
          <Route path="/station"><Station /></Route>
          <Route path="/gdt"><GDT /></Route>
          <Route path="/frequency"><Frequency /></Route>
          <Route path="/flight"><Flight /></Route>
          <Route path="*"><NotFoundPage/></Route>
        </Switch>
           </div>
            </Router>
            {manager}
        </div>   
    
  );
 }

export default App;
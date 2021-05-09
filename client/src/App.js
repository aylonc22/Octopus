import React , {useState,useEffect} from 'react';
import io from 'socket.io-client';
import OfflineStation from './offlineStation/offlineStation';
import OnlineStation from './onlineStation/onlineStation';
import HomePage from './homePage/HomePage';
import NotFoundPage from './notFoundPage/NotFoundPage';
import {useRoutes} from 'hookrouter';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router,Switch, Route, Link} from "react-router-dom";
import './App.css';
const socket = io.connect('http://localhost:4000',{});
function App() {
  const [onlineStations,setOnlineStations] =useState([]);//{id:"demo1",message:"ADIR NAHUM"}
  const [offlineStations,setOfflineStations] =useState([{id:"demo1"},{id:"demo2"},{id:"demo3"}]);
  const [data,setData] = useState({station:'',message:''});
  // let showOnline = onlineStations.map(s=><OnlineStation key ={s.id} id = {s.id} message = {s.message}/>)
  // let showOffline = offlineStations.map(s=><OfflineStation key ={s.id} id = {s.id}/>)
  socket.on('connection',()=>console.log("test"));
  socket.on('disconnect',()=>{
    socket.send("[Client] disconnected");
});
useEffect(()=>{
  socket.on('connect_error',(err)=>console.log(err));
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
const routes ={
  '/': () => <HomePage />,
  '/online': () => <OnlineStation items = {onlineStations}/>,
  '/offline': () => <OfflineStation items = {offlineStations}/>,
};  
return (
    
        <div>
           <Router>
             <div>
            <Navbar url={window.location.href.substring(window.location.href.lastIndexOf('/'))}/>
            <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/online">
            <OnlineStation  items = {onlineStations}/>
          </Route>
          <Route path="/offline">
            <OfflineStation  items = {offlineStations} />
          </Route>
          <Route path="*">
            <NotFoundPage/>
          </Route>
        </Switch>
           </div>
            </Router>
        </div>   
    
  );
 }

export default App;
//Server
const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
//Mongo 
const db = require('./mongoDB/mongoConnection.js');
//Routes
const tailRouter = require('./mongoDB/routers/tail-route.js');
const frequencyRouter = require('./mongoDB/routers/frequency-route.js');
const stationRouter = require('./mongoDB/routers/station-route.js');
const gdtRouter = require('./mongoDB/routers/gdt-route.js');
const flightRouter = require('./mongoDB/routers/flight-route.js');
const notificationRouter = require('./mongoDB/routers/notification-route.js');
const e = require('express');
const { resolveCname } = require('dns');
const Notification = require('./mongoDB/models/notification-model');
// Data
let _offlineStations = []; //Tracking offline stations
let _onlineStations = []; //Tracking online stations
let _notifications = [{g:[]}]; //Tracking notifications
let newNotifications = [];
//Initialization
const PORT = 4000;
app.use(cors());
app.use(express.json());
http.listen(PORT,()=>console.log(`[Server] is running on port: ${PORT}`));
//Server Client comunication 
io.on('connection',socket => {
    console.log(`[Server] Client connected`);
    socket.on('message',(msg)=>console.log(msg))
    socket.on('disconnect',()=>'[Server] client disconnected');
    socket.on('connect_failed',()=>console.log("fail"))
    socket.on('updateNotification',(Notifications)=>{
        _notifications = Notifications;
       });//update in server status of notifications
   socket.on('sendUpdateNotification',()=>socket.emit('sendNotifications',_notifications)); // send to client updated arrays of notifications    
});


// station listener
let rawData = fs.readFileSync('./stationList.json');
let stationList = JSON.parse(rawData);

    for(let i in stationList.station)
    stationWatcher(stationList.station[i]);

// station watcher
function stationWatcher(station)
{
    let path = station.path;
    let modified;
    let watch = fs.watch(path,{recursive:true},('utf8',(eventType,fileName) =>{
        let stats = fs.statSync(path);
        let seconds = +stats.mtime;
        if(modified != seconds)
        {
            modified = seconds;
            let instream = fs.createReadStream(path);
            let outstream = new stream;
            let rl = readline.createInterface(instream,outstream);
            let lastLine;
            rl.on('line',(line)=>lastLine=line);
            rl.on('close',()=>{
                // console.log(`[Server] found new last line for station:${station.id},${Object.keys(io.sockets.sockets).length}`);
                   //io.sockets.emit('station-listener',lastLine,station.id).on('error', err=>console.log(err));
                   handleStations({message:lastLine,station:station.id})
                   handleNotification();
            });
        }
    }));
}

//Get new data from stations watcher
// check if there is new data to update
// and update the correct stations
function handleStations(data) {

    let newOffline =  [_offlineStations].filter(item=>{return item.id!==data.station;})
    let newOnline = []; 
        let flag = false;
        for(let i = 0; i<_onlineStations.length;i++)
          {
              if(_onlineStations[i].id === data.station)
               { 
                 flag = true;
                newOnline =[...newOnline,{id:data.station,message:data.message}];
              }
              else
              newOnline = [...newOnline,{id:_onlineStations[i].id,message:_onlineStations[i].message}];
          }
          if(!flag && (data.message || data.station))//if is not already in array and actually have value
          {newOnline =[...newOnline,{id:data.station,message:data.message}];;}
           
          _onlineStations = newOnline.sort((a, b) => a.id.localeCompare(b.id));// order online and offline stations by ID number
          _offlineStations= newOffline.sort((a, b) =>  a.id.localeCompare(b.id));
          io.sockets.emit("sendStations",_onlineStations,_offlineStations);
}

// Notification handler
// open new notifications if necessary
// or closing
function handleNotification() {
    let notifications = [];
    //
    getOpenNotification();
    
    notifications = [...notifications,{g:newNotifications.filter((d)=>d.Type==="ג")}]
    console.log(notifications);
   //console.log(openNotifications);
  
}

  const getOpenNotification = async(req,res)=> {
   
    await Notification.find({Close:"1970-01-01T00:00:00.000Z"},(err,notifications)=>{
        if(err)
         console.log(`[Mongo] ${err}`);
        if(!notifications.length)
            newNotifications = [];
        
        newNotifications = notifications;
    })
}

//Mongo handels
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open',()=>console.log("[Mongo] database connection established successfully"))
app.use('/api',tailRouter,frequencyRouter,gdtRouter,stationRouter,flightRouter,notificationRouter);



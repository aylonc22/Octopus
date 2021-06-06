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
const Notification = require('./mongoDB/models/notification-model');
// Data
let _offlineStations = []; //Tracking offline stations
let _onlineStations = []; //Tracking online stations
let newNotifications = []; //Tracking live notifications;
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
 async function handleNotification() {
   await getOpenNotification();//update list of open notifications
   if(newNotifications.length)
    {
        let f = findDiffrentNew(findDuplicate("ג"),newNotifications.filter((d)=>d.Type==="ג"));
        for(let i=0;i<f.length;i++)
            {
                //TODO understand how to wait for update
                // updating twice
                // im worried that it will insert twice to!!   
                await updateNotification(f[i]._id); 
                    console.log("WTF");
            }
        io.sockets.emit('reRender');
    }
}

// finding all the duplicates of every item in the array 
    // exapmle [2,4,5,6,2,4][demo1,demo2,demo3,demo4,demo5,demo6] return [demo1,demo2,demo5,demo6]
    function findRepeating(arr,stations)
    {
        let res = [];
        for (let i = 0; i < arr.length; i++)
        {
            for (let j = i + 1; j < arr.length; j++)
            {
                // * 1 to convert string to int
                if (arr[i] === arr[j])
                    res = [...res,{Stations:[stations[i],stations[j]],Duplicate:arr[i]*1}];
            }
        }
        return res;
    }

    // compare similiar rows in each stations and check if there is any duplicate value
    // return the duplicated value and the stations ID
    function findDuplicate(cell) {
        let res;
        switch (cell) {
            case "ג":{
               res = findRepeating(...new Array(_onlineStations.map(item=>item.message)),
               ...new Array(_onlineStations.map(item=>item.id)));
               return res;
            }
               
        
            default:
                return [];
        }
    }

    // get which cell to check on notifications and return the diffrence between 
    //new notification and mongo notification
    function findDiffrentNew(array,_notifications) {
        // filtering notification type "ג" ==>[Example] running on every item in array check if 
        //inside returning what is not inside notification
        function algo(e) 
            {
                let flag = false;
                for(let i=0;i<array.length;i++){
                    for(let j=0;j<array.length;j++)
                       { 
                           if((array[j].Stations[0] === e.Stations[0] || array[j].Stations[0] === e.Stations[1]) &&
                            (array[j].Stations[1] === e.Stations[0] || array[j].Stations[1] === e.Stations[1]) &&
                            array[j].Duplicate === e.Duplicate)
                            flag=true;
                        }
                        if(flag)
                            return false;  
            }
            return flag?false:true;
            }

            return(_notifications.filter(e=>algo(e)));
    }

  
//Mongo handels
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open',()=>console.log("[Mongo] database connection established successfully"))
app.use('/api',tailRouter,frequencyRouter,gdtRouter,stationRouter,flightRouter,notificationRouter);



// <------ MONGO QUERIES ------>

  // Mongo DB Query to find all the open notifications
  // In Mongo type DATE default date is 1970/01/01 
  // Open notification means the notification is still live
  const getOpenNotification = async(req,res)=> {
   
    await Notification.find({Close:"1970-01-01T00:00:00.000Z"},(err,notifications)=>{
        if(err)
         console.log(`[Mongo] ${err}`);
        if(!notifications.length)
            newNotifications = [];
        
        newNotifications = notifications;
    })
}
 // Mongo DB Queri to find element and update him
  const updateNotification = async(req,res)=> {
    await Notification.findOneAndUpdate({_id:req},{$set:{Close:new Date()}},
    {useFindAndModify: false, new:true},err=>{
        if(err)
        console.log(`[Mongo]  Failed to update ${req} --->\n ${err}`);

        console.log(`[Mongo] Updated Successfuly ${req}`)
    },{new:true})

  }


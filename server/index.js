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
let _offlineStations = [{id:"demo1"},{id:"demo2"},{id:"demo3"},{id:"demo12"},{id:"demo22"},{id:"demo34"},{id:"demo14"},{id:"demo23"},{id:"demo30"}]; //Tracking offline stations
let _onlineStations = []; //Tracking online stations
let newNotifications = []; //Tracking live notifications;
let NotificationsQueue = [];
//Initialization
const colors = require('colors');
const PORT = 4000;      
// <----->    <----->
const IPADDRESS = process.argv[2] || require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[0]].filter(e=>e.family==='IPv4')[0].address;
console.log(IPADDRESS);
app.use(cors());
app.use(express.json());
http.listen(PORT,IPADDRESS,()=>console.log(`
<--------------------------------> 
[Server] ip address: ${IPADDRESS} 
[Server] running  on port: ${PORT} 
<-------------------------------->\n`.bgRed.white.bold));
//Server Client comunication 

//<---------------->
// giving the client the host ip
const edit_json_file = require('edit-json-file');
let file = edit_json_file('../client/src/HostAddress.json');
if(file.get().HostIpAddress!=IPADDRESS)
{
    file.set("HostIpAddress",IPADDRESS);
    file.save();
}
//<---------------->

io.on('connection',socket => {
    console.log(`[Server] ${socket.request.connection.remoteAddress} is connected`);
    socket.on('message',(msg)=>console.log(msg))
    socket.on('disconnect',()=>'[Server] client disconnected');
    socket.on('connect_failed',()=>console.log("fail"))
    socket.on('updateNotification',(Notifications)=>{
        _notifications = Notifications;
       });//update in server status of notifications
   socket.on('sendUpdateNotification',()=>socket.emit('sendNotifications',_notifications)); // send to client updated arrays of notifications    
   socket.on("requestRender",()=>socket.emit("reRender-card"));
   socket.on("sendIP",()=>socket.emit("getIP",socket.request.connection.remoteAddress)); // send client ip when client ask for it
   socket.on("updateClient",(id,client)=>updateNotificationClients({id:id,client:client}));
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
                   handleStations({message:lastLine,station:station.id}).then((res)=>handleNotification());
                   
            });
        }
    }));
}

//Get new data from stations watcher
// check if there is new data to update
// and update the correct stations
async function handleStations(data) {

    let newOffline =  _offlineStations.filter(item=>item.id!==data.station)
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
   // getting notification && type and inserting them to Mongo
   async function insert(e){await createNotification({Stations:[e.Stations[0],e.Stations[1]],
    Type:e.Type,
    Duplicate:e.Duplicate,
    Open:new Date(),
    Close:new Date("1970-01-01")});} // new Date(<integer>) specifies the datetime as
    //milliseconds since the UNIX epoch (Jan 1, 1970)
    
    if(newNotifications.length)
    {   
        let f = findDiffrentNew(findDuplicate("ג"),newNotifications.filter((d)=>d.Type==="ג"));
        for(let i=0;i<f.length;i++)
            {  
                await updateNotification(f[i]._id); 
            }
        io.sockets.emit('reRender');
        io.sockets.emit('reRender-card');
    }
    let tempInsert = []; 
    tempInsert = tempInsert.concat(newNotifications.length?findDiffrentNew(newNotifications.filter((d)=>d.Type==="ג"),findDuplicate("ג")):findDuplicate("ג"));
    let needInsert = [];
    if(NotificationsQueue.length)
    {
        for(let i=0;i<tempInsert.length;i++)
           { 
               let flag = false;
               for(let j=0;j<NotificationsQueue.length;j++)
                if(JSON.stringify(NotificationsQueue[j])===JSON.stringify(tempInsert[i]))
                    flag = true;
                
                if(!flag)
                   needInsert = [...needInsert,tempInsert[i]];
            }
    }
    else
        {
            needInsert = tempInsert;
        }
        NotificationsQueue = needInsert;
        for(let i=0;i<needInsert.length;i++)
        {
        
            await insert(needInsert[i]).then(res=>io.sockets.emit('newPopUp',needInsert[i]));
            
        }
        if(needInsert.length)
           {
                io.sockets.emit('reRender');
                io.sockets.emit('reRender-card',newNotifications);
           }
}

// <------AUXILIARY FUNCTIONS ------>

    // finding all the duplicates of every item in the array 
    // exapmle [2,4,5,6,2,4][demo1,demo2,demo3,demo4,demo5,demo6] return [demo1,demo2,demo5,demo6]
    function findRepeating(arr,stations,type)
    {
        let res = [];
        for (let i = 0; i < arr.length; i++)
        {
            for (let j = i + 1; j < arr.length; j++)
            {
                // * 1 to convert string to int
                if (arr[i] === arr[j])
                    res = [...res,{Stations:[stations[i],stations[j]],Duplicate:arr[i]*1,Type:type}];
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
               ...new Array(_onlineStations.map(item=>item.id)),"ג");
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
 // Mongo DB Query to find element and update him
  const updateNotification = async(req,res)=> {
    await Notification.findOneAndUpdate({_id:req},{$set:{Close:new Date()}},
    {useFindAndModify: false, new:true},err=>{
        if(err)
        console.log(`[Mongo]  Failed to update ${req} --->\n ${err}`);

        console.log(`[Mongo] Updated Successfuly ${req}`)
    },{new:true});
  }

  // Mongo DB Query to create new elemt [notification]
  const createNotification = async(req)=>{ 
    await Notification.create(req,(err,res)=>{
        if(err)
        {
           console.log(`[Mongo]  Failed to Create `);
            console.log(req);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log(err);
        }

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(`[Mongo] Created Successfuly`)
        console.log(req);
      })
  }
  const updateNotificationClients = async({id,client})=>{ 
      console.log("HELLO");
      console.log(client);
      console.log(id);
      await Notification.findOneAndUpdate({_id:id},{$addToSet:{Clients:client}},
      {useFindAndModify: false, new:true},err=>{
          if(err)
          console.log(`[Mongo]  Failed to update ${id} --->\n ${err}`);
  
          console.log(`[Mongo] Updated Successfuly ${id}`)
      },{new:true});
}
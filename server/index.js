const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
//Initialization
const PORT = 4000;
let _onlineStations = [];
let _offlineStations = [];
app.use(cors());
http.listen(PORT,()=>console.log(`[Server] is running on port: ${PORT}`));
//Server Client comunication 
io.on('connection',socket => {
    console.log(`[Server] Client connected`);
    if(io!=socket)
    socket.emit('server-message','hey hey hey');
    socket.on('message',(msg)=>console.log(msg))
    socket.on('disconnect',()=>'[Server] client disconnected');
    socket.on('connect_failed',()=>console.log("fail"))
    socket.on('update',(OnlineStations,OfflineStations)=>{
        _onlineStations = OnlineStations;
         _offlineStations = OfflineStations;
        });//update in server status of online and offline stations
    socket.on('sendUpdate',()=>socket.emit('sendStations',_onlineStations,_offlineStations)); // send to client updated arrays of station
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
    let count = 0;
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
            io.sockets.setMaxListeners(1);
            rl.on('line',(line)=>lastLine=line);
            rl.on('close',()=>{
                console.log(`[Server] found new last line for station:${station.id},${Object.keys(io.sockets.sockets).length}`);
                   io.sockets.emit('station-listener',lastLine,station.id).on('error', err=>console.log(err));
            });
        }
    }));
}



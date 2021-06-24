const fs = require('fs');
const data =  fs.readFileSync('./stationList.json');
const files = JSON.parse(data);
let countToAlert = 0;
let countAlert = 0;
for(let i in files.station)
    setInterval(() => {
       if(countToAlert<5)
       {
        if(files.station[i].id==="demo2")
        fs.appendFileSync(files.station[i].path,`5\n`);//${Math.round(Math.random()*10)}
        if(files.station[i].id==="demo1")
        fs.appendFileSync(files.station[i].path,`6\n`);//${Math.round(Math.random()*10)}
        if(files.station[i].id==="demo3")
        fs.appendFileSync(files.station[i].path,`7\n`);//${Math.floor(Math.random() * (10 - 1 + 1)) + 0}
        if(files.station[i].id==="demo4")
        fs.appendFileSync(files.station[i].path,`8\n`);//${Math.floor(Math.random() * (10 - 1 + 1)) + 0}
        if(i==0)
        countToAlert++;
       }
       else if(countAlert<5)
       {
        if(files.station[i].id==="demo2"||files.station[i].id==="demo1")
        fs.appendFileSync(files.station[i].path,`4\n`);//${Math.round(Math.random()*10)}
        else if(files.station[i].id==="demo4"||files.station[i].id==="demo3")
        fs.appendFileSync(files.station[i].path,`9\n`);
        if(i==0)
        countAlert++;
       }
       else
       {
           countToAlert = 0;
           countAlert = 0;
       }
       console.log(countToAlert);
    }, 5000);
const fs = require('fs');
const data =  fs.readFileSync('./stationList.json');
const files = JSON.parse(data);

for(let i in files.station)
    setInterval(() => {
        if(files.station[i].id==="demo2"||files.station[i].id==="demo1")
        fs.appendFileSync(files.station[i].path,`5\n`)//${Math.round(Math.random()*10)}
        if(files.station[i].id==="demo3"||files.station[i].id==="demo4")
        fs.appendFileSync(files.station[i].path,`6\n`)//${Math.round(Math.random()*10)}
      
    }, 1000);
    // console.log(files);
const fs = require('fs');
const data =  fs.readFileSync('./stationList.json');
const files = JSON.parse(data);

for(let i in files.station)
    setInterval(() => {
        fs.appendFileSync(files.station[i].path,`${files.station[i].id}: demo${Math.round(Math.random()*10)}\n`)
      
    }, 1000);
    // console.log(files);
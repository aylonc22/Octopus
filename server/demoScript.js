const fs = require('fs');
const data =  fs.readFileSync('./stationList.json');
const files = JSON.parse(data);

for(let i in files.station)
    setInterval(() => {
        fs.appendFileSync(files.station[i].path,`5\n`)//${Math.round(Math.random()*10)}
      
    }, 1000);
    // console.log(files);
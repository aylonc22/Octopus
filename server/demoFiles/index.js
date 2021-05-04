const fs = require('fs');
const data =  fs.readFileSync('./stationList.json');
const files = JSON.parse(data);
for(let i in files.stations)
    setInterval(() => {
        fs.appendFileSync(files.stations[i].path,`${files.stations[i].id}: demo${(Math.random()*10).round}`)
      
    }, 1000);
    console.log(data);
const fs = require('fs');
const request = require('request');



let fileStream = fs.createWriteStream('node.png');  
request('http://img.pngpicture.com/content/files/clipart/3/people-faces/24347-1.png').pipe(fileStream); 



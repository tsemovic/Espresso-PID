const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:80']
  }
});

var max31855 = require('max31855');
var thermoSensor = new max31855();


while(true){
  setTimeout(function(){
    thermoSensor.readTempC(function(temp) {
      console.log('Temp in degrees celsius: ', temp);
    });
  }, 1000)
}


app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {

  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('my message', (msg) => {
    io.emit('my broadcast', `server: ${msg}`);
  });
  
  setInterval(intervalFunc, 1000);


});

var temp = 0;
function intervalFunc() {
  let date_ob = new Date();

  console.log("TIME : " + date_ob.getSeconds());

  temp++;
  console.log('temperature: ' + temp);
  io.emit('temperature', temp);

}

http.listen(3000, () => {
  console.log('listening on *:3000');
});
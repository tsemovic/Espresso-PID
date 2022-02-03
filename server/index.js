const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:80']
  }
});


import {PythonShell} from 'python-shell';
let pyshell = new PythonShell('./temp.py');

// sends a message to the Python script via stdin
// pyshell.send('hello');

pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message);
});


// end the input stream and allow the process to exit
pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
});


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
// import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect }  from 'react';
import io from 'socket.io-client';

import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';


//const socket = io();
const socket = io.connect("192.168.1.100");

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  const [P, setP] = useState(null);
  const [I, setI] = useState(null);
  const [D, setD] = useState(null);
  const [targetTemperature, setTargetTemperature] = useState(null);

  const [pidRecieved, setPidRecieved] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('recieve_temperature', (fetchedData) => {
      
        setDataArray(fetchedData);
        setCurrentTemperature(fetchedData.at(-1).y.toFixed(2))

        let currentTimeFormatted = new Date(fetchedData.at(-1).x);
        var hours = currentTimeFormatted.getHours();
        var minutes = currentTimeFormatted.getMinutes();
        var seconds = currentTimeFormatted.getSeconds();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
        setCurrentTime(strTime);      
    });

    socket.on("give_PID", (fetchedData) => {
      setP(fetchedData["PID"]["P"]);
      setI(fetchedData["PID"]["I"]);
      setD(fetchedData["PID"]["D"]);
      setTargetTemperature(fetchedData["TargetTemperature"]);

      setPidRecieved(true)
      setTimeout(() => (setPidRecieved(false)), 3000);
    });

    setInterval(function () {
      socket.emit("send_temperature");
    }, 500);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('get_PID');
  }

  return (
    <div className="App">
      <h1 class="text-center fontHeader">Gaggia Controller</h1>
      <Grid2 container spacing={0}>
        <Grid2 xs></Grid2>
        <Grid2 xs={8}>
          <Paper elevation={6} className="curve">

            <p>Current Temperature: { currentTemperature }</p>
            <p>Target Temperature: { targetTemperature }</p>
            <p>P: { P }</p>
            <p>I: { I }</p>
            <p>D: { D }</p>

            <p>Current Time: { currentTime }</p>


            <button onClick={ sendPing }>Send ping</button>
          </Paper>
        </Grid2>
        <Grid2 xs></Grid2>
      </Grid2>
      
    </div>
    
  );
}

export default App;

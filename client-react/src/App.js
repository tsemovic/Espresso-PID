import "./App.css";
import React, { Component, useState, useEffect } from "react";
import io from "socket.io-client";

import Info from "./components/Info.js";
import Graph from "./components/Graph.js";

import Grid2 from "@mui/material/Unstable_Grid2";

//const socket = io();
const socket = io.connect("10.0.0.100");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  const [PIDP, setPIDP] = useState(null);
  const [PIDI, setPIDI] = useState(null);
  const [PIDD, setPIDD] = useState(null);
  const [targetTemperature, setTargetTemperature] = useState(null);

  const [pidRecieved, setPidRecieved] = useState(null);

  useEffect(() => {
    socket.emit("get_PID");

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("recieve_temperature", (fetchedData) => {
      setDataArray(fetchedData);
      setCurrentTemperature(fetchedData.at(-1).y.toFixed(2));
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
      setPIDP(fetchedData["PID"]["P"]);
      setPIDI(fetchedData["PID"]["I"]);
      setPIDD(fetchedData["PID"]["D"]);
      setTargetTemperature(fetchedData["TargetTemperature"]);

      setPidRecieved(true);
      setTimeout(() => setPidRecieved(false), 3000);
    });

    setInterval(function () {
      socket.emit("send_temperature");
    }, 500);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return (
    <div className="App">
      <h1 className="text-center fontHeader titleText">Gaggia Controller</h1>
      <Grid2
        container
        spacing={2}
        alignItems="center"
        style={{
          margin: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Grid2 xs={12} md={6} mdOffset={2}>
          <Graph
              dataArray={dataArray}
              currentTemperature={currentTemperature}
              targetTemperature={targetTemperature}
            />

        </Grid2>
        <Grid2 xs={12} md={2}>
          <Info dataArray={dataArray} currentTemperature={currentTemperature} targetTemperature={targetTemperature} P={PIDP} I={PIDI} D={PIDD} currentTime={currentTime} />
        </Grid2>
      </Grid2>
      <div>
       {/* {dataArray} */}
      </div>
    </div>
  );
}

export default App;

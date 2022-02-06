<template>
  <q-layout view="hHh lpR fFf" class="bg-image">
    <q-page-container>
      <!-- <Graph /> -->
      <div class="row">
        <Graph />
        <Info />
      </div>
      <div class="row">
        <div class="col-3">

          <button v-on:click="setPID">SET PID</button>


        </div>
        <div class="col-6">{{ currentTemperature }}</div>
        <div class="col-3">{{ P }} {{ I }} {{ D }} {{ targetTemperature }} </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
// css setup
import './assets/customCSS.css';

// socket io setup
import io from "socket.io-client";
var socket = io.connect(process.env.VUE_APP_SOCKET_ENDPOINT);

export default {
  components: {
    
  },
  data() {
    return {
      currentTemperature: 'Waiting to connect...',
      P: 1,
      I: 2,
      D: 3,
      targetTemperature: 99,
    }
  },
  created() {
    this.getTemperature()
  },
  mounted(){
    this.askForTemperature();
    this.setPID();
  },
  methods: {
    fillTemperature(fetchedData) {
      this.currentTemperature = fetchedData;
    },
    fillPID(fetchedData) {
      this.targetTemperature = fetchedData["PID"]["P"];
      this.I = fetchedData["PID"]["I"];
      this.D = fetchedData["PID"]["D"];
      this.targetTemperature = fetchedData["TargetTemperature"];
      console.log(fetchedData)
    },
    getTemperature() {
      socket.on("recieve_temperature", fetchedData => {
        this.fillTemperature(fetchedData) 
      }),
      socket.on("recieve_PID", fetchedData => {
        this.fillPID(fetchedData) 
      })
    },
    askForTemperature: function() {
      setInterval(function(){
        socket.emit("send_temperature")
      }, 1000);
    },
    setPID: function() {
      var data = {P:this.P, I:this.I, D:this.D, targetTemperature:this.targetTemperature}
      socket.emit("send_PID", data)
    }
  }
};
</script>

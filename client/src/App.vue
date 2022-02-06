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
        <div class="col-6">{{ test }}</div>
        <div class="col-3">1</div>
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
      test: "waiting to connnect"

    };
  },
  created() {
    this.getTemperature()
  },
  mounted(){
    this.askForTemperature();
    this.setPID();
  },
  methods: {
    fillData(fetchedData) {
      this.test = fetchedData;
    },
    getTemperature() {
      socket.on("temperature", fetchedData => {
        this.fillData(fetchedData) 
      })
    },
    askForTemperature: function() {
      setInterval(function(){
        socket.emit("temperature_give")
      }, 1000);
    },
    setPID: function() {
      var data = {P:1, I:0.03, D:2, TargetTemperature:93}
      socket.emit("PID_update", data)
    }
  }
};
</script>

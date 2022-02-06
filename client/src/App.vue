<template>
  <q-layout view="hHh lpR fFf" class="bg-image">
    <q-page-container>
      <!-- <Graph /> -->
      <div class="row">
        <Graph />
        <Info />
      </div>
      <div class="row">
        <div class="col-3">1</div>
        <div class="col-6">{{ test }}</div>
        <div class="col-3">1</div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import './assets/customCSS.css';
// import SocketioService from './services/socketio.service.js';

// import Graph from './components/Graph.vue'
// import Info from './components/Info.vue'


// export default {
//   name: 'LayoutDefault',

//   components: {
//      Graph,
//      Info
//   },
//   data(){
//       return{
//           test: 30
//       }
//   },
//   created() {
//     SocketioService.setupSocketConnection();
//     SocketioService.getData();
//   },
//   beforeUnmount() {
//     SocketioService.disconnect();
//   }
// }

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
    this.getRealtimeData()
  },
  mounted(){
    this.askForTemperature();
    this.setPID();
  },
  methods: {
    fillData(fetchedData) {
      this.test = fetchedData;
    },
    getRealtimeData() {
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

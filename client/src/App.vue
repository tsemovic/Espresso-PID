<template>
  <q-layout view="hHh lpR fFf" class="bg-image">
    <q-page-container>
      <!-- <Graph /> -->
      <q-page>
        <div class="box">
          <div class="row text-center">
            <div class="col">
              <h1 class="text-center headerFont">GAGGIA CONTROLLER</h1>
            </div>
          </div>

          <div class="row content justify-center">
            <!-- Graph -->
            <div class="graph col-xs-12 col-sm-12 col-md-9 col-lg-6 col-xl-6 q-pa-md">
              <Graph
                v-bind:temperature="temperatureData"
                v-bind:time="timestampData"
              />
            </div>

            <!-- Info -->
            <div class="graph col-xs-12 col-sm-12 col-md-3 col-lg-2 col-xl-3 q-pa-md">
              <Info
                v-bind:P="P"
                v-bind:I="I"
                v-bind:D="D"
                v-bind:targetTemperature="targetTemperature"
                v-bind:temperature="temperatureData"
                @setPID="setPID($event)"
              />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
// css setup
import "./styles/customCSS.css";

// socket io setup
import io from "socket.io-client";
var socket = io.connect(process.env.VUE_APP_SOCKET_ENDPOINT);

// components setup
import Graph from "./components/Graph.vue";
import Info from "./components/Info.vue";

export default {
  components: {
    Graph,
    Info,
  },
  data() {
    return {
      currentTemperature: "Waiting to connect...",

      P: "",
      I: "",
      D: "",
      targetTemperature: "",

      input_P: "",
      input_I: "",
      input_D: "",
      input_targetTemperature: "",

      temperatureData: [],
      timestampData: [],
    };
  },
  created() {
    this.getTemperature(), this.getPID();
  },
  beforeMount() {
    this.getPID2();
  },
  mounted() {
    this.askForTemperature();
    this.askForPID();
  },
  methods: {
    getTemperature() {
      socket.on("recieve_temperature", (fetchedData) => {
        this.currentTemperature = fetchedData.temperature.at(-1);
        this.temperatureData = fetchedData.temperature;
        this.timestampData = fetchedData.timestamp;
      });
    },
    getPID() {
      socket.on("recieve_PID", (fetchedData) => {
        this.P = fetchedData["PID"]["P"];
        this.I = fetchedData["PID"]["I"];
        this.D = fetchedData["PID"]["D"];

        this.input_P = fetchedData["PID"]["P"];
        this.input_I = fetchedData["PID"]["I"];
        this.input_D = fetchedData["PID"]["D"];
        this.input_targetTemperature = fetchedData["TargetTemperature"];
      });
    },
    getPID2() {
      socket.on("give_PID", (fetchedData) => {
        this.P = fetchedData["PID"]["P"];
        this.I = fetchedData["PID"]["I"];
        this.D = fetchedData["PID"]["D"];
        this.targetTemperature = fetchedData["TargetTemperature"];
      });
    },
    askForTemperature: function () {
      setInterval(function () {
        socket.emit("send_temperature");
      }, 1000);
    },
    askForPID: function () {
      socket.emit("get_PID");
    },
    setPID: function (data) {
      // var data = {
      //   P: this.input_P,
      //   I: this.input_I,
      //   D: this.input_D,
      //   targetTemperature: this.input_targetTemperature,
      // };
      socket.emit("send_PID", data);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 12px;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}
.container__item {
  padding: 12px;
  width: 100%;
  margin-top: 24px;
}
.example {
  margin: 0 auto 40px;
  border-bottom: 2px solid #aaa;
  padding-bottom: 20px;
}
</style>

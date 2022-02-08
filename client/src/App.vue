<template>
  <q-layout view="hHh lpR fFf" class="bg-image">
    <q-page-container>
      <!-- <Graph /> -->

      <div class="row text-center">
        <div class="col">
          <h1 class="text-center headerFont">GAGGIA CONTROLLER</h1>
        </div>
      </div>

      <div class="row center">
        <div class="col-auto">
          <Graph v-bind:temperature="temperatureData" v-bind:time="timestampData" />
        </div>
      </div>

      <div class="row center">
        <div class="col-auto">
          <q-card class="my-card bg-secondary text-white">
            <q-card-section>
              <div class="text-h6">Main</div>
              <div class="text-subtitle2">Sub</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-auto">
          <q-card class="my-card bg-secondary text-white">
            <q-card-section>
              <div class="text-h6">Main</div>
              <div class="text-subtitle2">Sub</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- old -->
      <div class="row">
        <div class="col-3">
          <q-btn
            rounded
            color="red"
            v-on:click="setPID"
            icon="settings"
            label="Configuration"
          />

          <q-input
            standout="bg-red text-white"
            bg-color="green"
            ref="hello"
            v-model="input_P"
            label="Custom standout"
          />
          <q-input
            standout="bg-red text-white"
            bg-color="green"
            ref="hello"
            v-model="input_I"
            label="Custom standout"
          />
          <q-input
            standout="bg-red text-white"
            bg-color="green"
            ref="hello"
            v-model="input_D"
            label="Custom standout"
          />
          <q-input
            standout="bg-red text-white"
            bg-color="green"
            ref="hello"
            v-model="input_targetTemperature"
            label="Custom standout"
          />
        </div>
        <div class="col-3">{{ currentTemperature }}</div>
        <div class="col-3">{{ P }} {{ I }} {{ D }} {{ targetTemperature }}</div>
      </div>

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

export default {
  components: {
    Graph
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

      // data_set: [ [ "10:09:12", 27.75 ], [ "10:09:13", 27.75 ], [ "10:09:14", 27.75 ], [ "10:09:15", 27.75 ], [ "10:09:16", 27.75 ], [ "10:09:17", 27.75 ], [ "10:09:18", 27.75 ], [ "10:09:19", 27.75 ], [ "10:09:20", 27.75 ], [ "10:09:21", 21.75 ], [ "10:09:22", 27.75 ], [ "10:09:23", 27.75 ], [ "10:09:24", 28 ], [ "10:09:25", 27.75 ], [ "10:09:26", 27.75 ], [ "10:09:27", 27.75 ], [ "10:09:28", 27.75 ], [ "10:09:29", 27.75 ], [ "10:09:30", 28 ], [ "10:09:31", 27.75 ], [ "10:09:32", 27.75 ], [ "10:09:33", 27.75 ], [ "10:09:34", 27.75 ], [ "10:09:35", 27.75 ], [ "10:09:36", 27.75 ], [ "10:09:37", 27.75 ], [ "10:09:38", 27.75 ], [ "10:09:39", 27.75 ], [ "10:09:40", 27.75 ], [ "10:09:41", 27.75 ] ],
      temperatureData: [],
      timestampData: []
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
    setPID: function () {
      var data = {
        P: this.input_P,
        I: this.input_I,
        D: this.input_D,
        targetTemperature: this.input_targetTemperature,
      };
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

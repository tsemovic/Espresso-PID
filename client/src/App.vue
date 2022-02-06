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
          <Graph v-bind:temperature="currentTemperature" />
        </div>
      </div>

      <div class="row center">
        <div class="col-auto">
          <q-card class="my-card bg-secondary text-white">
            <q-card-section>
              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-auto">
          <q-card class="my-card bg-secondary text-white">
            <q-card-section>
              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle2">by John Doe</div>
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
            ref="hello"
            v-model="input_P"
            label="Custom standout"
          />
          <q-input
            standout="bg-red text-white"
            ref="hello"
            v-model="input_I"
            label="Custom standout"
          />
          <q-input
            standout="bg-red text-white"
            ref="hello"
            v-model="input_D"
            label="Custom standout"
          />
          <q-input
            standout="bg-red text-white"
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
    Graph,
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
        this.currentTemperature = fetchedData;
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

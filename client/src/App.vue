<template>
  <q-layout view="hHh lpR fFf" class="bg-image">
    <q-page-container>
      <!-- <Graph /> -->
      <q-page>
        <div class="box">
          <div class="row text-center">
            <div class="col">
              <h1 class="text-center fontHeader">
                GAGGIA CONTROLLER {{settingsJsonData}}
              </h1>
            </div>
          </div>

          <div class="row content justify-center">
            <!-- Graph -->
            <div
              ref="graph"
              class="
                graph
                col-xs-12 col-sm-12 col-md-9 col-lg-6 col-xl-6
                q-pa-sm
              "
            >
              <Graph
                v-bind:temperature="temperatureData"
                v-bind:time="timestampData"
                v-bind:dataArray="dataArray"
                v-bind:chartHeight="chartHeight"
              />
            </div>

            <!-- Info -->
            <div
              class="
                info
                col-xs-12 col-sm-12 col-md-3 col-lg-2 col-xl-3
                q-pa-sm
              "
            >
              <Info
                v-bind:P="P"
                v-bind:I="I"
                v-bind:D="D"
                v-bind:targetTemperature="targetTemperature"
                v-bind:currentTemperature="currentTemperature"
                v-bind:pidRecieved="pidRecieved"
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

// imports setup
import Graph from "./components/Graph.vue";
import Info from "./components/Info.vue";
import "./styles/customCSS.css";
import io from "socket.io-client";
import json from '../public/settings.json';

var socket = io.connect(json.VUE_SOCKET_ENDPOINT);

export default {
  components: {
    Graph,
    Info,
  },
  data() {
    return {
      settingsJsonData: json,

      P: "",
      I: "",
      D: "",
      targetTemperature: "",
      currentTemperature: "",
      dataArray: [],

      vueSocketEndpoint: "",

      chartHeight: null,
      pidRecieved: false,
    };
  },
  created() {
    this.getTemperature(), this.getPID();
  },
  beforeMount() {
    this.getPID();
  },
  mounted() {
    this.askForTemperature();
    this.askForPID();
    this.$nextTick(function () {
      window.addEventListener("resize", this.updateChartHeight);
      this.updateChartHeight();
    });
  },
  methods: {
    getTemperature() {
      socket.on("recieve_temperature", (fetchedData) => {
        this.dataArray = fetchedData;
        this.currentTemperature = fetchedData.at(-1).y.toFixed(2);
      });
    },
    getPID() {
      socket.on("give_PID", (fetchedData) => {
        this.P = fetchedData["PID"]["P"];
        this.I = fetchedData["PID"]["I"];
        this.D = fetchedData["PID"]["D"];
        this.targetTemperature = fetchedData["TargetTemperature"];

        this.pidRecieved = true;
        setTimeout(() => (this.pidRecieved = false), 3000);
      });
    },
    askForTemperature: function () {
      setInterval(function () {
        socket.emit("send_temperature");
      }, 500);
    },
    askForPID: function () {
      socket.emit("get_PID");
    },
    setPID: function (data) {
      socket.emit("send_PID", data);
    },
    updateChartHeight() {
      this.chartHeight = this.$refs.graph.clientHeight;
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
</style>

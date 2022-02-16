<template>
  <q-layout view="hHh lpR fFf" class="bg-image">
    <q-page-container>
      <!-- <Graph /> -->
      <q-page>
        <div class="box">
          <div class="row text-center">
            <div class="col">
              <h1 class="text-center fontHeader">GAGGIA CONTROLLER</h1>
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
                v-bind:temperature="temperatureData"
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

      // chartHeight: this.$refs.graph.clientHeight,
      chartHeight: null,

      pidRecieved: false,

      dataArray: [],
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
    // this.updateChartHeight();

    this.$nextTick(function () {
      window.addEventListener("resize", this.updateChartHeight);

      this.updateChartHeight();
    });
  },
  methods: {
    getTemperature() {
      socket.on("recieve_temperature", (fetchedData) => {
        this.dataArray = fetchedData;
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
      }, 2000);
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
.example {
  margin: 0 auto 40px;
  border-bottom: 2px solid #aaa;
  padding-bottom: 20px;
}
</style>

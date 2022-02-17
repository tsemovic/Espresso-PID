<template>
  <!-- <q-card class="my-card bg-white text-white"> -->
  <q-card class="rounded graph-container bg-white text-black">
    <q-card-section class="graph-card">
      <!-- {{dataArray}} -->
      <!-- {{ chartData }} -->
      <apexchart
        class="graph-graph"
        width="100%"
        ref="chart"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </q-card-section>
  </q-card>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import "../styles/customCSS.css";

export default {
  name: "LineExample",
  components: {
    apexchart: VueApexCharts,
  },
  props: ["temperature", "time", "chartHeight", "dataArray"],
  data: function () {
    return {
      chartData: [],
      labelColor: "592D1D",
      intervalid1: null,
      chartOptions: {
        chart: {
          id: "realtime",
          type: "line",
          grid: {
            padding: {
              left: 0,
              right: 0,
            },
          },
          redrawOnWindowResize: true,
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 500,
            },
            animateGradually: {
              enabled: true,
              delay: 2,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        colors: ["#D95448", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],

        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          // text: "Temperature",
          align: "left",
        },
        markers: {
          size: 0,
        },
        tooltip: {
          enabled: true,
          followCursor: true,
          fillSeriesColor: true,
          x: {
            show: false,
          },
        },
        xaxis: {
          type: "datetime",
          tickAmount: 3,
          range: 30000,
          labels: {
            style: {
              colors: "#592D1D",
            },
            formatter: function (timestamp) {
              var currentDate = new Date();

              // var date = new Date(timestamp);
              // var label =
              //   date.getHours() +
              //   ":" +
              //   date.getMinutes() +
              //   ":" +
              //   ("0" + date.getSeconds()).slice(-2);

              var label = "";

              if (timestamp >= currentDate.getTime() - 31000) {
                label = "T-30";
              }

              if (timestamp >= currentDate.getTime() - 21000) {
                label = "T-20";
              }

              if (timestamp >= currentDate.getTime() - 11000) {
                label = "T-10";
              }

              if (timestamp >= currentDate.getTime() - 1000) {
                label = "Now";
              }

              return label;
            },
            // rotateAlways: true,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#592D1D",
            },
          },
          title: {
            text: "TEMPERATURE (°C)",
            rotate: -90,
            offsetX: -5,
            offsetY: 0,
            style: {
              color: "#592D1D",
              fontSize: "12px",
              fontFamily: "customfont2",
              fontWeight: 600,
            },
          },
        },
        legend: {
          show: false,
        },
      },
      series: [
        {
          name: "Temperature",
          data: this.temperature,
        },
      ],
    };
  },
  mounted() {
    this.updateChart();
  },
  watch: {
    chartHeight: function () {
      this.resize();
    },
  },
  methods: {
    // Method to resize chart on window resize
    resize() {
      setTimeout(
        () =>
          (this.chartOptions = {
            chart: {
              height: "100%",
            },
          }),
        3000
      );
    },
    initChart: function () {
      this.chartData = this.dataArray;
    },
    updateChart: function () {
      var me = this;
      this.intervalid1 = setInterval(() => {
        // If the chart data isn't populated (replace with dataArray)
        if (this.chartData.length < 25) {
          this.initChart();
        }

        // Replace chart data array (avoid memory leaks)
        if (this.chartData.length > 360) {
          this.chartData = this.dataArray;
        }

        // Add data to chart dict
        this.dict = {
          x: this.dataArray[this.dataArray.length - 1].x,
          y: this.dataArray[this.dataArray.length - 1].y,
        };

        this.chartData.push(this.dict);

        // Update chart
        me.$refs.chart.updateSeries([
          {
            data: this.chartData,
          },
        ]);
      }, 500);
    },
  },
};
</script>
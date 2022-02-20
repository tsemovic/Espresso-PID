<template>
  <!-- <q-card class="my-card bg-white text-white"> -->
  <q-card class="rounded graph-container bg-primary text-secondary">
    <q-card-section class="graph-card">
      <!-- {{dataArray}} -->
      <!-- {{ temperatureData }} -->
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
  props: ["chartHeight", "dataArray", "settings", "targetTemperature"],
  data: function () {
    return {
      temperatureData: [],
      targetData: [],
      labelColor: "592D1D",
      intervalid1: null,
      chartOptions: {
        chart: {
          id: "realtime",
          type: "line",
          grid: {
            show: false, // you can either change hear to disable all grids

            yaxis: {
              lines: {
                show: false, //or just here to disable only y axis
              },
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
        grid: {
          show: false,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        colors: [
          this.settings.VUE_COLOUR.accent,
          this.settings.VUE_COLOUR.info,
        ],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          lineCap: "butt",
          width: [5, 2],
          dashArray: [0, 10],
        },
        title: {
          align: "left",
        },
        markers: {
          size: 0,
        },
        tooltip: {
          enabled: false,
          followCursor: false,
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
              colors: this.settings.VUE_COLOUR.secondary,
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
          axisBorder: {
            show: true,
            color: this.settings.VUE_COLOUR.info,
            offsetX: -4,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            color: this.settings.VUE_COLOUR.info,
          },
        },
        yaxis: {
          labels: {
            offsetX: -5,
            style: {
              colors: this.settings.VUE_COLOUR.secondary,
            },
          },
          title: {
            text: "TEMPERATURE (°C)",
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: this.settings.VUE_COLOUR.secondary,
              fontSize: "12px",
              fontFamily: "customfont2",
              fontWeight: 600,
            },
          },
          axisBorder: {
            show: true,
            color: this.settings.VUE_COLOUR.info,
            offsetX: 0,
            offsetY: 0,
          },
        },
        legend: {
          show: false,
        },
      },
      series: [
        {
          name: "Temperature",
          data: this.dataArray,
        },
        {
          name: "Target",
          data: this.targetTemperature,
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
      this.temperatureData = this.dataArray;

      let currentTime = new Date(this.dataArray[this.dataArray.length - 1].x);
      var backInTime = currentTime - 60000;

      for (var i = backInTime; i <= currentTime; i += 1000) {
        this.targetData.push({
          x: new Date(i),
          y: this.targetTemperature,
        });
      }

      this.targetData.push({
        x: this.dataArray[this.dataArray.length - 1].x,
        y: this.targetTemperature,
      });
    },
    updateChart: function () {
      var me = this;
      this.intervalid1 = setInterval(() => {
        // If the chart data isn't populated (replace with dataArray)
        if (this.temperatureData.length < 25) {
          this.initChart();
        }

        // Replace chart data array (avoid memory leaks)
        if (this.temperatureData.length > 600) {
          this.temperatureData = this.dataArray;
          this.targetData = this.targetData.slice(
            this.targetData.length - 60,
            this.targetData.length
          );
        }

        // Add chart temperature data
        let newTemperature = {
          x: this.dataArray[this.dataArray.length - 1].x,
          y: this.dataArray[this.dataArray.length - 1].y,
        };
        this.temperatureData.push(newTemperature);

        // Add chart target data
        let newTarget = {
          x: this.dataArray[this.dataArray.length - 1].x,
          y: this.targetTemperature,
        };
        this.targetData.push(newTarget);

        // Update chart
        me.$refs.chart.updateSeries([
          {
            name: "Temperature",
            data: this.temperatureData,
          },
          {
            name: "Target",
            data: this.targetData,
          },
        ]);
      }, 500);
    },
  },
};
</script>
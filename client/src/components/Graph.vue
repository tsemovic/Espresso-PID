<template>
  <!-- <q-card class="my-card bg-white text-white"> -->
  <q-card class="rounded graph-container bg-white text-black">
    <q-card-section class="graph-card">
      {{ this.time.at(-1) }}
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
  props: ["temperature", "time", "chartHeight"],
  data: function () {
    return {
      testData: [],
      temp: 1,
      dict: {},
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
              delay: 1,
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
          // type: "numeric",
          // range: 29,
          labels: {
            style: {
              colors: "#592D1D",
            },
            formatter: function (timestamp) {
              var date = new Date(timestamp);
              var currentDate = new Date();
              var label =
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                ("0" + date.getSeconds()).slice(-2);

              if (date.getSeconds() == currentDate.getSeconds() - 10) {
                label = "10 Seconds Ago";
              }

              if (date.getSeconds() == currentDate.getSeconds() - 20) {
                label = "20 Seconds Ago";
              }

              if (date.getSeconds() == currentDate.getSeconds() - 30) {
                label = "30 Seconds Ago";
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
  created() {
    // this.updateChart();
  },
  mounted() {
    this.updateChart();
  },
  watch: {
    chartHeight: function () {
      this.resize();
      // alert("tt");
    },
  },
  methods: {
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
    updateChart: function () {
      var me = this;
      this.intervalid1 = setInterval(() => {
        if (this.testData.length > 3600) {
          this.testData = this.testData.slice(-32, -1);
        }

        var today = new Date();
        var date = today.getTime();
        this.dict = { x: date, y: this.temperature.at(-1) };
        this.testData.push(this.dict);

        me.$refs.chart.updateSeries([
          {
            data: this.testData,
          },
        ]);
      }, 500);
    },
  },
};
</script>
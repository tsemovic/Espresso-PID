<template>
  <!-- <q-card class="my-card bg-white text-white"> -->
  <q-card class="rounded graph-container bg-white text-black">
    <q-card-section class="graph-card">
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
      labelColor: "592D1D",
      testData: 1,
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
              delay: 0,
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
          categories: this.time,
          labels: {
            style: {
              colors: "#592D1D",
            },
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
      // var me = this;
      this.intervalid1 = setInterval(() => {
        var current = this.temperature.at(-1);

        var newMin = Math.floor((current + 1) / 10) * 10 - 20;
        var newMax = Math.ceil(current / 10) * 10 + 20;

        this.testData = this.testData + 1;
        this.chartOptions = {
          xaxis: {
            categories: this.time,
          },
          yaxis: {
            min: newMin,
            max: newMax,
            labels: {
              style: {
                colors: "#592D1D",
              },
            },
          },
        };
        this.series = [
          {
            data: this.temperature,
          },
        ];
        // me.$refs.chart.updateSeries([
        //   {
        //     data: this.temperature,
        //   },
        // ]);
      }, 1000);
    },
  },
};
</script>
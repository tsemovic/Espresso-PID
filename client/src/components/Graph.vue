<template>
    <q-card class="my-card bg-white text-white">
      <q-card-section>
        <apexchart
          width="100%"
          height="100%"
          type="line"
          ref="chart"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </q-card-section>
    </q-card>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "LineExample",
  components: {
    apexchart: VueApexCharts,
  },
  props: ["temperature", "time"],
  data: function () {
    return {
      testData: 1,
      intervalid1: null,
      chartOptions: {
        chart: {
          id: "realtime",
          // height: 350,
          type: "line",
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
        xaxis: {
          categories: this.time,
        },
        yaxis: {
          

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
  methods: {
    updateChart: function () {
      this.intervalid1 = setInterval(() => {

        var current = this.temperature.at(-1)

        var newMin = (Math.floor((current+1)/10)*10) - 20;
        var newMax = (Math.ceil(current / 10) * 10) + 20;

        this.testData = this.testData + 1;
        this.chartOptions = {
          xaxis: {
            categories: this.time,
          },
          yaxis:{
            min: newMin,
            max: newMax
          }
        };
        this.series = [
          {
            data: this.temperature,
          },
        ];
      }, 1000);
    },
  },
};
</script>
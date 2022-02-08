<template>
  <div class="example">
    <q-card class="my-card bg-white text-white">
      <q-card-section>
        <apexchart
          width="700"
          height="350"
          type="line"
          ref="chart"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </q-card-section>
    </q-card>
  </div>
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
          height: 350,
          type: "line",
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
          max: 150,
          min: 70,
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
        this.testData = this.testData + 1;
        this.chartOptions = {
          xaxis: {
            categories: this.time,
          },
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
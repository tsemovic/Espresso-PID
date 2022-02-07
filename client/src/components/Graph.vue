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

    <div>
      <button @click="updateChart">Update!</button>
    </div>
    <div>{{ temperature}}</div>
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
      chartOptions: {
        chart: {
          id: "realtime",
          height: 350,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Temperature",
          align: "left",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "category",
        },
        yaxis: {
          max: 100,
        },
        legend: {
          show: false,
        },
      },
      series: [
        {
          name: "Temperature",
          // data: this.dataArray,
          data: [{
            x: this.temperature,
            y: this.time
          }]
        },
      ],
    };
  },
  mounted() {
    // this.updateChart();
  },
  methods: {
    updateChart: function () {
      // In the same way, update the series option
        this.series = [
          {
            data: [{
              x: this.temperature,
              y: this.time
            }]
          },
        ];
    },
  },
};
</script>
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
  props: ["dataArray"],
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: 'realtime',
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Temperature',
          align: 'left'
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'time',
        },
        yaxis: {
          max: 100
        },
        legend: {
          show: false
        },
      },
      series: [
        {
          name: "Temperature",
          data: this.dataArray,
        },
      ],
    };
  },
};
</script>
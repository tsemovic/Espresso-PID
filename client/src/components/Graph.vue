<template>
  <div class="example">
    <q-card class="my-card bg-white text-white">
      <q-card-section>
        <apexchart
          width="700"
          height="350"
          type="line"
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
  data: function () {
    return {
      chartOptions: {
        xaxis: {
          type: "datetime",
          categories: [
            "01/01/2003",
            "02/01/2003",
            "03/01/2003",
            "04/01/2003",
            "05/01/2003",
            "06/01/2003",
            "07/01/2003",
            "08/01/2003",
          ],
        },
      },
      series: [
        {
          name: "Series A",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            20,
            {
              min: 10,
              max: 20,
            }
          ),
        },
        {
          name: "Series B",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            20,
            {
              min: 10,
              max: 20,
            }
          ),
        },
      ],
    };
  },
  methods: {
    generateDayWiseTimeSeries(baseval, count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = baseval;
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;
        series.push([x, y]);
        baseval += 86400000 * 7;
        i++;
      }
      return series;
    },
  },
};
</script>
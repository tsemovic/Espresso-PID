import React, { useState } from "react";
import Chart from "react-apexcharts";
import {COLORS} from "../style.js"

export default function ApexChart(props) {
  const series = [
    {
        name: "TEMPERATURE",
        data: props.data
    },
    {
        name:"TARGET",
        data: props.targetData
    }
  ];
  const options = {
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
            COLORS.chart,
         COLORS.targetLine,
       ],
      colors: [COLORS.temperatureLine, COLORS.targetLine],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        lineCap: "butt",
        width: [5, 2],
        dashArray: [0, 0],
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
        //type: "datetime",
        //tickAmount: 3,
        title: {
            text: "PAST 30 SECONDS",
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
                color: COLORS.chartText,
                fontSize: "12px",
                fontFamily: "customfont2",
                fontWeight: 600,
            },
        },
        range: 30,
         labels: {
           style: {
            colors: COLORS.chartText,
          },
          formatter: function (timestamp) {
            var label = "";
            return label;
          },
          // rotateAlways: true,
        },
        axisBorder: {
          show: true,
          color: COLORS.chartText,
          offsetX: -4,
          offsetY: 0,
        },
        axisTicks: {
          show: true,
          color: COLORS.chartText,
        },
      },
      yaxis: {
        labels: {
          offsetX: -5,
          style: {
            colors: COLORS.chartText
          },
        },
        title: {
          text: "TEMPERATURE (°C)",
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: COLORS.chartText,
            fontSize: "12px",
            fontFamily: "customfont2",
            fontWeight: 600,
          },
        },
        axisBorder: {
          show: true,
          color: COLORS.chartText,
          offsetX: 0,
          offsetY: 0,
        },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        fontSize: "16px",
        fontFamily: "customFont2",
        fontWeight: "450",
        labels: {
          colors: COLORS.chartText,
          useSeriesColors: false,
        },
        onItemClick: {
          toggleDataSeries: false,
        },
        onItemHover: {
          highlightDataSeries: false,
        },
      },
  };
  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={390}/>
    </div>
  );
}

import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Paper from "@mui/material/Paper";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "realtime",
          grid: {
            show: false, // you can either change hear to disable all grids

            yaxis: {
              lines: {
                show: false, //or just here to disable only y axis
              },
            },
          },
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
          name: "DATA",
          data: 30,
        },
      ],
    };
  }

  render() {
    const temperatureData = [];
    const targetData = [];

    const initChart = () => {
      temperatureData = this.props.dataArray;

      const currentTime = Date(
        this.props.dataArray[this.props.dataArray.length - 1].x
      );

      const backInTime = currentTime - 60000;
      for (var i = backInTime; i <= currentTime; i += 1000) {
        targetData.push({
          x: new Date(i),
          y: this.props.targetTemperature,
        });
      }

      targetData.push({
        x: this.props.dataArray[this.props.dataArray.length - 1].x,
        y: this.targetTemperature,
      });
    };

    const updateChart = () => {
      alert("update");

      const interval = setInterval(() => {
        // If the chart data isn't populated (replace with dataArray)
        if (temperatureData.length < 25) {
          initChart();
        }

        // Replace chart data array (avoid memory leaks)
        if (temperatureData.length > 600) {
          temperatureData = this.props.dataArray;
          targetData = targetData.slice(
            targetData.length - 60,
            targetData.length
          );
        }
        // Add chart temperature data
        let newTemperature = {
          x: this.props.dataArray[this.props.dataArray.length - 1].x,
          y: this.props.dataArray[this.props.dataArray.length - 1].y,
        };
        temperatureData.push(newTemperature);

        // Add chart target data
        let newTarget = {
          x: this.props.dataArray[this.props.dataArray.length - 1].x,
          y: this.props.targetTemperature,
        };
        targetData.push(newTarget);

        // Update chart
        const newSeries = [];

        this.state.series.map((s) => {
          alert(s.name);

          const data = temperatureData.map((val) => {
            return val.x, val.y;
          });

          newSeries.push({ data, name: s.name });
        });

        newSeries.push();

        this.setState({
          series: newSeries,
        });
      }, 500);
    };

    // const alertData = () => {
    //   const newSeries = [];

    //   this.state.series.map((s) => {
    //     if (s.name == "DATA") {
    //       const data = temperatureData.map((val) => {
    //         return val.x, val.y;
    //       });
    //     } else {
    //       const data = targetData.map((val) => {
    //         return val.x, val.y;
    //       });
    //     }

    //     newSeries.push({ data, name: s.name });
    //   });

    //   newSeries.push();

    //   this.setState({
    //     series: newSeries,
    //   });
    //   //   alert(newSeries);
    // };

    return (
      <Paper elevation={6} className="curve">
        <Chart
          class="graph-graph"
          width="100%"
          ref="chart"
          options={this.state.options}
          series={this.state.series}
        ></Chart>

        <button onClick={updateChart}>Get PID</button>
      </Paper>
    );
  }
}

export default Graph;

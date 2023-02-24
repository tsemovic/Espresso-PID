import React, { Component, useState, useEffect} from "react";
import Paper from "@mui/material/Paper";
import ChartViewer from "./ChartViewer";


class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [0],
            targetData: [0]
        };
    }

    componentDidMount(){
        this.interval = setInterval(this.updateTemperatureData, 500);
    }

    updateTemperatureData = () => {
        var newArray = this.state.data
        newArray.push(this.props.currentTemperature)

        var arrayMaxLength = 3000
        if(newArray.length > arrayMaxLength){
            newArray = newArray.slice(newArray.length - arrayMaxLength)
        }

        this.setState({data: newArray})


        var newTarget = this.state.targetData
        newTarget.push(this.props.targetTemperature)

        var newTargetMax = 3000
        if(newTarget.length > newTargetMax){
            newTarget = newTarget.slice(newArray.length - newTargetMax)
        }

        this.setState({targetData: newTarget})
    }

    render() {
        return (
            <div className="curve shadow card">
                <ChartViewer data={this.state.data} targetData={this.state.targetData} title="Product Trends by Month" />
            </div>
        );
    }
}

export default Info;

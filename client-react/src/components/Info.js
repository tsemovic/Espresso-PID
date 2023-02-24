import React, { Component, useState, useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Button, Container} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
class Info extends Component {

  render() {
    return (
      <div>
        <Grid2
          container
          spacing={2}
          alignItems="center"
          style={{
            margin: 0,
            width: "100%",
            height: "100%",
          }}
        >
        <Grid2 xs={12}>
          <div class="curve shadow card">
            <div class="cardText">TEMPERATURE</div>
            <div class="cardText temperatureText">{this.props.currentTemperature}</div>
            <div class="cardText">TIME</div>
            <div class="cardText">{this.props.currentTime}</div>
          </div>
        </Grid2>
        <Grid2 xs={12}>
          <div class="curve shadow card">
            <div class="cardText">TARGET TEMPERATURE</div>
            <div class="cardText temperatureText">{this.props.targetTemperature}</div>

          </div>
        </Grid2>
        <Grid2 xs={12}>
          <div class="curve shadow card">
            <div class="cardText">CONFIGURATION</div>
            <div class="pid-container">
              <div class="text-h5 text-weight-bold pid-item text-info">
                P:<span class="text-h5">{this.props.P}</span>
              </div>
              <div class="text-h5 text-weight-bold pid-item text-info">
                I:<span class="text-h5">{this.props.I}</span>
              </div>
              <div class="text-h5 text-weight-bold pid-item text-info">
                D:<span class="text-h5">{this.props.D}</span>
              </div>
            </div>

            <Container sx={{ pt: 2}}>
              <div className="curve settingsButton">SETTINGS</div>
            </Container>

          </div>
        </Grid2>
        
      </Grid2>
      </div>
      
    );
  }
}

export default Info;

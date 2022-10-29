import React, { Component, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";

class Info extends Component {
  render() {
    return (
      <div>
        <Paper elevation={6} className="curve">
          <div>
            <p>Hello I am info!</p>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Info;

import React, { Component } from "react";
import QrScanner from "react-qr-reader";


class Webcam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startCheckin: false,
      qrRead: "No result"
    };
  };

  turnOn = () => {
    this.setState({
      startCheckin: true
    });
  };

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      });
      let userId = data;
      // console.log(userId);
      this.props.checkIn(userId);
    }
  };

  render() {
    return (
      <div>
        <button className="btn btn-outline-success btn-block mb-2" onClick={this.turnOn}>Start Check In</button>
        {this.state.startCheckin ?
          <QrScanner
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%" }}
          />
          :
          <div />
        }
      </div>
    );
  }
}

export default Webcam;
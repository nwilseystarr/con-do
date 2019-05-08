import React, { Component } from "react";
import QrScanner from 'react-qr-reader'


class Webcam extends Component {
  constructor(){
    super()
    this.state = {
      turnOn: false,
      qrRead: "No result"
    }

    
  }
  turnOn = ()=>{
    this.setState({
      turnOn: true
    })
    let videoElem = document.getElementById("videoElement")
     const qrScanner = new QrScanner(videoElem, result => console.log('decoded qr code:', result))
  }
  handleScan = data =>{
    if(data){
      this.setState({
        result: data
      })
    }
  }
  
    render() {
        // let video = document.querySelector("#videoElement");
        // if (navigator.mediaDevices.getUserMedia) {
        //     navigator.mediaDevices.getUserMedia({ video: true })
        //       .then(function (stream) {
        //         video.srcObject = stream;
        //       })
        //       .catch(function (err0r) {
        //         console.log("Something went wrong!");
        //       });
        //   }

      
        return (
        <div>
          <button onClick={this.turnOn}>Turn on Webcam</button>

          <QrScanner
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%'}}/>
        </div>
        );
    }
}

export default Webcam;
import React, { Component } from "react";
import QrScanner from 'react-qr-reader'


class Webcam extends Component {
  constructor(){
    super()
    this.state = {
      startCheckin: false,
      qrRead: "No result"
    }

    
  }
  turnOn = ()=>{
    this.setState({
      startCheckin: true
    })
  }
  handleScan = data =>{
    if(data){
      this.setState({
        result: data
      })
      let userId = data[data.length - 1]
      console.log(userId)
      this.props.checkIn(userId)
    }
  }
  
    render() {

      
        return (
        <div>
          <button className="btn btn-outline-dark" onClick={this.turnOn}>Turn on Webcam</button>
          {this.state.startCheckin ? <QrScanner
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%'}}/>: <div/>}
          
        </div>
        );
    }
}

export default Webcam;
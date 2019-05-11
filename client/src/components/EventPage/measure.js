import React, { Component } from "react";


class Measure extends Component {
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
            <span>{this.props.measureInfo.name}</span>
          
        </div>
        );
    }
}

export default Measure;
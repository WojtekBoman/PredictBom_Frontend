import React from 'react';
import {connect} from 'react-redux';
import { Chart } from 'react-chartjs-2';

class LineChart extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
      }

      setUnit(time) {
          if(time < 60 * 1000) {
            return "second"
          }else if(time > 60 * 1000 && time < 60*60*1000){
            return "minute"
          }else if( time < 24*60*60*1000 && time > 60*60*1000){
            return "hour"
          }else{
            return "day"
          }
      }
    
      componentDidUpdate() {
        this.myChart.data.labels = this.props.transactions.map(d => new Date(d.transactionDate).getTime());
        this.myChart.data.datasets[0].data = this.props.transactions.map(d => d.price);
       
        if(this.props.transactions.length > 0){
        let time = (new Date(this.props.transactions[this.props.transactions.length-1].transactionDate).getTime() - new Date(this.props.transactions[0].transactionDate).getTime())
        let unit = this.setUnit(time)
        this.myChart.options.scales.xAxes[0].time.unit = unit;
        }

        this.myChart.update();
      }
    
      componentDidMount() {
        
        this.myChart = new Chart(this.canvasRef.current, {
          type: 'line',
          options: {
            scales: {
              xAxes: [
                {
                  type: 'time',
                  time: {
                    unit: 'month'
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    min: 0
                  }
                }
              ]
            }
          },
          data: {
            labels: this.props.transactions.map(d => new Date(d.transactionDate).getTime()),
            datasets: [{
              label: this.props.title,
              data: this.props.transactions.map(d => d.price),
              fill: 'none',
              backgroundColor: this.props.color,
              pointRadius: 2,
              borderColor: this.props.color,
              borderWidth: 1,
              lineTension: 0
            }]
          }
        });
      }

      render() {
        return <canvas ref={this.canvasRef} />;
      }
}

export default LineChart;
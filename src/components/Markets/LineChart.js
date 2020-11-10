import React from 'react';
import {connect} from 'react-redux';
import { Chart } from 'react-chartjs-2';

class LineChart extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
      }
    
      componentDidUpdate() {
        this.myChart.data.labels = this.props.transactions.map(d => new Date(d.transactionDate).getTime());
        this.myChart.data.datasets[0].data = this.props.transactions.map(d => d.price);
        this.myChart.update();
        console.log(this.myChart.data.labels)
      }
    
      componentDidMount() {

        this.myChart = new Chart(this.canvasRef.current, {
          type: 'line',
          options: {
      maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  type: 'time',
                  time: {
                    unit: 'minute'
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
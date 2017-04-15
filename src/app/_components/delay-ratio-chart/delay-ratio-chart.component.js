import * as helpers from '../../_core/core.helpers';

class DelayRatioChartController {
  /** @ngInject */
  constructor($timeout) {
    this.chart = {};
    this.$timeout = $timeout;
    this.selectedPoints = [];
  }
  createChartDataFromRowData(groupToDates) {
    const seriesData = [];
    for (const key in groupToDates) {
      if (groupToDates[key]) {
        const group = groupToDates[key];
        // defined variable to get sum of delays to use it for avarage calculation
        let delaysSum = 0;
        let elapsedTimeSum = 0;
        group.forEach(element => {
          delaysSum += element.ARR_DELAY;
          elapsedTimeSum += element.CRS_ELAPSED_TIME;
        }, this);
        // push the daily avarage data
        seriesData.push({
          name: new Date(key).getDate(),
          y: parseInt((delaysSum / elapsedTimeSum * 100), 10)
        });
      }
    }
    return {
      seriesData
    };
  }

  calculatePlotLine(event) {
    const chart = this.series.chart;
    let avarage = 0;
    // we have to remove all plotlines to be able to add the updated one
    chart.yAxis[0].removePlotLine();
    // depending on event type add or remove the point from the selected points
    if (event.type === 'select') {
      if (event.accumulate) {
        this.selectedPoints.push(this);
      } else {
        this.selectedPoints = [this];
      }
    } else if (event.type === 'unselect') {
      const index = this.selectedPoints.indexOf(this);
      if (index > -1) {
        this.selectedPoints.splice(index, 1);
      }
    }
    // create average
    let ySum = 0;
    angular.forEach(this.selectedPoints, value => {
      ySum += value.y;
    });
    avarage = parseInt((ySum / this.selectedPoints.length), 10);
    // add new plotline with new average value
    chart.yAxis[0].addPlotLine({
      label: {text: 'Avg Delay Ratio: ' + avarage.toString() + '%'},
      color: 'black',
      value: avarage,
      width: '3',
      zIndex: 100
    });

    // redraw the chart to reflect new plotline
    chart.redraw();
  }

  $onChanges(changes) {
    if (changes.chartData.currentValue) {
      const flightDetails = changes.chartData.currentValue;
      const chartData = this.createChartDataFromRowData(helpers.groupFlightDetailsToDate(flightDetails));

      const calculatePlotLine = event => calculatePlotLine.bind(event);

      this.chart = {
        chart: {
          type: 'column'
        },
        tooltip: {
          formatter() {
            return '<br/><b>Delay Ratio:</b> ' + Highcharts.numberFormat(this.y, 0, '.') + '%';
          }
        },
        title: {
          text: 'Delay to Total Elapsed Time Ratio (%)',
          css: {fontSize: '56px'}
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: 'category',
          title: {
            text: 'Day of the Month',
            css: {fontSize: '50px;'}
          }
        },
        yAxis: {
          title: {
            text: 'Delay Ratio %'
          },
          labels: {
            formatter() {
              return this.value + ' %';
            }
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            allowPointSelect: true,
            dataLabels: {
              enabled: false
            },
            compare: 'percent',
            cursor: 'pointer',
            point: {
              events: {
                select: calculatePlotLine,
                unselect: calculatePlotLine
              }
            }
          },
          column: {
            zones: [{
              value: -10, // Values up to 10 (not including) ...
              color: 'green' // ... have the color blue.
            }, {
              value: 10, // Values up to 10 (not including) ...
              color: 'yellow' // ... have the color blue.
            }, {
              color: 'red' // Values from 10 (including) and up have the color red
            }]
          }
        },

        series: [{
          name: 'Delay Ratio %',
          colorByPoint: true,
          data: chartData.seriesData
        }]
      };
    }
  }
}

export default angular.module('ria.components.delay-ratio-chart', [])
  .component('riaDelayRatioChart', {
    controller: DelayRatioChartController,
    controllerAs: 'ctrl',
    template: require('./delay-ratio-chart.template.html'),
    bindings: {
      chartData: '<'
    }
  }).name;


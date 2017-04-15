import * as helpers from '../../_core/core.helpers';

class ChartController {
  /** @ngInject */
  constructor() {
    this.chart = {};
  }

  createChartDataFromRowData(groupToDates) {
    let i = 0;

    const seriesData = [];
    const drillSeries = [];

    for (const key in groupToDates) {
      if (groupToDates[key]) {
        const group = groupToDates[key];
          // push a new array of daily data to drillSeries
        drillSeries.push({id: i.toString(), data: []});
          // defined variable to get sum of delays to use it for avarage calculation
        let delaysSum = 0;
        group.forEach(element => {
          delaysSum += element.ARR_DELAY;
          const drillArr = [];
          drillArr.push(helpers.getReadableTimeFromInt(element.CRS_DEP_TIME)); // [0] key value
          drillArr.push(element.ARR_DELAY); // [1] y value
          drillSeries[i].data.push(drillArr);
        }, this);
          // push the daily avarage data
        seriesData.push({name: new Date(key).getDate(), y: parseInt((delaysSum / group.length), 10), drilldown: i.toString()});
        i++;
      }
    }
    return {
      seriesData,
      drillSeries
    };
  }

  $onChanges(changes) {
    if (changes.chartData.currentValue) {
      const flightDetails = changes.chartData.currentValue;
      const chartData = this.createChartDataFromRowData(helpers.groupFlightDetailsToDate(flightDetails));

      this.chart = {
        chart: {
          type: 'column'
        },
        tooltip: {
          formatter() {
            return '<br/><b>Avarage Delay:</b> ' + Highcharts.numberFormat(this.y, 0, '.') + ' minutes';
          }
        },
        title: {
          text: 'Flight Delay Times (minutes)',
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
            text: 'Avarage Delay in Minutes'
          },
          labels: {
            formatter() {
              return this.value + ' mins';
            }
          }
        },
        legend: {
          enabled: false
        },

        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: false
            }
          },
          column: {
            zones: [{
              value: -10, // Values up to 10 (not including) ...
              color: 'green' // ... have the color blue.
            }, {value: 10, // Values up to 10 (not including) ...
              color: 'yellow' // ... have the color blue.
            }, {
              color: 'red' // Values from 10 (including) and up have the color red
            }]
          }
        },

        series: [{
          name: 'Average delay in minutes',
          colorByPoint: true,
          data: chartData.seriesData
        }],
        drilldown: {
          series: chartData.drillSeries
        }
      };
    }
  }
}

export default angular.module('ria.components.drill-down-chart', [])
  .component('riaDrillDownChart', {
    controller: ChartController,
    controllerAs: 'ctrl',
    template: require('./drill-down-chart.template.html'),
    bindings: {
      chartData: '<'
    }
  }).name;


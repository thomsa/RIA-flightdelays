import * as helpers from '../../_core/core.helpers';

class DelayRatioChartController {
  /** @ngInject */
  constructor($timeout) {
    this.chart = {};
    this.$timeout = $timeout;
  }

  $onChanges(changes) {
    if (changes.chartData.currentValue) {
      const chartData = changes.chartData.currentValue;
      const groupToDates = chartData.reduce((obj, item) => {
        obj[item.FL_DATE] = obj[item.FL_DATE] || [];
        obj[item.FL_DATE].push(item);
        return obj;
      }, {});

      const seriesData = [];
      const drillSeries = [];
      let i = 0;
      for (const key in groupToDates) {
        if (groupToDates[key]) {
          const group = groupToDates[key];
          // push a new array of daily data to drillSeries
          drillSeries.push({id: i.toString(), data: []});
          // defined variable to get sum of delays to use it for avarage calculation
          let delaysSum = 0;
          let elapsedTimeSum = 0;
          group.forEach(element => {
            delaysSum += element.ARR_DELAY;
            elapsedTimeSum += element.CRS_ELAPSED_TIME;
            const drillArr = [];
            drillArr.push(helpers.getReadableTimeFromInt(element.CRS_DEP_TIME)); // [0] key value
            drillArr.push(parseInt((element.ARR_DELAY / element.CRS_ELAPSED_TIME) * 100, 10)); // [1] y value
            drillSeries[i].data.push(drillArr);
          }, this);
          // push the daily avarage data
          seriesData.push({
            name: new Date(key).getDate(),
            y: parseInt((delaysSum / elapsedTimeSum * 100), 10)
           // drilldown: i.toString()
          });
          i++;
        }
      }
      const selectedPoints = [];

      let avarage = 0;
      this.$timeout(() => {
        avarage += 1;
      }, 2000);

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
          },
          plotLines: [{
            label: 'asdasd',
            color: 'black',
            value: avarage, // Insert your average here
            width: '3',
            zIndex: 2 // To not get stuck below the regular plot lines
          }]
        },
        legend: {
          enabled: true
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
                select(event) {
                  const chart = this.series.chart;

                  console.log(chart);
                  chart.yAxis[0].removePlotLine();
                  chart.yAxis[0].addPlotLine({
                    label: {text: 'asdasd'},
                    color: 'black',
                    value: 20, // Insert your average here
                    width: '3',
                    zIndex: 2 // To not get stuck below the regular plot lines
                  });
                  chart.redraw();
                  // let selectedPointsStr = '';
                  // if (event.accumulate) {
                  //   selectedPoints.push(this);
                  // } else {
                  //   selectedPoints = [this];
                  // }
                  // angular.forEach(selectedPoints, (i, value) => {
                  //   selectedPointsStr += '<br>' + value.category;
                  // });
                  // console.log(chart);
                  // avarage++;
                }
              }
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
          name: 'Delay Ratio %',
          colorByPoint: true,
          data: seriesData
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


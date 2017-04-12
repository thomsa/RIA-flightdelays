class ChartController {
  /** @ngInject */
  constructor() {
    this.chart = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'FLIGHT DETAILS'
      },
      xAxis: {
        type: 'category'
      },

      legend: {
        enabled: false
      },

      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true
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
      drilldown: {
        series: []
      },
      series: []
    };
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
          drillSeries.push({id: i, data: []});
          // defined variable to get sum of delays to use it for avarage calculation
          let delaysSum = 0;
          group.forEach(element => {
            delaysSum += element.ARR_DELAY;
            const drillArr = [];
            drillArr.push(element.CRS_DEP_TIME); // [0] key value
            drillArr.push(element.ARR_DELAY); // [1] y value
            drillSeries[i].data.push(drillArr);
          }, this);
          // push the daily avarage data
          seriesData.push({name: key.toString(), y: parseInt((delaysSum / group.length), 10), drilldown: i});
          i++;
        }
      }
      console.log(seriesData);
      console.log(drillSeries);
      this.chart.series = [{
        name: 'Delay',
        colorByPoint: true,
        data: seriesData
      }];

      this.chart.drilldown.series = drillSeries;
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


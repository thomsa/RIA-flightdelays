import * as uiActions from '../_redux-store/actions/ui.actions';
import * as stateActions from 'redux-ui-router';
class ResultsController {
  /** @ngInject */
  constructor($ngRedux, $scope, riaFlightDetailsService, $stateParams) {
    this.$stateParams = $stateParams;
    this.props = {};
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({},
        uiActions,
        riaFlightDetailsService,
        stateActions
        ))(this.props);
    $scope.$on('$destroy', unsubscribe);

    this.chart = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Basic drilldown'
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

      series: [{
        name: 'Things',
        colorByPoint: true,
        data: [{
          name: 'Animals',
          y: 5,
          drilldown: 'animals'
        }, {
          name: 'asd',
          y: -15,
          drilldown: 'add'
        }, {
          name: 'Fruits',
          y: -2,
          drilldown: 'fruits'
        }, {
          name: 'Cars',
          y: 11,
          drilldown: 'cars'
        }]
      }],
      drilldown: {
        series: [{
          id: 'animals',
          data: [
                    ['Cats', 15],
                    ['Dogs', 2],
                    ['Cows', 1],
                    ['Sheep', 2],
                    ['Pigs', 1]
          ]
        }, {
          id: 'fruits',
          data: [
                    ['Apples', 15],
                    ['Oranges', 2]
          ]
        }, {
          id: 'cars',
          data: [
                    ['Toyota', 4],
                    ['Opel', 2],
                    ['Volkswagen', 2]
          ]
        }]
      }
    };
  }
  $onInit() {
    if (this.$stateParams.originCode && this.$stateParams.destinationCode) {
      this.props.getFlightData(this.$stateParams.originCode, this.$stateParams.destinationCode);
    }
  }

  mapStateToThis(state) {
    let monthToTravel;
    let dayToTravel;
    if (state.delay && state.delay.minimumDelay) {
      dayToTravel = new Date(state.delay.minimumDelay.FL_DATE).getDate();
      // TODO: MOVE THIS OUT TO A SERVICE
      const Calendar = new Date();
      const currentMonth = Calendar.getMonth();    // Returns month (0-11)
      const today = Calendar.getDate();    // Returns day (1-31)

      if (dayToTravel >= today) {
        monthToTravel = this.months[currentMonth];
      } else {
        monthToTravel = this.months[currentMonth + 1];
      }
    }
    return {
      dayToTravel,
      monthToTravel,
      ui: state.ui,
      flightDetails: state.flightDetails,
      router: state.router
    };
  }
}

export default {
  template: require('./results.template.html'),
  controller: ResultsController,
  controllerAs: 'ctrl',
  bindings: {
    layout: '@',
    flex: '@'
  }
};

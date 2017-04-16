import 'angular-mocks';
import chart from './delay-ratio-chart.component';

describe('delay ratio chart component', () => {
  beforeEach(() => {
    angular.mock.module(chart);
  });

  it('should compile', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-delay-ratio-chart></ria-delay-ratio-chart>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

  it('should pass the right data to the chart on $onChanges', angular.mock.inject(($rootScope, $componentController, $document) => {
    const scope = $rootScope.$new();
    const controller = $componentController('riaDelayRatioChart', {$scope: scope, $document}, {});
    const dataToSend = {chartData: {}};
    dataToSend.chartData.currentValue = require('../../../data/ABQ_LAX.json');
    controller.$onChanges(dataToSend);

    expect(controller.chart).not.toBeNull();
    expect(controller.chart.series.data).not.toBeNull();
  }));
});

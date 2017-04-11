import * as delayActions from '../../_redux-store/actions/delay.actions';
const basePath = '/data/';

/** @ngInject */
export function DelaysService($http, $q, $log) {
  function getDelayData(origin, destination) {
    return (dispatch, getState) => {
      dispatch(delayActions.fetchStart());
      $http({
        method: 'GET',
        url: basePath + (origin + '_' + destination + '.json')
      }).then(response => {
        const result = [];
        const groupToValues = response.data.reduce((obj, item) => {
          obj[item.FL_DATE] = obj[item.FL_DATE] || [];
          obj[item.FL_DATE].push(item);
          return obj;
        }, {});
        const groupToDistance = response.data.reduce((obj, item) => {
          obj[item.DISTANCE] = obj[item.DISTANCE] || [];
          obj[item.DISTANCE].push(item);
          return obj;
        }, {});

        // get object with minimum delay time
        const min = response.data.reduce((prev, current) => {
          return (prev.ARR_DELAY < current.ARR_DELAY) ? prev : current;
        });

        dispatch(delayActions.setFlightDataWithMiniumumDelay(min));
        dispatch(delayActions.receive(response.data));
      }, error => {
        dispatch(delayActions.error(error));
      });
    };
  }

  return {
    getDelayData
  };
}

export default angular
    .module(name, [])
    .factory('riaDelaysService', DelaysService).name;

import * as flightDetailsActions from '../../_redux-store/actions/flight-details.actions';
const basePath = '/data/';

/** @ngInject */
export function FlightDetailsService($http, $q, $log, $timeout) {
  function getFlightData(origin, destination) {
    return (dispatch, getState) => {
      dispatch(flightDetailsActions.flightDetailsFetchStart());
      $timeout(() => {
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
          dispatch(flightDetailsActions.setFlightDataWithMiniumumDelay(min));
          dispatch(flightDetailsActions.setFlightDetails(response.data));
        }, error => {
          dispatch(flightDetailsActions.flightDetailsFetchError(error));
        });
      },
        3500
      );
    };
  }

  function getAvarageDelayByDistance() {
    return (dispatch, getState) => {
      dispatch(flightDetailsActions.delayDistanceCorrelationFetchStart());
      $http({
        method: 'GET',
        url: basePath + ('delay_distance/delay_distance.json')
      }).then(response => {
        console.table(response.data);
        dispatch(flightDetailsActions.setDelayDistanceCorrelation(response.data));
      }, error => {
        dispatch(flightDetailsActions.delayDistanceCorrelationFetchError(error));
      });
    };
  }

  return {
    getFlightData
  };
}

export default angular
  .module(name, [])
  .factory('riaFlightDetailsService', FlightDetailsService).name;

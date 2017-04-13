import {combineReducers} from 'redux';
import {router} from 'redux-ui-router';
import airport from './reducers/airport.reducers';
import ui from './reducers/ui.reducers';
import flightDetails from './reducers/flight-details.reducers';

const rootReducer = combineReducers({
  router,
  airport,
  ui,
  flightDetails
});

export default rootReducer;

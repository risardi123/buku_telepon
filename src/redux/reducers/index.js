import {combineReducers} from 'redux';
import {dummy_reducers} from './dummy_reducers';
import refresh_landing_reducers from './refresh_landing_reducers';

const RootReducers = combineReducers({
  dummy_reducers: dummy_reducers,
  refresh_landing_reducers: refresh_landing_reducers
})
export default RootReducers

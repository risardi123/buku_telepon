import {combineReducers} from 'redux';
import {dummy_reducers} from './dummy_reducers';

const RootReducers = combineReducers({
  dummy_reducers: dummy_reducers
})
export default RootReducers

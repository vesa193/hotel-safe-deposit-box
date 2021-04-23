import { combineReducers } from 'redux';
import boxReducer from './box/reducer';
import commonReducer from './common/reducer';

export default combineReducers({
  common: commonReducer,
  box: boxReducer,
});

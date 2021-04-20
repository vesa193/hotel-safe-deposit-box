import { combineReducers } from 'redux';
import commonReducer from './common/reducer';

export default combineReducers({
  common: commonReducer,
});

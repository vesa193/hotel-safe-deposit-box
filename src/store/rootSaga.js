import { all } from 'redux-saga/effects';
import { watchSubmitCodeFlow, watchUnlockinBoxFLow } from './box/sagas';

export default function* rootSaga() {
  yield all([watchSubmitCodeFlow(), watchUnlockinBoxFLow()]);
}

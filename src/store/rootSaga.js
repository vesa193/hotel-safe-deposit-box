import { all } from 'redux-saga/effects';
import { watchSubmitCodeFlow, watchUnlockinBoxFLow, watchValidationMasercodeFlow } from './box/sagas';
import { watchFollowBoxActionFlow, watchMakeScreenActiveFlow } from './common/sagas';

export default function* rootSaga() {
  yield all([
    watchSubmitCodeFlow(),
    watchUnlockinBoxFLow(),
    watchMakeScreenActiveFlow(),
    watchFollowBoxActionFlow(),
    watchValidationMasercodeFlow(),
  ]);
}

// import { put, call, takeEvery } from 'redux-saga/effects'

import { put, takeEvery, delay } from 'redux-saga/effects';
import { SET_BOX_PROP } from '../box/consts';
import { ACTIVATE_SCREEN, SET_COMMON_PROP } from './consts';

// example of saga code

// function* initSaga() {
//   yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
//   try {
//     const resProfile = yield call(getUserData)
//     const res = yield call(getBoardsData)
//     const data = yield res?.data
//     yield put({ type: GET_BOARDS_SUCCESS, boards: data })
//     yield put({ type: SET_PROFILE_PROP, key: 'profile', value: resProfile?.data })
//     yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
//   } catch (error) {
//       yield put({ type: GET_BOARDS_FAILED, boardsError: error })
//       yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
//   }
// }

// Make screen active flow
function* makeScreenActiveFlow(action) {
  try {
    const pressedBox = yield action?.pressedBox;
    if (pressedBox === 'pressed') {
      yield put({ type: SET_COMMON_PROP, key: 'isActiveScreen', value: true });
      yield delay(5000);
      yield put({ type: SET_COMMON_PROP, key: 'isActiveScreen', value: false });
    } else {
      yield put({ type: SET_COMMON_PROP, key: 'isActiveScreen', value: false });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
  }
}

export function* watchMakeScreenActiveFlow() {
  yield takeEvery(ACTIVATE_SCREEN, makeScreenActiveFlow);
}

/* eslint-disable no-console */
// import { put, call, takeEvery } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga';
import { put, takeEvery, delay, take, select, call } from 'redux-saga/effects';
import { ACTIVATE_SCREEN, FOLLOW_ACTION, FOLLOW_COUNTER, SET_COMMON_PROP } from './consts';

export const getProject = (state) => state.box;
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

const availableDelay = 1200;

// Fire action on user's delay
// function* followBoxActionFlow(action) {
//   // let isProcessed = null;
//   try {
//     // const isTimeSpace = yield action?.isTimeSpace;
//     // const isTimeSpaceState = yield select((state) => state?.common?.isTimeSpace);
//     const oldCounter = yield select((state) => state?.common?.clickedButtonsCounter);
//     if (oldCounter === 1) {
//       yield delay(availableDelay);
//       yield put({ type: FOLLOW_ACTION, isTimeSpace: false });
//     } else {
//       yield put({ type: FOLLOW_ACTION, isTimeSpace: true });
//     }
//     yield take(FOLLOW_COUNTER);
//     const newCounter = yield select((state) => state?.common?.clickedButtonsCounter);

//     if (oldCounter !== newCounter) {
//       console.log('is different', oldCounter, newCounter);
//       yield window.clearTimeout();
//       yield delay(availableDelay - 1200);
//       yield put({ type: FOLLOW_ACTION, isTimeSpace: true });
//       yield delay(availableDelay);
//       yield put({ type: FOLLOW_ACTION, isTimeSpace: false });
//     }
//   } catch (error) {
//     console.log('error', error);
//   }
// }

export function* watchMakeScreenActiveFlow() {
  yield takeEvery(ACTIVATE_SCREEN, makeScreenActiveFlow);
}

export function* watchFollowBoxActionFlow() {
  // yield takeEvery(FOLLOW_ACTION, followBoxActionFlow);
}

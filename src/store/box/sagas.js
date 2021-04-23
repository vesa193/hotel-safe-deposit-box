import { put, call, takeEvery, delay } from 'redux-saga/effects';
import { REPEAT_TO_UNLOCK, SET_BOX_PROP, SUBMIT_CODE } from './consts';

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

// Locking the deposit box flow
function* submitCodeFlow(action) {
  try {
    const lsCode = yield localStorage.getItem('stored_code');
    const submitedCode = yield action?.submitedCode;
    // eslint-disable-next-line no-console
    console.log('lsCode', lsCode, submitedCode);
    yield put({ type: SET_BOX_PROP, key: 'processing', value: true });
    yield put({ type: SET_BOX_PROP, key: 'message', value: 'Locking...' });
    yield delay(3000);
    yield put({ type: SET_BOX_PROP, key: 'isLockedBox', value: true });
    yield localStorage.setItem('isLocked', 'true');
    yield localStorage.removeItem('code_numbers');
    yield localStorage.removeItem('stored_code');
    yield put({ type: SET_BOX_PROP, key: 'numbers', value: [] });
    yield put({ type: SET_BOX_PROP, key: 'message', value: 'Closed' });
    yield delay(1500);
    yield put({ type: SET_BOX_PROP, key: 'message', value: '' });
    yield put({ type: SET_BOX_PROP, key: 'processing', value: false });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
  }
}

// UnLocking the deposit box flow
function* unlockinBoxFLow(action) {
  try {
    const lsSubmitedCode = yield localStorage.getItem('submited_code');
    const submitedCode = yield action?.code;
    // eslint-disable-next-line no-console
    yield console.log('lsCode', lsSubmitedCode, submitedCode);
    if (lsSubmitedCode === submitedCode) {
      yield put({ type: SET_BOX_PROP, key: 'processing', value: true });
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'Unlocking...' });
      yield delay(3000);
      yield put({ type: SET_BOX_PROP, key: 'isLockedBox', value: false });
      yield localStorage.setItem('isLocked', 'false');
      yield localStorage.removeItem('submited_code');
      yield localStorage.removeItem('code_numbers');
      yield localStorage.removeItem('stored_code');
      yield put({ type: SET_BOX_PROP, key: 'numbers', value: [] });
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'Opened' });
      yield delay(1500);
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'Ready' });
      yield put({ type: SET_BOX_PROP, key: 'processing', value: false });
    } else {
      yield put({ type: SET_BOX_PROP, key: 'processing', value: true });
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'Unlocking...' });
      yield delay(3000);
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'Error' });
      yield delay(1500);
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'Closed' });
      yield delay(1500);
      yield put({ type: SET_BOX_PROP, key: 'message', value: '' });
      yield put({ type: SET_BOX_PROP, key: 'processing', value: false });
      yield put({ type: SET_BOX_PROP, key: 'numbers', value: [] });
      yield localStorage.removeItem('code_numbers');
      yield localStorage.removeItem('stored_code');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
  }
}

export function* watchSubmitCodeFlow() {
  yield takeEvery(SUBMIT_CODE, submitCodeFlow);
}

export function* watchUnlockinBoxFLow() {
  yield takeEvery(REPEAT_TO_UNLOCK, unlockinBoxFLow);
}

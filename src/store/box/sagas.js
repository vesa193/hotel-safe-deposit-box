import { put, takeEvery, delay, call } from 'redux-saga/effects';
import { endpoint } from '../../lib/api';
import { REPEAT_TO_UNLOCK, SET_BOX_PROP, SUBMIT_CODE, VALIDATE_MASTER_CODE } from './consts';

// Locking the deposit box flow
function* submitCodeFlow(action) {
  try {
    const submitedCode = yield action?.submitedCode;
    const lsIsLocked = yield JSON.parse(localStorage.getItem('isLocked'));
    if (!submitedCode || submitedCode === 'L') {
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'blank (no value)' });
    } else if (submitedCode.length < 6) {
      yield put({ type: SET_BOX_PROP, key: 'processing', value: true });
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'Locking...' });
      yield delay(3000);
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'Error' });
      yield delay(1500);
      if (!lsIsLocked) {
        yield put({ type: SET_BOX_PROP, key: 'message', value: 'Opened' });
      } else {
        yield put({ type: SET_BOX_PROP, key: 'message', value: 'Closed' });
      }
      yield delay(1500);
      yield put({ type: SET_BOX_PROP, key: 'message', value: '' });
      yield put({ type: SET_BOX_PROP, key: 'processing', value: false });
      yield put({ type: SET_BOX_PROP, key: 'numbers', value: [] });
      yield localStorage.removeItem('code_numbers');
      yield localStorage.removeItem('stored_code');
    } else {
      yield put({ type: SET_BOX_PROP, key: 'processing', value: true });
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'Locking...' });
      yield delay(3000);
      yield put({ type: SET_BOX_PROP, key: 'isLockedBox', value: true });
      yield localStorage.setItem('isLocked', 'true');
      yield localStorage.removeItem('code_numbers');
      yield localStorage.removeItem('stored_code');
      yield put({ type: SET_BOX_PROP, key: 'numbers', value: [] });
      if (lsIsLocked) {
        yield put({ type: SET_BOX_PROP, key: 'message', value: 'Opened' });
      } else {
        yield put({ type: SET_BOX_PROP, key: 'message', value: 'Closed' });
      }
      yield delay(1500);
      yield put({ type: SET_BOX_PROP, key: 'message', value: '' });
      yield put({ type: SET_BOX_PROP, key: 'processing', value: false });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
  }
}

// UnLocking the deposit box flow
function* unlockinBoxFLow(action) {
  try {
    const lsSubmitedCode = yield localStorage.getItem('submited_code').replace(/L/g, '');
    const submitedCode = yield action?.code.replace(/L/g, '');
    if (!submitedCode || submitedCode === 'L') {
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'blank (no value)' });
    } else if (lsSubmitedCode === submitedCode) {
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
    } else if (submitedCode === '000000') {
      yield put({ type: SET_BOX_PROP, key: 'isServiceMode', value: true });
      yield put({ type: SET_BOX_PROP, key: 'processing', value: true });
      yield put({ type: SET_BOX_PROP, key: 'numbers', value: [] });
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'Service' });
      yield delay(3000);
      yield put({ type: SET_BOX_PROP, key: 'message', value: '' });
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

// Validation master code of the deposit box flow
function* validationMasercodeFlow(action) {
  try {
    const mastercode = yield action?.mastercode;
    const serialNumberOfSafeBox = '4815162342';
    if (!mastercode) {
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'blank (no value)' });
    } else {
      yield put({ type: SET_BOX_PROP, key: 'processing', value: true });
      yield put({ type: SET_BOX_PROP, key: 'message', value: 'Validating...' });
      const res = yield call(() =>
        fetch(endpoint(mastercode).validation)
          .then((response) => response.json())
          .then((myJson) => myJson)
      );
      const sn = yield res?.sn;
      // eslint-disable-next-line no-console
      console.log('SN', sn);
      yield delay(3000);
      if (serialNumberOfSafeBox === sn) {
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
        yield put({ type: SET_BOX_PROP, key: 'isServiceMode', value: false });
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
        yield put({ type: SET_BOX_PROP, key: 'isServiceMode', value: false });
        yield put({ type: SET_BOX_PROP, key: 'numbers', value: [] });
        yield localStorage.removeItem('code_numbers');
        yield localStorage.removeItem('stored_code');
      }
      // yield put({ type: SET_BOX_PROP, key: 'isLockedBox', value: true });
      // yield localStorage.setItem('isLocked', 'true');
      // yield localStorage.removeItem('code_numbers');
      // yield localStorage.removeItem('stored_code');
      // yield put({ type: SET_BOX_PROP, key: 'numbers', value: [] });
      // yield put({ type: SET_BOX_PROP, key: 'message', value: 'Closed' });
      // yield delay(1500);
      // yield put({ type: SET_BOX_PROP, key: 'message', value: '' });
      // yield put({ type: SET_BOX_PROP, key: 'processing', value: false });
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

export function* watchValidationMasercodeFlow() {
  yield takeEvery(VALIDATE_MASTER_CODE, validationMasercodeFlow);
}

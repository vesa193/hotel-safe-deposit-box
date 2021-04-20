// import { put, call, takeEvery } from 'redux-saga/effects'

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


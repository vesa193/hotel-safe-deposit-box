import { FOLLOW_COUNTER, SET_COMMON_PROP } from './consts';

const initialState = {
  anyProp: null,
  isActiveScreen: false,
  isTimeSpace: false,
  clickedButtonsCounter: 0,
};

function commonReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case FOLLOW_COUNTER:
      return {
        ...state,
        clickedButtonsCounter: action?.counter,
      };
    case SET_COMMON_PROP:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}

export default commonReducer;

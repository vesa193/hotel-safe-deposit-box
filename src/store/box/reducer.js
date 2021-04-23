import { ENTER_NUMBERS, SET_BOX_PROP, SUBMIT_CODE } from './consts';

const initialState = {
  numbers: [],
  submitedCode: null,
  processing: false,
};

function boxReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case ENTER_NUMBERS:
      return {
        ...state,
        numbers: [...state.numbers, action?.numbers],
      };
    case SUBMIT_CODE:
      return {
        ...state,
        submitedCode: action?.submitedCode,
      };
    case SET_BOX_PROP:
      return {
        ...state,
        [action.key]: action.value,
      };

    default:
      return state;
  }
}

export default boxReducer;

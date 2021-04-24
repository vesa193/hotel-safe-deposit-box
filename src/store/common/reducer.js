import { SET_COMMON_PROP } from './consts';

const initialState = {
  anyProp: null,
  isActiveScreen: false,
};

function commonReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SET_COMMON_PROP:
      return {
        [action.key]: action.value,
      };
    default:
      return state;
  }
}

export default commonReducer;

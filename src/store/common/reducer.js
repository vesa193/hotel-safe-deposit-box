const initialState = {
  anyProp: null,
};

function commonReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
}

export default commonReducer;

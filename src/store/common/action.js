import { ACTIVATE_SCREEN, FOLLOW_ACTION, FOLLOW_COUNTER, INIT_APP } from './consts';

export const initAppAction = () => {
  return {
    type: INIT_APP,
  };
};

export const makeActivateScreen = (pressedBox) => {
  return {
    type: ACTIVATE_SCREEN,
    pressedBox,
  };
};

export const followTheBoxActions = (isTimeSpace, tapCounter) => {
  return {
    type: FOLLOW_ACTION,
    isTimeSpace,
    tapCounter,
  };
};

export const clickButtonsCounter = (counter) => {
  return {
    type: FOLLOW_COUNTER,
    counter,
  };
};

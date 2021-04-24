import { ACTIVATE_SCREEN, INIT_APP } from './consts';

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

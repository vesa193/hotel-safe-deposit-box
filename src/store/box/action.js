import { ENTER_NUMBERS, REPEAT_TO_UNLOCK, SUBMIT_CODE, VALIDATE_MASTER_CODE } from './consts';

export const enteringNumbers = (numbers) => {
  return {
    type: ENTER_NUMBERS,
    numbers,
  };
};

export const lockingBox = (submitedCode, isSubmitedFirst) => {
  return {
    type: SUBMIT_CODE,
    submitedCode,
    isSubmitedFirst,
  };
};

export const unlockingBox = (code) => {
  return {
    type: REPEAT_TO_UNLOCK,
    code,
  };
};

export const validationMaserCode = (mastercode) => {
  return {
    type: VALIDATE_MASTER_CODE,
    mastercode,
  };
};

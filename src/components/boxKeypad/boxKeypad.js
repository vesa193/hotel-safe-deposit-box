/* eslint-disable no-console */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoxKeypadButton } from '../boxKeypadButton/boxKeypadButton';
import { boxKeypadData } from './boxKeypadData';
import './boxKeypad.scss';
import { enteringNumbers, lockingBox, unlockingBox } from '../../store/box/action';
import { convertArrayToString, formatArrayToString } from '../../lib/utils';

export const BoxKeypad = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.box);
  const processing = state?.processing;
  const numbers = formatArrayToString(state?.numbers);
  const lsIsLocked = JSON.parse(localStorage.getItem('isLocked'));

  const handleEnterNumbers = (num) => {
    if (num !== 'L') {
      dispatch(enteringNumbers(num));
    }

    if (num === 'L') {
      if (lsIsLocked) {
        dispatch(unlockingBox(numbers));
      } else {
        dispatch(lockingBox(numbers));
        localStorage.setItem('submited_code', numbers);
      }
    }
  };

  return (
    <div className="box-keypad">
      {boxKeypadData.map((item) => {
        return (
          <BoxKeypadButton
            key={item?.id}
            label={item?.label}
            disabled={processing}
            onClick={() => handleEnterNumbers(item?.label)}
          />
        );
      })}
    </div>
  );
};

import React from 'react';
import { useSelector } from 'react-redux';
import { BoxKeypad } from '../boxKeypad/boxKeypad';
import { BoxScreen } from '../boxScreen/boxScreen';
import './box.scss';

export const Box = ({ serialNumber }) => {
  const state = useSelector((state) => state?.box);
  const message = state?.message;
  const lsIsLocked = localStorage.getItem('isLocked');
  const isLocked = state?.isLockedBox || JSON.parse(lsIsLocked);

  // eslint-disable-next-line no-console
  console.log('infoo', message, isLocked);

  return (
    <div className="box">
      <BoxScreen isLocked={isLocked} message={message} />
      <BoxKeypad />
      <p className="box-serial-number">S/N: {serialNumber}</p>
    </div>
  );
};

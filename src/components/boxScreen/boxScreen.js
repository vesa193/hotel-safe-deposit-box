import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatArrayToString } from '../../lib/utils';
import './boxScreen.scss';

export const BoxScreen = ({ isLocked, message }) => {
  const numbers = useSelector((state) => state?.box?.numbers);
  const processing = useSelector((state) => state?.box?.processing);
  const [code, setCode] = useState(null);
  const isEmpty = numbers.length === 0;
  const lsNumbers = localStorage.getItem('stored_code');
  const numbersString = formatArrayToString(numbers) || lsNumbers;
  let mainScreenText = 'Ready';
  // eslint-disable-next-line no-console
  console.log('lsNumbers', lsNumbers, numbersString);

  useEffect(() => {
    if (numbersString) {
      setCode(numbersString);
    }
  }, [numbersString]);

  if (!isEmpty) {
    localStorage.setItem('code_numbers', JSON.stringify(numbers));
    localStorage.setItem('stored_code', numbersString);
  }

  // if (!isEmpty && screenMessage) {
  //   mainScreenText = screenMessage;
  // } else if (!isEmpty) {
  //   mainScreenText = code;
  // } else {
  //   mainScreenText = 'Ready';
  // }

  if (!processing && isEmpty && !message) {
    mainScreenText = isLocked ? 'Closed' : 'Ready';
  } else if (processing) {
    mainScreenText = message;
  } else if (!processing) {
    if (isEmpty) {
      mainScreenText = message;
    } else {
      mainScreenText = code;
    }
  }
  // else {
  //   mainScreenText = 'blank (no value)';
  // }

  // eslint-disable-next-line no-console
  console.log('code', code, isEmpty);

  return (
    <div className="box-screen screen-on">
      <p>{!isLocked ? 'Unlocked' : 'Locked'}</p>
      <h4>{mainScreenText}</h4>
    </div>
  );
};

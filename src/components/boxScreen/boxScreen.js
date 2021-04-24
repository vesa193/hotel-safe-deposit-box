import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatArrayToString } from '../../lib/utils';
import './boxScreen.scss';

export const BoxScreen = ({ isLocked, message }) => {
  const numbers = useSelector((state) => state?.box?.numbers);
  const processing = useSelector((state) => state?.box?.processing);
  const isActiveScreen = useSelector((state) => state?.common?.isActiveScreen);
  const [code, setCode] = useState(null);
  const isEmpty = numbers.length === 0;
  const lsNumbers = localStorage.getItem('stored_code');
  const numbersString = formatArrayToString(numbers) || lsNumbers;
  let mainScreenText = 'Ready';
  const blankMessage = message?.startsWith('blank') && isEmpty;
  const isActiveClass = isActiveScreen || processing ? 'screen-on' : 'screen-off';

  useEffect(() => {
    if (numbersString) {
      setCode(numbersString);
    }
  }, [numbersString]);

  useEffect(() => {
    if (isActiveScreen) {
      return isActiveScreen;
    }
  }, [isActiveScreen]);

  if (!isEmpty) {
    localStorage.setItem('code_numbers', JSON.stringify(numbers));
    localStorage.setItem('stored_code', numbersString);
  }

  if (!processing && isEmpty && !message) {
    mainScreenText = isLocked ? message : 'Ready';
  } else if (processing) {
    mainScreenText = message;
  } else if (!processing) {
    if (isEmpty) {
      mainScreenText = message;
    } else {
      mainScreenText = code;
    }
  }

  return (
    <div className={`box-screen ${isActiveClass}`}>
      <p>{!isLocked ? 'Unlocked' : 'Locked'}</p>
      <h4 className={blankMessage ? 'smaller-text' : ''}>{mainScreenText}</h4>
    </div>
  );
};

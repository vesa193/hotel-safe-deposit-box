import React from 'react';
import './boxKeypadButton.scss';

export const BoxKeypadButton = ({ label, onClick, disabled }) => {
  return (
    <div aria-disabled={disabled ? 'true' : 'false'} className="box-keypad-button" onClick={onClick}>
      {label}
    </div>
  );
};

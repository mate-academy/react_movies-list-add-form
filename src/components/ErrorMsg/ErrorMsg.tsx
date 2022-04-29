import React from 'react';
import './ErrorMsg.scss';

type Props = {
  currentErrorId: string,
  currentInput:string,
};

const ErrorMsg: React.FC<Props> = ({ currentErrorId, currentInput }) => (
  <>
    <div
      className={currentErrorId === currentInput
        ? 'ErrorMessage'
        : 'Hidden'}
    >
      You entered wrong value. Please, edit it.
    </div>
  </>
);

export default ErrorMsg;

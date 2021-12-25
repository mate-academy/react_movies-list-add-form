import React from 'react';

type Props = {
  field: string;
};

export const InvalidField:React.FC<Props> = ({ field }) => {
  return (
    <div className="form__error">
      {`Incorrect ${field}`}
    </div>
  );
};

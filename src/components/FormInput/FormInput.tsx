import React from 'react';
import ClassNames from 'classnames';

interface Props {
  name: string;
  value: string;
  errors: { [key: string]: boolean };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addError: (name: keyof State) => void;
}

const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class FormInput extends React.Component<Props, {}> {
  validate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { addError } = this.props;
    const { name, value } = event.target;

    if (!value) {
      addError(name as keyof State);
    }

    if (name === 'imgUrl' && !regExp.test(value)) {
      addError(name as keyof State);
    }

    if (name === 'imdbUrl' && !regExp.test(value)) {
      addError(name as keyof State);
    }
  };

  render() {
    const {
      name,
      onChange,
      value,
      errors,
    } = this.props;

    return (
      <>
        <label htmlFor={name} className="form-label">
          {name[0].toUpperCase() + name.slice(1)}
          <input
            type="text"
            name={name}
            id={name}
            className={ClassNames('form-control', {
              'is-invalid': errors[name],
            })}
            value={value}
            onChange={onChange}
            onBlur={this.validate}
          />
        </label>
        {(errors[name]) && (
          <span className="error-message">
            {'Please enter a valid '}
            {name}
          </span>
        )}
      </>
    );
  }
}

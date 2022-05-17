import React from 'react';
import classNames from 'classnames';

type Props = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (event:
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => boolean;
  error: null | string;
};

export class NewMovieInput extends React.PureComponent<Props> {
  render() {
    const {
      name,
      value,
      placeholder,
      onChange,
      onBlur,
      error,
    } = this.props;

    return (
      <>
        <div className="Form__part">
          <p>
            {name[0].toUpperCase() + name.slice(1)}
            <span className="Form__star">*</span>
          </p>

          <label>
            <input
              type="text"
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              required
              className={classNames(
                'Form__input', { Form__inputErr: error },
              )}
            />
          </label>
        </div>
        {error && <span className="Form__error">{error}</span>}
      </>
    );
  }
}

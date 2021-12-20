import React from 'react';
import classnames from 'classnames';
import './InputElement.scss';

type Props = {
  label: string,
  title: string,
  type: string,
  onChange(event: React.ChangeEvent<HTMLInputElement>): void,
  required: boolean,
};

type State = {
  isTouched: boolean,
};

export class InputElement extends React.Component<Props, State> {
  state = {
    isTouched: false,
  };

  handleOnBlur = () => {
    this.setState({
      isTouched: true,
    });
  };

  render() {
    const {
      label, title, type, onChange, required,
    } = this.props;

    const { isTouched } = this.state;

    return (
      <div className="form__input-box">
        <label className="form__field" htmlFor={`movie-${type}`}>
          {label}
          <input
            type="text"
            id={`movie-${type}`}
            className={classnames(
              'form__input',
              { 'form__input--touched': isTouched && !title.trim() && required },
            )}
            value={title}
            onChange={onChange}
            onBlur={this.handleOnBlur}
            required={required}
          />
        </label>

        <span className={classnames(
          'form__error',
          { 'form__error--active': isTouched && !title.trim() && required },
        )}
        >
          This field is required
        </span>
      </div>
    );
  }
}

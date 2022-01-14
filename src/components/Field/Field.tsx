import { Component } from 'react';
import classNames from 'classnames';

type Props = {
  field: string,
  name: string,
  onChange: (value: string) => void,
  onBlur: (value: string) => void,
};

type State = {
  isValid: boolean,
  isShownMessage: boolean,
};

export class Field extends Component<Props, State> {
  state: State = {
    isValid: false,
    isShownMessage: false,
  };

  render() {
    const {
      field,
      name,
      onChange,
      onBlur,
    } = this.props;

    const { isValid, isShownMessage } = this.state;

    return (
      <>
        <input
          placeholder={`Enter a ${name}`}
          type={field}
          value={field}
          name={field}
          className={classNames('form__field', { 'form__field--not-valid': isValid })}
          onChange={({ target }) => {
            this.setState({ isShownMessage: false });

            if (target.value) {
              onChange(target.value);
            }
          }}
          onBlur={({ target }) => {
            if (target.value) {
              onBlur(target.value);
            }

            if (target.value === '') {
              this.setState({
                isValid: !isValid,
                isShownMessage: !isShownMessage,
              });
            }
          }}
          required
        />
        {isShownMessage && (
          <div className="form__error-message">
            Enter a valid
            {' '}
            {name}
          </div>
        )}
      </>
    );
  }
}

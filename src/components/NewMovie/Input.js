import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Input extends React.Component {
  state={
    validating: false,
  }

  handleBlur = () => {
    this.setState({ validating: true });
  }

  handleFocus = () => {
    this.setState({ validating: false });
  }

  render() {
    const { formErrors, value, name, handleInput } = this.props;
    const errorClass = formErrors[name].length !== 0 && this.state.validating;

    return (
      <div className="form-group">
        <label htmlFor={name}>{name}</label>
        <input
          className={classNames('form-control', { has_error: errorClass })}
          type="text"
          name={name}
          value={value}
          autoComplete="off"
          onChange={handleInput}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        {this.state.validating && formErrors[name].length
          ? <span className="formErrors">{formErrors[name]}</span>
          : ''
        }
      </div>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  formErrors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Input;

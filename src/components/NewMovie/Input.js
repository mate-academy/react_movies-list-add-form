import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Input extends React.Component {
  state={
    errorMassage: '',
    isError: false,
  }

  handleBlur = (e) => {
    const { name } = e.target;
    const { formErrors } = this.props;

    if (!formErrors[name].length) {
      return;
    }

    this.setState({
      isError: true,
      errorMassage: formErrors[name],
    });
  }

  handleFocus = () => {
    this.setState({
      isError: false,
      errorMassage: '',
    });
  }

  render() {
    const { value, name, handleInput } = this.props;
    const { errorMassage, isError } = this.state;

    return (
      <div className="form-group">
        <label htmlFor={name}>{name}</label>
        <input
          className={classNames('form-control', { has_error: isError })}
          type="text"
          name={name}
          value={value}
          autoComplete="off"
          onChange={handleInput}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        <span className="formErrors">{errorMassage}</span>
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

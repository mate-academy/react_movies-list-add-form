import React, { Component } from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const urlExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class Input extends Component {
  state = {
    value: this.props.value,
    error: '',
    isSaved: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== null && prevProps.value !== this.props.value) {
      this.updateState(this.props.value);
    }
  }

  updateState = (updatedValue) => {
    this.setState({
      value: updatedValue,
      error: '',
      isSaved: !!updatedValue,
    });
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      value,
    });
  }

  validateUrl = () => {
    const { name, saveValue } = this.props;
    const { value } = this.state;

    if (!urlExp.test(value)) {
      this.setState({
        error: 'Please add correct url',
        isSaved: false,
      });

      saveValue(name, null);

      return;
    }

    saveValue(name, value);

    this.setState({
      error: '',
    });
  }

  validateValue = () => {
    const { name, saveValue } = this.props;
    const { value } = this.state;

    if (!this.state.value) {
      this.setState({
        error: `Please add ${name}`,
        isSaved: false,
      });

      saveValue(name, null);

      return;
    }

    if (name.includes('Url')) {
      this.validateUrl();

      return;
    }

    saveValue(name, value);

    this.setState({
      error: '',
    });
  }

  render() {
    const { name } = this.props;
    const { error, value, isSaved } = this.state;

    const styleClasses = ClassNames('form-control', 'myInput', {
      'is-invalid': error,
      'is-valid': isSaved,
    });

    return (
      <div className="form-row">
        <div className="col-md-12 mb-2">
          {
            name !== 'description'
              ? (
                <input
                  type="text"
                  className={styleClasses}
                  id={name}
                  placeholder={name}
                  value={value === null ? '' : value}
                  required
                  onChange={this.handleChange}
                  onBlur={this.validateValue}
                />
              )
              : (
                <textarea
                  type="text"
                  className={styleClasses}
                  id={name}
                  placeholder={name}
                  value={value === null ? '' : value}
                  required
                  onChange={this.handleChange}
                  onBlur={this.validateValue}
                />
              )
          }
          <div className="valid-feedback">
            Looks good!
          </div>
          <div className="invalid-feedback">
            {error}
          </div>

        </div>
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOf([
    PropTypes.instanceOf(null),
    PropTypes.string]).isRequired,
  saveValue: PropTypes.func.isRequired,
};

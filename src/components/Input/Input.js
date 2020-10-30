import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Input extends Component {
  // eslint-disable-next-line max-len
  urlExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/

  state = {
    value: this.props.value,
    error: '',
    isSaved: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
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

    if (!this.urlExp.test(value)) {
      this.setState({
        error: 'Please add correct url',
      });

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

    return (
      <div className="form-row">
        <div className="col-md-12 mb-2">
          {
            name !== 'description'
              ? (
                <input
                  type="text"
                  className={`form-control myInput
                  ${error ? 'is-invalid' : ''}
                  ${isSaved ? 'is-valid' : ''}`}
                  id={name}
                  placeholder={name}
                  value={value}
                  required
                  onChange={this.handleChange}
                  onBlur={this.validateValue}
                />
              )
              : (
                <textarea
                  type="text"
                  className={`form-control myInput
                  ${error ? 'is-invalid' : ''}
                  ${isSaved ? 'is-valid' : ''}`}
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
  value: PropTypes.string.isRequired,
  saveValue: PropTypes.func.isRequired,
};

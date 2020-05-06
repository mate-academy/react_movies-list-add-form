import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MovieItem.scss';

export class MovieItem extends Component {
  state = {
    error: false,
  };

  handleBlurInput = () => {
    const patternValidation = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (this.props.name === 'description') {
      return;
    }

    if (this.props.name === 'imgUrl' || this.props.name === 'imdbUrl') {
      if (!this.props.value.match(patternValidation)) {
        this.setState({
          error: true,
        });
      }
    }

    if (!this.props.value) {
      this.setState({
        error: true,
      });
    }
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;

    this.setState({
      error: false,
    });

    this.props.handleChangeInput(name, value);
  }

  render() {
    const { name, value } = this.props;
    const { error } = this.state;

    return (
      <label className="form-item">
        <input
          name={name}
          value={value}
          placeholder={name}
          className={this.state.error ? 'error' : ''}
          onChange={this.handleChangeInput}
          onBlur={this.handleBlurInput}
          type="text"
        />
        {error ? (
          <div>
            Please enter the correct value for
            {name}
          </div>
        ) : null}
      </label>
    );
  }
}

MovieItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
};

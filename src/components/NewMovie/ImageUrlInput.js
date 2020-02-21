import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export class ImageUrlInput extends Component {
  state = {
    isValid: false,
    isUrlValid: false,
  }

  validateForm = (event) => {
    const { imgUrl, formValidate } = this.props;
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/g;
    const matches = event.target.value.match(pattern);

    if (!imgUrl) {
      this.setState({
        isValid: true,
      });
    }

    if (!matches && imgUrl) {
      this.setState({
        isUrlValid: true,
      });
    }

    if (matches) {
      formValidate(event, true);
    } else {
      formValidate(event, false);
    }
  }

  inputChange = (event) => {
    const { onChange } = this.props;

    onChange(event);

    this.setState({
      isValid: false,
      isUrlValid: false,
    });
  }

  render() {
    const { imgUrl } = this.props;
    const { isValid, isUrlValid } = this.state;

    return (
      <label className={cx({
        form__label: true,
        'form__not-valid': isValid,
        'form__url-not-valid': isUrlValid,
      })}
      >
        <p>Image Url:</p>
        <input
          className="form__input"
          value={imgUrl}
          id="imgUrl"
          onChange={this.inputChange}
          onBlur={this.validateForm}
          autoComplete="off"
        />
      </label>
    );
  }
}

ImageUrlInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  formValidate: PropTypes.func.isRequired,
};

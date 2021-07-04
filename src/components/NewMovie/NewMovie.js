import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  // eslint-disable-next-line max-len
  urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: '',
    imgUrlError: '',
    imdbUrlError: '',
    imdbIdError: '',
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: '',
    });
  }

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  formReset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  validateTitle = () => {
    const { title } = this.state;
    let titleError = '';

    if (!title.trim()) {
      titleError = 'Enter the title, please';
    }

    if (titleError) {
      this.setState({ titleError });

      return false;
    }

    return true;
  }

  validateImgUrl = () => {
    const { imgUrl } = this.state;
    let imgUrlError = '';

    if (!this.urlPattern.test(imgUrl)) {
      imgUrlError = 'Enter valid img URL, please';
    }

    if (imgUrlError) {
      this.setState({ imgUrlError });

      return false;
    }

    return true;
  }

  validateImdbId = () => {
    const { imdbId } = this.state;
    let imdbIdError = '';

    if (!imdbId.trim()) {
      imdbIdError = 'Enter movie ID, please';
    }

    if (imdbIdError) {
      this.setState({ imdbIdError });

      return false;
    }

    return true;
  }

  validateImdbUrl = () => {
    const { imdbUrl } = this.state;
    let imdbUrlError = '';

    if (!this.urlPattern.test(imdbUrl)) {
      imdbUrlError = 'Enter valid imdb URL, please';
    }

    if (imdbUrlError) {
      this.setState({ imdbUrlError });

      return false;
    }

    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateTitle()
      && this.validateImgUrl()
      && this.validateImdbUrl()
      && this.validateImdbId();

    if (!isValid) {
      return;
    }

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);

    this.formReset();
  }

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
      titleError, imgUrlError, imdbUrlError, imdbIdError,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label className="form__label">
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleInputChange}
            onBlur={this.validateTitle}
            className={classNames(
              'form__input',
              { 'form__input--error': titleError },
            )}
          />
          {titleError && (
            <span className="form__error-msg">{titleError}</span>
          )}
        </label>
        <label className="form__label">
          Description:
          <textarea
            value={description}
            onChange={this.handleDescriptionChange}
            className="form__textarea"
          />
        </label>
        <label className="form__label">
          Image URL:
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleInputChange}
            onBlur={this.validateImgUrl}
            className={classNames(
              'form__input',
              { 'form__input--error': imgUrlError },
            )}
          />
          {imgUrlError && (
            <span className="form__error-msg">{imgUrlError}</span>
          )}
        </label>
        <label className="form__label">
          imdb URL:
          <input
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleInputChange}
            onBlur={this.validateImdbUrl}
            className={classNames(
              'form__input',
              { 'form__input--error': imdbUrlError },
            )}
          />
          {imdbUrlError && (
            <span className="form__error-msg">{imdbUrlError}</span>
          )}
        </label>
        <label className="form__label">
          imdb ID:
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleInputChange}
            onBlur={this.validateImdbId}
            className={classNames(
              'form__input',
              { 'form__input--error': imdbIdError },
            )}
          />
          {imdbIdError && (
            <span className="form__error-msg">{imdbIdError}</span>
          )}
        </label>
        <button
          type="submit"
          className="form__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

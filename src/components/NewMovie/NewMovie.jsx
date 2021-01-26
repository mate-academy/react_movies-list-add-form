import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleEmpty: false,
    isImgUrlValid: true,
    isImdbUrlValid: true,
    isImdbIdValid: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    if (name === 'title') {
      this.setState({
        isTitleEmpty: false,
      });
    }

    if (name === 'imgUrl') {
      this.setState({
        isImgUrlValid: true,
      });
    }

    if (name === 'imdbUrl') {
      this.setState({
        isImdbUrlValid: true,
      });
    }

    if (name === 'imdbId') {
      this.setState({
        isImdbIdValid: true,
      });
    }
  };

  submitForm = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const { title, description, imgUrl, imdbUrl } = this.state;
    let { imdbId } = this.state;
    let isValidated = true;
    // eslint-disable-next-line max-len
    const regexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (title.trim() === '') {
      this.setState({
        isTitleEmpty: true,
      });

      isValidated = false;
    }

    if (!regexp.test(imgUrl)) {
      this.setState({
        isImgUrlValid: false,
      });

      isValidated = false;
    }

    if (!regexp.test(imdbUrl)) {
      this.setState({
        isImdbUrlValid: false,
      });

      isValidated = false;
    }

    imdbId = Number(imdbId);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(imdbId) || imdbId === 0) {
      this.setState({
        isImdbIdValid: false,
      });

      isValidated = false;
    }

    if (isValidated) {
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });

      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleEmpty,
      isImgUrlValid,
      isImdbUrlValid,
      isImdbIdValid,
    } = this.state;

    return (
      <form
        method="post"
        onSubmit={this.submitForm}
        className="form"
      >
        <p className="form__title">Add new movie</p>
        <div className="form__field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            className={isTitleEmpty
              ? 'form__input form__input--error'
              : 'form__input'}
            name="title"
            id="title"
            value={title}
            onChange={this.handleChange}
            autoComplete="off"
          />
          {!isTitleEmpty || (
            <p className="form__field-error">Please, enter the title</p>
          )}
        </div>
        <div className="form__field">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            className="form__input"
            name="description"
            id="description"
            value={description}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </div>
        <div className="form__field">
          <label htmlFor="imgUrl">Image URL: </label>
          <input
            type="text"
            className={isImgUrlValid
              ? 'form__input'
              : 'form__input form__input--error'}
            name="imgUrl"
            id="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            autoComplete="off"
          />
          {!isImgUrlValid && (
            <p className="form__field-error">Please, enter the valid URL</p>
          )}
        </div>
        <div className="form__field">
          <label htmlFor="imdbUrl">IMDB URL: </label>
          <input
            type="text"
            className={isImdbUrlValid
              ? 'form__input'
              : 'form__input form__input--error'}
            name="imdbUrl"
            id="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            autoComplete="off"
          />
          {!isImdbUrlValid && (
            <p className="form__field-error">Please, enter the valid URL</p>
          )}
        </div>
        <div className="form__field">
          <label htmlFor="imdbId">IMDB ID: </label>
          <input
            type="text"
            className={isImdbIdValid
              ? 'form__input'
              : 'form__input form__input--error'}
            name="imdbId"
            id="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            autoComplete="off"
          />
          {!isImdbIdValid && (
            <p className="form__field-error">Please, enter the valid ID</p>
          )}
        </div>
        <button type="submit" className="form__submit">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

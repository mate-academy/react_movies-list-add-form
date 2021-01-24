import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    values: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
    isNotValid: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value,
      },
      errors: {
        ...state.errors,
        [name]: false,
      },
      isNotValid: false,
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.values;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    const isValideImgUrl = this.validateUrl(imgUrl);
    const isValideImdbUrl = this.validateUrl(imdbUrl);

    if (!title || !isValideImgUrl || !isValideImdbUrl || !imdbId) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          title: !title,
          imgUrl: !isValideImgUrl,
          imdbUrl: !isValideImdbUrl,
          imdbId: !imdbId,
        },
        isNotValid: !state.isValid,
      }));

      return;
    }

    this.setState({
      values: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      errors: {
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      },
    });

    this.props.addMovie(newMovie);
  }

  validateUrl = (url) => {
    // eslint-disable-next-line
    const isValid = url.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    return isValid;
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.values;

    return (
      <form
        className="form"
        method="POST"
        action="/"
        onSubmit={this.handleSubmit}
      >
        <div className="form__wrapper">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className={cn('form__input',
              { 'form__input--error': this.state.errors.title })}
            onChange={this.handleChange}
            value={title}
          />
          {this.state.errors.title && (
            <div className="form__error-message">
              You forgot to pass the title of the movie
            </div>
          )}
        </div>

        <div className="form__wrapper">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            className="form__input"
            onChange={this.handleChange}
            value={description}
          />
        </div>

        <div className="form__wrapper">
          <label htmlFor="imgUrl">ImgUrl</label>
          <input
            id="imgUrl"
            name="imgUrl"
            className={cn('form__input',
              { 'form__input--error': this.state.errors.imgUrl })}
            onChange={this.handleChange}
            value={imgUrl}
          />
          {this.state.errors.imgUrl && (
            <div className="form__error-message">
              Please pass the valid URL
            </div>
          )}
        </div>

        <div className="form__wrapper">
          <label htmlFor="imdbUrl">ImdbUrl</label>
          <input
            id="imdbUrl"
            name="imdbUrl"
            className={cn('form__input',
              { 'form__input--error': this.state.errors.imdbUrl })}
            onChange={this.handleChange}
            value={imdbUrl}
          />
          {this.state.errors.imdbUrl && (
            <div className="form__error-message">
              Please pass the valid URL
            </div>
          )}
        </div>

        <div className="form__wrapper">
          <label htmlFor="imdbId">ImdbId</label>
          <input
            id="imdbId"
            name="imdbId"
            className={cn('form__input',
              { 'form__input--error': this.state.errors.imdbId })}
            onChange={this.handleChange}
            value={imdbId}
          />
          {this.state.errors.imdbId && (
            <div className="form__error-message">
              ImdbId must be required
            </div>
          )}
        </div>

        <button
          className="form__submit"
          type="submit"
          disabled={!!this.state.isNotValid}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

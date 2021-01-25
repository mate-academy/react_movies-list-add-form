import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NewMovie.scss';

function isValidUrl(inputValue) {
  // eslint-disable-next-line max-len
  return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(inputValue);
}

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
  };

  handleChanges = (event) => {
    const { name, value } = event.target;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          [name]: value,
        },
        errors: {
          ...prevState.errors,
          [name]: !isValidUrl(value),
        },
      }));

      return;
    }

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: false,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state.values;

    if (!title || !imdbId || !imdbUrl || !imgUrl) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          title: !prevState.values.title,
          imdbId: !prevState.values.imdbId,
          imgUrl: !isValidUrl(imgUrl),
          imdbUrl: !isValidUrl(imdbUrl),
        },
      }));

      return;
    }

    if (!isValidUrl(imdbUrl) || !isValidUrl(imgUrl)) {
      return;
    }

    this.props.addMovie({
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    });

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
  }

  render() {
    const { values, errors } = this.state;
    const isFormWithErrors = Object.values(errors)
      .some(item => item === true);

    return (
      <form
        action=""
        method="POST"
        className="form"
        onSubmit={this.handleSubmit}
      >
        {errors.title && (
          <span className="form__message">
            You have to write title
          </span>
        )}
        <input
          type="text"
          name="title"
          placeholder="enter the title of movie*"
          className={classNames(
            'form__input',
            { 'form__input--error': errors.title },
          )}
          value={values.title}
          onChange={this.handleChanges}
        />

        <textarea
          name="description"
          placeholder="description for movie"
          className="form__input"
          value={values.description}
          onChange={this.handleChanges}
        />

        {errors.imgUrl && (
          <span className="form__message">
            you have to write imgUrl
          </span>
        )}
        <input
          type="text"
          name="imgUrl"
          placeholder="enter url to movie image*"
          className={classNames(
            'form__input',
            { 'form__input--error': errors.imgUrl },
          )}
          value={values.imgUrl}
          onChange={this.handleChanges}
        />

        {errors.imdbUrl && (
          <span className="form__message">
            you have to write imdbUrl address
          </span>
        )}
        <input
          type="text"
          name="imdbUrl"
          placeholder="enter url to IMDb image*"
          className={classNames(
            'form__input',
            { 'form__input--error': errors.imdbUrl },
          )}
          value={values.imdbUrl}
          onChange={this.handleChanges}
        />

        {errors.imdbId && (
          <span className="form__message">
            you have to write imdb-Id
          </span>
        )}
        <input
          type="text"
          name="imdbId"
          placeholder="enter IMDb ID*"
          className={classNames(
            'form__input',
            { 'form__input--error': errors.imdbId },
          )}
          value={values.imdbId}
          onChange={this.handleChanges}
        />

        <button
          type="submit"
          className="form__button"
          disabled={isFormWithErrors}
        >
          ⩥ Add ⩤
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

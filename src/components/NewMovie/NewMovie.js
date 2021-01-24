import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NewMovie.scss';

function validUrl(inputValue) {
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

    submit: false,
  };

  getChanges = (event) => {
    const { name, value } = event.target;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      this.setState(state => ({
        values: {
          ...state.values,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: !validUrl(value),
        },
      }));

      return;
    }

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value,
      },
      errors: {
        ...state.errors,
        [name]: false,
      },
    }));
  }

  getSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state.values;

    this.setState({
      submit: true,
    });

    if (!title || !imdbId || !imdbUrl || !imgUrl) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          title: !state.values.title,
          imdbId: !state.values.imdbId,
          imgUrl: !validUrl(imgUrl),
          imdbUrl: !validUrl(imdbUrl),
        },
      }));

      return;
    }

    if (!validUrl(imdbUrl) || !validUrl(imgUrl)) {
      return;
    }

    this.props.getMovie({
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
    const { values, errors, submit } = this.state;
    let infoAboutErrors = Object.values(errors);

    infoAboutErrors = infoAboutErrors.some(item => item === true);

    return (
      <form
        action=""
        method="POST"
        className="form"
        onSubmit={this.getSubmit}
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
          onChange={this.getChanges}
        />

        <textarea
          name="description"
          placeholder="description for movie"
          className="form__input"
          value={values.description}
          onChange={this.getChanges}
        />

        {errors.imgUrl && (
          <span className="form__message">
            you have to write picture address
          </span>
        )}
        <input
          type="text"
          name="imgUrl"
          placeholder="enter url to movie image*"
          className={classNames(
            'form__input',
            { 'form__input--error': errors.imgUrl && submit },
          )}
          value={values.imgUrl}
          onChange={this.getChanges}
        />

        {errors.imdbUrl && (
          <span className="form__message">
            you have to write picture address
          </span>
        )}
        <input
          type="text"
          name="imdbUrl"
          placeholder="enter url to IMDb image*"
          className={classNames(
            'form__input',
            { 'form__input--error': errors.imdbUrl && submit },
          )}
          value={values.imdbUrl}
          onChange={this.getChanges}
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
          onChange={this.getChanges}
        />

        <button
          type="submit"
          className="form__button"
          disabled={infoAboutErrors}
        >
          ⩥ Add ⩤
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  getMovie: PropTypes.func.isRequired,
};

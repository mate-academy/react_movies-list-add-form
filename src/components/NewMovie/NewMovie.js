import React, { Component } from 'react';
import './NewMovie.scss';
import * as cx from 'classnames';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleChange = (event) => {
    const regExp = /^\s/;
    const { name, value } = event.target;

    this.setState(prevState => ({
      [name]: value.replace(regExp, ''),
      errors: {
        ...prevState.isValid,
        [name]: false,
      },
    }));
  }

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (
      !(title === ''
       || description === ''
       || (imgUrl === '' || !pattern.test(imgUrl))
       || (imdbUrl === '' || !pattern.test(imdbUrl))
       || imdbId === '')
    ) {
      this.props.addMovie(movie);
      this.clearInputs();
    } else {
      this.setState((prevState) => {
        const obj = {
          title: false,
          description: false,
          imgUrl: false,
          imdbUrl: false,
          imdbId: false,
        };

        if (title === '') {
          obj.title = true;
        }

        if (description === '') {
          obj.description = true;
        }

        if (imgUrl === '' || !pattern.test(imgUrl)) {
          obj.imgUrl = true;
        }

        if (imdbUrl === '' || !pattern.test(imdbUrl)) {
          obj.imdbUrl = true;
        }

        if (imdbId === '') {
          obj.imdbId = true;
        }

        return {
          errors: {
            title: obj.title,
            description: obj.description,
            imgUrl: obj.imgUrl,
            imdbUrl: obj.imdbUrl,
            imdbId: obj.imdbId,
          },
        };
      });
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
    } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label htmlFor="movie-title" className="form__label">
          Title
        </label>
        <input
          onChange={this.handleChange}
          type="text"
          id="movie-title"
          className={cx('form__input', { 'form__input-red': errors.title })}
          value={title}
          name="title"
          placeholder="Type title"
        />
        <span
          className={
            cx('form__fill', { 'form__fill-all': !errors.title })
          }
        >
          Empty field
        </span>
        <label htmlFor="movie-description" className="form__label">
          Description
        </label>
        <input
          onChange={this.handleChange}
          type="text"
          id="movie-title"
          className={
            cx('form__input', { 'form__input-red': errors.description })
          }
          value={description}
          name="description"
          placeholder="Type description"
        />
        <span
          className={
            cx('form__fill', { 'form__fill-all': !errors.description })
          }
        >
          Empty field
        </span>
        <label htmlFor="movie-imgUrl" className="form__label">
          imgUrl
        </label>
        <input
          onChange={this.handleChange}
          type="text"
          id="movie-imgUrl"
          className={cx('form__input', { 'form__input-red': errors.imgUrl })}
          value={imgUrl}
          name="imgUrl"
          placeholder="Type imgUrl"
        />
        <span
          className={
            cx('form__error-Url', { 'form__right-Url': !errors.imgUrl })
          }
        >
          Not valid
        </span>
        <label htmlFor="movie-imdbUrl" className="form__label">
          imdbUrl
        </label>
        <input
          onChange={this.handleChange}
          onBlur={this.onblur}
          type="text"
          id="movie-title"
          className={cx('form__input', { 'form__input-red': errors.imdbUrl })}
          value={imdbUrl}
          name="imdbUrl"
          placeholder="Type imdbUrl"
        />
        <span
          className={
            cx('form__error-Url', { 'form__right-Url': !errors.imdbUrl })
          }
        >
          Not valid
        </span>
        <label htmlFor="movie-imdbId" className="form__label">
          imdbId
        </label>
        <input
          onChange={this.handleChange}
          type="text"
          id="movie-imdbId"
          className={
            cx('form__input', { 'form__input-red': errors.imdbId })
          }
          value={imdbId}
          name="imdbId"
          placeholder="Type imdbId"
        />
        <span
          className={
            cx('form__fill', { 'form__fill-all': !errors.imdbId })
          }
        >
          Empty field
        </span>

        <button
          type="submit"
          className="form__button"
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

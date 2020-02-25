import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    validImdbUrl: false,
    validImgUrl: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

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

    let isError = false;

    if (!pattern.test(imgUrl)) {
      isError = true;

      this.setState({
        validImgUrl: true,
      });
    }

    if (!pattern.test(imdbUrl)) {
      isError = true;

      this.setState({
        validImdbUrl: true,
      });
    }

    if (
      title.length > 3
       && imdbId.length > 3
       && description.length > 3
       && !isError
    ) {
      const movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      this.props.addMovie(movie);

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        validImdbUrl: false,
        validImgUrl: false,
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
      validImgUrl,
      validImdbUrl,
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
          className={
            `form__input ${title.length < 3 ? 'form__input-red' : ''}`
          }
          value={title}
          name="title"
          placeholder="Type title"
        />
        <span
          className={
            `form__fill ${title.length < 3 ? 'form__fill' : 'form__filled'}`
          }
        >
          Min 3 simbols
        </span>
        <label htmlFor="movie-description" className="form__label">
          Description
        </label>
        <input
          onChange={this.handleChange}
          type="text"
          id="movie-title"
          className={
            `form__input ${description.length < 3 ? 'form__input-red' : ''}`
          }
          value={description}
          name="description"
          placeholder="Type description"
        />
        <span
          className={
            `form__fill
            ${description.length < 3 ? 'form__fill' : 'form__filled'}`
          }
        >
          Min 3 simbols
        </span>
        <label htmlFor="movie-imgUrl" className="form__label">
          imgUrl
        </label>
        <input
          onChange={this.handleChange}
          type="text"
          id="movie-imgUrl"
          className={
            `form__input ${validImgUrl ? 'form__input-red' : ''}`
          }
          value={imgUrl}
          name="imgUrl"
          placeholder="Type imgUrl"
        />
        <span
          className={
            !validImgUrl ? 'form__right-Url' : 'form__error-Url'
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
          className={
            `form__input ${validImdbUrl ? 'form__input-red' : ''}`
          }
          value={imdbUrl}
          name="imdbUrl"
          placeholder="Type imdbUrl"
        />
        <span
          className={
            !validImdbUrl ? 'form__right-Url' : 'form__error-Url'
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
            `form__input ${imdbId.length < 3 ? 'form__input-red' : ''}`
          }
          value={imdbId}
          name="imdbId"
          placeholder="Type imdbId"
        />
        <span
          className={
            `form__fill ${imdbId.length < 3 ? 'form__fill' : 'form__filled'}`
          }
        >
          Min 3 simbols
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

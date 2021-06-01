import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { InputFieldBlock } from '../InputFieldBlock';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imgUrlError: false,
    imdbUrl: '',
    imdbUrlError: false,
    imdbId: '',
  };

  isValid = (string, regexp) => {
    return regexp.test(string);
  }

  clear = () => {
    this.setState({});
  }

  onAdd = (event) => {
    event.preventDefault();

    let error = false;
    // eslint-disable-next-line
    const regexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const { imgUrl, imdbUrl } = this.state;

    if (!this.isValid(imgUrl, regexp)) {
      this.setState({ imgUrlError: true });
      error = true;
    }

    if (!this.isValid(imdbUrl, regexp)) {
      this.setState({ imdbUrlError: true });
      error = true;
    }

    if (error) {
      return;
    }

    const movie = {
      title: event.target.elements.title.value,
      description: event.target.elements.description.value,
      imgUrl,
      imdbUrl,
      imdbId: event.target.elements.imdbId.value,
    };

    this.props.addMovie(movie);
  }

  onChangeHandler = (event, stateKey) => {
    if (stateKey === 'imgUrl') {
      this.setState({
        imgUrlError: false,
      });
    }

    if (stateKey === 'imdbUrl') {
      this.setState({
        imdbUrlError: false,
      });
    }

    this.setState({
      [stateKey]: event.target.value,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      imgUrlError,
      imdbUrlError,
    } = this.state;

    return (
      <form
        className="movie-form"
        onSubmit={this.onAdd}
      >
        <fieldset>
          <legend>
            New movie
          </legend>
          <label
            htmlFor="movie-form__title-label"
            className="movie-form__label"
          >
            Title:&nbsp;
            <br />
            <input
              type="text"
              id="movie-form__title-label"
              name="title"
              className="movie-form__input-field"
              value={title}
              onChange={(event) => {
                this.onChangeHandler(event, 'title');
              }}
              required
            />
          </label>
          <br />

          <label
            htmlFor="movie-form__description-label"
            className="movie-form__description-label"
          >
            Description:&nbsp;
            <br />
            <textarea
              type="text"
              id="movie-form__description-label"
              name="description"
              className="movie-form__description-field"
              value={description}
              onChange={(event) => {
                this.onChangeHandler(event, 'description');
              }}
            />
          </label>
          <br />

          <label
            htmlFor="movie-form__imgurl-label"
            className="movie-form__label"
          >
            Image url:&nbsp;
            <br />
            <input
              type="text"
              id="movie-form__imgurl-label"
              name="imgUrl"
              className={`${imgUrlError && ' error'}
              movie-form__input-field`}
              value={imgUrl}
              onChange={(event) => {
                this.onChangeHandler(event, 'imgUrl');
              }}
              required
            />
          </label>
          {imgUrlError
            && (
              <span
                className="error-message"
              >
                Please, enter a valid URL
              </span>
            )
          }
          <br />

          <label
            htmlFor="movie-form__imgdburl-label"
            className="movie-form__label"
          >
            Image db url:&nbsp;
            <br />
            <input
              type="text"
              id="movie-form__imgdburl-label"
              name="imdbUrl"
              className={`${imdbUrlError && ' error'}
              movie-form__input-field`}
              value={imdbUrl}
              onChange={(event) => {
                this.onChangeHandler(event, 'imdbUrl');
              }}
              required
            />
          </label>
          {imdbUrlError
            && (
              <span
                className="error-message"
              >
                Please, enter a valid URL
              </span>
            )
          }
          <br />

          <label
            htmlFor="movie-form__imgdbid-label"
            className="movie-form__label"
          >
            Image db id:&nbsp;
            <br />
            <input
              type="text"
              id="movie-form__imgdbid-label"
              name="imdbId"
              className="movie-form__input-field"
              value={imdbId}
              onChange={(event) => {
                this.onChangeHandler(event, 'imdbId');
              }}
              required
            />
          </label>
          <br />

          <button
            type="submit"
            disabled={imgUrlError || imdbUrlError}
          >
            Add
          </button>
        </fieldset>

      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

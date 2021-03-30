import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',

    hasimdbUrlError: false,
    hasimgUrlError: false,
  };

  setValue = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  testValid = (currentURL) => {
    // eslint-disable-next-line
    const isValidURL = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return isValidURL.test(currentURL);
  };

  handleSubmit = (event) => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    event.preventDefault();

    if (!this.testValid(imdbUrl) && !this.testValid(imgUrl)) {
      this.setState({
        hasimdbUrlError: true,
        hasimgUrlError: true,
      });

      return;
    }

    if (!this.testValid(imgUrl)) {
      this.setState({
        hasimgUrlError: true,
      });

      return;
    }

    if (!this.testValid(imdbUrl)) {
      this.setState({
        hasimdbUrlError: true,
      });

      return;
    }

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <>
        <h2 className="title">
          Add a movie
        </h2>

        <form
          className="form"
          onSubmit={this.handleSubmit}
        >

          <label htmlFor="title-movie">
            <input
              name="title"
              className="form__input"
              id="title-movie"
              placeholder="Enter a title"
              value={title}
              onChange={this.setValue}
              required
            />
          </label>
          <br />
          <label htmlFor="description-movie">
            <textarea
              name="description"
              className="form__input description"
              type="text"
              id="description-movie"
              placeholder="Enter a description"
              value={description}
              onChange={this.setValue}
            />
          </label>
          <br />

          <label htmlFor="image-movie">
            {this.state.hasimgUrlError && (
              <span className="error-font">Please enter the imgURL</span>
            )}
            <input
              name="imgUrl"
              className={classNames('form__input movie-image', {
                'error-message': this.state.hasimgUrlError,
              })}
              id="movie-image"
              placeholder="Enter an image URL"
              value={imgUrl}
              onChange={this.setValue}
              required
            />
          </label>
          <br />
          <label htmlFor="movie-imdb">
            {this.state.hasimgUrlError && (
              <span className="error-font">Please enter the imdbURL</span>
            )}
            <input
              name="imdbUrl"
              className={classNames('form__input movie-imdb', {
                'error-message': this.state.hasimdbUrlError,
              })}
              id="movie-imdb"
              placeholder="Enter IMDB URL"
              value={imdbUrl}
              onChange={this.setValue}
              required
            />
          </label>
          <br />
          <label htmlFor="movie-imdb-id">
            <input
              name="imdbId"
              className="form__input movie-imdb-id"
              id="movie-imdb-id"
              placeholder="Enter IMDB Id"
              value={imdbId}
              onChange={this.setValue}
              required
            />
          </label>
          <br />

          <button
            className="form__button"
            type="submit"
          >
            Add movie
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

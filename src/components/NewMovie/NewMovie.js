import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    movieTitle: '',
    movieDescription: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errorInTitle: '',
    errorInImgUrl: '',
    errorInImgbUrl: '',
    errorInId: '',
    disableButton: true,
  };

  errorInTitle = () => {
    if (!this.state.movieTitle) {
      this.setState({
        errorInTitle: 'Please choose an user',
      });
    } else {
      this.setState({
        errorInTitle: '',
      });
    }

    this.checkButton();
  }

  errorInId = () => {
    if (!this.state.imdbId) {
      this.setState({
        errorInId: 'Please choose an id',
      });
    } else if
    (this.props.movies.some(movie => movie.imdbId === this.state.imdbId)) {
      this.setState({
        errorInId: 'Please choose another id',
        disableButton: true,
      });
    } else {
      this.setState({
        errorInId: '',
      });
    }

    this.checkButton();
  }

  errorInImgUrl = () => {
    // eslint-disable-next-line max-len
    if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(this.state.imgUrl)) {
      this.setState({
        errorInImgUrl: 'Please choose correct imgUrl form',
      });
    } else {
      this.setState({
        errorInImgUrl: '',
      });
    }

    this.checkButton();
  }

  errorInImdbUrl = () => {
    // eslint-disable-next-line max-len
    if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(this.state.imdbUrl)) {
      this.setState({
        errorInImgbUrl: 'Please choose correct imgbUrl form',
      });
    } else {
      this.setState({
        errorInImgbUrl: '',
      });
    }

    this.checkButton();
  }

  checkButton = () => {
    if (!this.state.errorInTitle && !this.state.errorInImgUrl
      && !this.state.errorInImgbUrl && !this.state.errorInId
      && this.state.movieTitle && this.state.imgUrl && this.state.imdbUrl
      && this.state.imdbId) {
      this.setState({
        disableButton: false,
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      movieTitle,
      movieDescription,
      imgUrl,
      imdbUrl,
      imdbId,
      disableButton,
    } = this.state;

    const { addMovie } = this.props;

    if (!disableButton) {
      const newMovie = {
        title: movieTitle,
        description: movieDescription,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      addMovie(newMovie);
      this.setState({
        movieTitle: '',
        movieDescription: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        errorInTitle: '',
        errorInImgUrl: '',
        errorInImgbUrl: '',
        errorInId: '',
        disableButton: true,
      });
    }
  }

  render() {
    const {
      movieTitle,
      movieDescription,
      imgUrl,
      imdbUrl,
      imdbId,
      errorInTitle,
      errorInImgUrl,
      errorInImgbUrl,
      errorInId,
      disableButton,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          Put the form here
        </h1>
        <div>
          <input
            className={errorInTitle ? 'selected' : ''}
            name="movieTitle"
            type="text"
            placeholder="Enter a title"
            value={movieTitle}
            onBlur={this.errorInTitle}
            onChange={this.handleChange}
          />
          <p>
            {errorInTitle}
          </p>
          <div>
            <input
              type="text"
              name="movieDescription"
              placeholder="Enter a description"
              value={movieDescription}
              onChange={this.handleChange}
            />
          </div>
          <input
            className={errorInImgUrl ? 'selected' : ''}
            type="text"
            name="imgUrl"
            placeholder="Enter an imgUrl"
            value={imgUrl}
            onBlur={this.errorInImgUrl}
            onChange={this.handleChange}
          />
          <p>
            {errorInImgUrl}
          </p>
          <input
            className={errorInImgbUrl ? 'selected' : ''}
            type="text"
            name="imdbUrl"
            placeholder="Enter an imdbUrl"
            value={imdbUrl}
            onBlur={this.errorInImdbUrl}
            onChange={this.handleChange}
          />
          <p>
            {errorInImgbUrl}
          </p>
          <input
            className={errorInId ? 'selected' : ''}
            type="text"
            name="imdbId"
            placeholder="Enter an imdbId"
            value={imdbId}
            onChange={this.handleChange}
            onBlur={this.errorInId}
          />
          <p>
            {errorInId}
          </p>
          <div>
            <button
              type="submit"
              disabled={disableButton}
            >
              Add new movie
            </button>
          </div>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ),
};

NewMovie.defaultProps = {
  movies: [],
};

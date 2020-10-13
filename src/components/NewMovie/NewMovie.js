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
    // eslint-disable-next-line max-len
    urlsValidation: /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/,
  };

  errorInTitle = () => {
    if (!this.state.movieTitle) {
      this.setState({
        errorInTitle: 'Please choose an user',
        disableButton: true,
      });
    } else {
      this.setState({
        errorInTitle: '',
      }, this.validateForm);
    }
  }

  errorInId = () => {
    if (!this.state.imdbId) {
      this.setState({
        errorInId: 'Please choose an id',
        disableButton: true,
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
      }, this.validateForm);
    }
  }

  errorInImgUrl = () => {
    if (!this.state.urlsValidation.test(this.state.imgUrl)) {
      this.setState({
        errorInImgUrl: 'Please choose correct imgUrl form',
        disableButton: true,
      });
    } else {
      this.setState({
        errorInImgUrl: '',
      }, this.validateForm);
    }
  }

  errorInImdbUrl = () => {
    if (!this.state.urlsValidation.test(this.state.imdbUrl)) {
      this.setState({
        errorInImgbUrl: 'Please choose correct imgbUrl form',
        disableButton: true,
      });
    } else {
      this.setState({
        errorInImgbUrl: '',
      }, this.validateForm);
    }
  }

  validateForm = () => {
    if (!this.state.errorInTitle && !this.state.errorInImgUrl
      && !this.state.errorInImgbUrl && !this.state.errorInId
      && this.state.movieTitle && this.state.imgUrl && this.state.imdbUrl
      && this.state.imdbId) {
      this.setState({
        disableButton: false,
      });
    } else {
      this.setState({
        disableButton: true,
      });
    }
  }

    handleSubmit = (event) => {
      event.preventDefault();

      const {
        movieTitle,
        movieDescription,
        imgUrl,
        imdbUrl,
        imdbId,
      } = this.state;

      const { addMovie } = this.props;

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
              onChange={(event) => {
                const { name, value } = event.target;

                this.setState({ [name]: value }, this.errorInTitle);
              }}
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
                onChange={(event) => {
                  const { name, value } = event.target;

                  this.setState({ [name]: value });
                }}
              />
            </div>
            <input
              className={errorInImgUrl ? 'selected' : ''}
              type="text"
              name="imgUrl"
              placeholder="Enter an imgUrl"
              value={imgUrl}
              onChange={(event) => {
                const { name, value } = event.target;

                this.setState({ [name]: value }, this.errorInImgUrl);
              }}
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
              onChange={(event) => {
                const { name, value } = event.target;

                this.setState({ [name]: value }, this.errorInImdbUrl);
              }}
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
              onBlur={this.errorInId}
              onChange={(event) => {
                const { name, value } = event.target;

                this.setState({ [name]: value }, this.errorInId);
              }}
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

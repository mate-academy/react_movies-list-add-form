import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  // eslint-disable-next-line max-len
  imagePattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  urlPattern = /https:\/\/www.imdb.com.title\/(tt.+)\/\?.*/;

  imdbIdPattern = /\/tt.+\//;

  state = {
    movieTitle: '',
    movieDescr: '',
    imageUrl: '',
    movieUrl: '',
    imdbId: '',
    titleErr: false,
    descriptionErr: false,
    imageUrlErr: false,
    movieUrlErr: false,
  };

  setTitle = (e) => {
    this.setState(({ movieTitle: e.target.value }));
    const { movieTitle } = this.state;

    if (movieTitle.length >= 3) {
      this.setState(() => ({ titleErr: false }));
    }
  }

  setDescription = (e) => {
    this.setState(({ movieDescr: e.target.value }));
    const { movieDescr } = this.state;

    if (movieDescr.length >= 10) {
      this.setState(() => ({ descriptionErr: false }));
    }
  }

  setImageUrl = (e) => {
    this.setState(({ imageUrl: e.target.value }), () => {
      if (this.imagePattern.test(this.state.imageUrl)) {
        this.setState(() => ({ imageUrlErr: false }));
      }
    });
  }

  setMovieUrl = (e) => {
    this.setState(({ movieUrl: e.target.value }), () => {
      const { movieUrl } = this.state;

      if (this.urlPattern.test(movieUrl)) {
        const movieId = movieUrl.match(this.imdbIdPattern);
        const newimdbId = movieId[0].split('').slice(1, -1).join('');

        this.setState(() => ({
          movieUrlErr: false, imdbId: newimdbId,
        }));
      }
    });
  }

  validation = () => {
    const {
      movieTitle, movieDescr, imageUrl, movieUrl,
    } = this.state;

    if (movieTitle.length < 3) {
      this.setState(() => ({ titleErr: true }));
    }

    if (movieDescr.length < 10) {
      this.setState(() => ({ descriptionErr: true }));
    }

    if (!this.imagePattern.test(imageUrl)) {
      this.setState(() => ({ imageUrlErr: true }));
    }

    if (!this.urlPattern.test(movieUrl)) {
      this.setState(() => ({ movieUrlErr: true }));
    }

    setTimeout(() => {
      if (!this.state.titleErr && !this.state.descriptionErr
        && !this.state.imageUrlErr && !this.state.movieUrlErr) {
        this.submitMovie();
      }
    }, 0);
  }

  submitMovie = () => {
    const {
      movieTitle, movieDescr, imageUrl, movieUrl, imdbId,
    } = this.state;

    const { addMovie } = this.props;

    const newMovie = {
      title: movieTitle,
      description: movieDescr,
      imgUrl: imageUrl,
      imdbUrl: movieUrl,
      imdbId,
    };

    addMovie(newMovie);
    this.reset();
  }

  reset = () => {
    this.setState(() => ({
      movieTitle: '',
      movieDescr: '',
      imageUrl: '',
      movieUrl: '',
      imdbId: '',
    }));
  }

  render() {
    const {
      movieTitle, movieDescr, imageUrl, movieUrl,
      titleErr, descriptionErr, imageUrlErr, movieUrlErr,
    } = this.state;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="label">
          {' '}
          Write movie title
          <input
            type="text"
            className={titleErr ? 'input__err input' : 'input'}
            placeholder="Title"
            value={movieTitle}
            onChange={this.setTitle}
          />
          {titleErr
            && <span className="error">Invalid title</span>
          }
        </label>
        <label className="label textarea__label">
          {' '}
          Write movie description
          <textarea
            type="text"
            className={descriptionErr
              ? 'input__err textarea textarea__no-change'
              : 'textarea textarea__no-change'}
            placeholder="Description"
            value={movieDescr}
            onChange={this.setDescription}
          />
          {descriptionErr
            && <span className="error">Invalid description</span>
          }
        </label>
        <label className="label">
          {' '}
          Paste iamge URL
          <input
            type="text"
            className="input input__title"
            placeholder="URL"
            value={imageUrl}
            onChange={this.setImageUrl}
          />
          {imageUrlErr
            && <span className="error">Invalid URL</span>
          }
        </label>
        <label className="label">
          Paste movie URL (from
          {' '}
          <a
            href="https://www.imdb.com/?ref_=nv_home"
          >
            IMDB
          </a>
          )
          <input
            type="text"
            className="input input__title"
            placeholder="URL"
            value={movieUrl}
            onChange={this.setMovieUrl}
          />
          {movieUrlErr
            && <span className="error">Invalid URL</span>
          }
        </label>

        <button
          type="submit"
          className="button"
          onClick={this.validation}
          disabled={
            titleErr
            || descriptionErr
            || movieUrlErr
            || imageUrlErr
          }
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

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
    const letter = e.target.value.replace(/^ /, '');

    this.setState(() => ({ movieTitle: letter }),
      () => this.titleLengthComplet());
  }

  titleLengthComplet = () => {
    if (this.state.movieTitle.length >= 3) {
      this.setState({ titleErr: false });
    }
  }

  setDescription = (e) => {
    this.setState(({ movieDescr: e.target.value }),
      () => this.descriptionLengthComplete());
  }

  descriptionLengthComplete = () => {
    if (this.state.movieDescr.length >= 10) {
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
    this.setState(({ movieUrl: e.target.value }),
      () => this.movieUrlPatternComplete());
  }

  movieUrlPatternComplete = () => {
    const { movieUrl } = this.state;

    if (this.urlPattern.test(movieUrl)) {
      const movieId = movieUrl.match(this.imdbIdPattern);
      const newimdbId = movieId[0].split('').slice(1, -1).join('');

      this.setState(() => ({
        movieUrlErr: false, imdbId: newimdbId,
      }));
    }
  }

  validation = () => {
    const {
      movieTitle, movieDescr, imageUrl, movieUrl,
    } = this.state;

    this.setState(() => {
      let titleErr = false;
      let descriptionErr = false;
      let imageUrlErr = false;
      let movieUrlErr = false;

      if (movieTitle.length < 3) {
        titleErr = true;
      }

      if (movieDescr.length < 10) {
        descriptionErr = true;
      }

      if (!this.imagePattern.test(imageUrl)) {
        imageUrlErr = true;
      }

      if (!this.urlPattern.test(movieUrl)) {
        movieUrlErr = true;
      }

      return {
        titleErr, descriptionErr, imageUrlErr, movieUrlErr,
      };
    }, () => {
      if (!this.state.titleErr && !this.state.descriptionErr
        && !this.state.imageUrlErr && !this.state.movieUrlErr) {
        this.submitMovie();
      }
    });
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

  setTitleBlur = () => {
    this.setState((state) => {
      let titleErr = false;

      if (state.movieTitle.length < 3) {
        titleErr = true;
      }

      return { titleErr };
    });
  }

  setDescriptionBlur = () => {
    this.setState((state) => {
      let descriptionErr = false;

      if (state.movieDescr.length < 10) {
        descriptionErr = true;
      }

      return { descriptionErr };
    });
  }

  setImageUrlBlur = () => {
    this.setState((state) => {
      let imageUrlErr = false;

      if (!this.imagePattern.test(state.imageUrl)) {
        imageUrlErr = true;
      }

      return { imageUrlErr };
    });
  }

  setMovieUrlBlur = () => {
    this.setState((state) => {
      let movieUrlErr = false;

      if (!this.urlPattern.test(state.movieUrl)) {
        movieUrlErr = true;
      }

      return { movieUrlErr };
    });
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
        <label
          className="label"
        >
          {' '}
          Write movie title
          <input
            type="text"
            className={titleErr ? 'input__err input' : 'input'}
            placeholder="Title"
            value={movieTitle}
            onChange={this.setTitle}
            onBlur={this.setTitleBlur}
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
            onBlur={this.setDescriptionBlur}
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
            onBlur={this.setImageUrlBlur}
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
            onBlur={this.setMovieUrlBlur}
          />
          {movieUrlErr && (
            <span className="error">Invalid URL</span>
          )}
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

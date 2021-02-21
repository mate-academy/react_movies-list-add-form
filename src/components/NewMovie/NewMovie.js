import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',

    titleErr: false,
    descriptionErr: false,
    imgUrlErr: false,
    imdbUrlErr: false,
    imdbIdErr: false,

    imgUrlErrP: false,
    imdbUrlErrP: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const err = `${name}Err`;
    const errP = `${name}ErrP`;

    this.setState({
      [name]: value,
      [err]: false,
      [errP]: false,
    });
  };

  handleBlur = (event) => {
    const { name, value } = event.target;
    const err = `${name}Err`;

    this.setState({
      [err]: !value,
    });
  };

  handleBlurPattern = (event) => {
    // eslint-disable-next-line
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const { name, value } = event.target;
    const err = `${name}ErrP`;

    if (value) {
      this.setState({
        [err]: !value.match(pattern),
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const movie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.addMovie(movie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',

      titleErr: false,
      descriptionErr: false,
      imgUrlErr: false,
      imdbUrlErr: false,
      imdbIdErr: false,

      imgUrlErrP: false,
      imdbUrlErrP: false,
    });
  }

  render() {
    const movie = this.state;
    const showAddBtn = !!(
      movie.title
      && movie.imgUrl
      && movie.imdbUrl
      && movie.imdbId
      && !movie.titleErr
      && !movie.descriptionErr
      && !movie.imdbIdErr
      && !movie.imgUrlErrP
      && !movie.imdbUrlErrP
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Put the form here </h3>
        <br />

        <input
          value={movie.title}
          name="title"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          type="text"
          id="title"
          className={movie.titleErr ? 'error input' : 'input'}
          placeholder="Enter title"
        />
        <br />
        {movie.titleErr && <span style={{ color: 'red' }}>enter title</span>}
        <br />

        <input
          value={movie.description}
          name="description"
          onChange={this.handleChange}
          type="text"
          id="description"
          className="input"
          placeholder="Enter description"
        />
        <br />
        <br />

        <input
          value={movie.imgUrl}
          name="imgUrl"
          onChange={this.handleChange}
          onBlur={(e) => {
            this.handleBlur(e);
            this.handleBlurPattern(e);
          }}
          type="text"
          id="imgUrl"
          className={
            movie.imgUrlErr || movie.imgUrlErrP
              ? 'error input'
              : 'input'
          }
          placeholder="Enter imgUrl"
        />
        <br />
        {movie.imgUrlErr
          && <span style={{ color: 'red' }}>enter image URL</span>
        }
        {movie.imgUrlErrP && (
          <span style={{ color: 'red' }}>
            enter correct image URL
          </span>
        )}
        <br />

        <input
          value={movie.imdbUrl}
          name="imdbUrl"
          onChange={this.handleChange}
          onBlur={(e) => {
            this.handleBlur(e);
            this.handleBlurPattern(e);
          }}
          type="text"
          id="imdbUrl"
          className={
            movie.imdbUrlErr || movie.imdbUrlErr
              ? 'error input'
              : 'input'
          }
          placeholder="Enter imdbUrl"
        />
        <br />
        {movie.imdbUrlErr
          && <span style={{ color: 'red' }}>enter imdb URL</span>
        }
        {movie.imdbUrlErrP
          && (
            <span style={{ color: 'red' }}>
              enter correct imdb URL
            </span>
          )
        }
        <br />

        <input
          value={movie.imdbId}
          name="imdbId"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          type="text"
          id="imdbId"
          className={movie.imdbIdErr ? 'error input' : 'input'}
          placeholder="Enter imdbId"
        />
        <br />
        {movie.imdbIdErr
          && <span style={{ color: 'red' }}>enter imdb Id</span>
        }
        <br />

        {showAddBtn
          && (
            <button type="submit">
              Add movie
            </button>
          )
        }
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

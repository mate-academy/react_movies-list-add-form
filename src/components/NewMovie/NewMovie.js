import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    titleError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,
  };

  handlerChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({ movie: {
      ...state.movie,
      [name]: value,
    } }));

    this.setState({ [`${name}Error`]: false });
  }

  // eslint-disable-next-line consistent-return
  handlerSubmit= (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    const { title, imgUrl, imdbUrl, imdbId } = this.state.movie;

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return this.setState({
        titleError: !title,
        imgUrlError: !imgUrl,
        imdbUrlError: !imdbUrl,
        imdbIdError: !imdbId,
      });
    }

    this.props.addMovie(this.state.movie);

    this.setState({ movie: {
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    } });
  }

  render() {
    const { titleError, imgUrlError, imdbUrlError, imdbIdError } = this.state;

    return (
      <form className="form" onSubmit={this.handlerSubmit}>
        <label className="form__label">
          <span>Title: </span>
          <input
            className={`form__input-text ${titleError && 'form__input-error'}`}
            type="text"
            name="title"
            value={this.state.movie.title}
            onChange={this.handlerChange}
          />
          {
            titleError && (
              <span className="span-error">
                Error: Enter title
              </span>
            )
          }
        </label>
        <br />
        <label className="form__label">
          <span>ImgUrl: </span>
          <input
            className={`form__input-text ${imgUrlError && 'form__input-error'}`}
            type="text"
            name="imgUrl"
            value={this.state.movie.imgUrl}
            onChange={this.handlerChange}
          />
          {
            imgUrlError && (
              <span className="span-error">
                Error: Enter imgUrl
              </span>
            )
          }
        </label>
        <br />
        <label className="form__label">
          <span>ImdbUrl: </span>
          <input
            className={`form__input-text ${imdbUrlError
              && 'form__input-error'}`}
            type="text"
            name="imdbUrl"
            value={this.state.movie.imdbUrl}
            onChange={this.handlerChange}
          />
          {
            imdbUrlError && (
              <span className="span-error">
                Error: Enter imdbUrl
              </span>
            )
          }
        </label>
        <br />
        <label className="form__label">
          <span>ImdbId: </span>
          <input
            type="text"
            className={`form__input-text ${imdbIdError && 'form__input-error'}`}
            name="imdbId"
            value={this.state.movie.imdbId}
            onChange={this.handlerChange}
          />
          {
            imdbIdError && (
              <span className="span-error">
                Error: Enter imdbId
              </span>
            )
          }
        </label>
        <br />
        <label className="form__label">
          <span>Description: </span>
          <input
            className="form__input-text"
            type="text"
            name="description"
            value={this.state.movie.description}
            onChange={this.handlerChange}
          />
        </label>
        <br />
        <button
          type="submit"
          disabled={
            titleError
            || imgUrlError
            || imdbUrlError
            || imdbIdError
          }
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

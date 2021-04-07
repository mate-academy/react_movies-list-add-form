import React, { Component } from 'react';
import classNames from 'classname';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgUrlError: false,
    imdbUrlError: false,
  };

  addMovieFromForm = ({ target }) => {
    const { name, value } = target;

    // eslint-disable-next-line max-len
    const validate = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      if (!validate.test(value)) {
        this.setState({ [name]: value });
        // eslint-disable-next-line no-unused-expressions
        (name === 'imgUrl')
          ? this.setState({ imgUrlError: true })
          : this.setState({ imdbUrlError: true });
      } else {
        this.setState({ [name]: value });
        // eslint-disable-next-line no-unused-expressions
        (name === 'imgUrl')
          ? this.setState({ imgUrlError: false })
          : this.setState({ imdbUrlError: false });
      }
    } else {
      this.setState({ [name]: value });
    }
  }

  sendMovieFromForm = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

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
      <section className="new-movie">
        <h2>Add movie</h2>
        <form
          onSubmit={this.sendMovieFromForm}
          className="new-movie__form form"
        >
          <input
            className="form__input"
            type="text"
            name="title"
            value={title}
            onChange={this.addMovieFromForm}
            required
            placeholder="Movie title"
          />
          <textarea
            className="form__input"
            name="description"
            value={description}
            onChange={this.addMovieFromForm}
            placeholder="Description of the film"
          />
          <input
            className={classNames(`form__input`, {
              form__borderError: imgUrlError === true,
            })}
            type="text"
            name="imgUrl"
            value={imgUrl}
            required
            onChange={this.addMovieFromForm}
            placeholder="Enter the Image URL"
          />
          {imgUrlError
            && (
            <span className="form__error-img">
              Image URL entered incorrectly
            </span>
            )}
          <input
            className={classNames(`form__input`, {
              form__borderError: imdbUrlError === true,
            })}
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            required
            onChange={this.addMovieFromForm}
            placeholder="Enter the imdbUrl"
          />
          {imdbUrlError
          && (
          <span className="form__error-imdb">
            ImdbUrl entered incorrectly
          </span>
          )}
          <input
            className="form__input"
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.addMovieFromForm}
            required
            placeholder="Enter the imdbId"
          />
          <button
            disabled={imgUrlError || imdbUrlError}
            type="submit"
            className="form__btn"
          >
            Add movie
          </button>
        </form>
      </section>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

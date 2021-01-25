import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imdbLink: '',
      imgLink: '',
      imdbId: '',
    },
    isSubmitValid: true,
    errors: {
      titleErr: false,
      descriptionErr: false,
      imdbLinkErr: false,
      imgLinkErr: false,
      imdbIdErr: false,
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { onAdd } = this.props;

    if (Object.values(this.state.newMovie).some(item => item === '')) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          titleErr: !state.newMovie.title,
          descriptionErr: !state.newMovie.description,
          imdbLinkErr: !state.newMovie.imdbLink,
          imgLinkErr: !state.newMovie.imgLink,
          imdbIdErr: !state.newMovie.imdbId,
        },
        isSubmitValid: false,
      }));

      return;
    }

    onAdd(this.state.newMovie);
    this.resetForm();
  }

  resetForm = () => {
    this.setState({
      newMovie: {
        title: '',
        description: '',
        imdbLink: '',
        imgLink: '',
        imdbId: '',
      },
      isSubmitValid: true,
      errors: {
        titleErr: false,
        descriptionErr: false,
        imdbLinkErr: false,
        imgLinkErr: false,
        imdbIdErr: false,
      },
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value.trim(),
      },
    }));
  }

  render() {
    const {
      newMovie,
      errors,
    } = this.state;

    return (
      <form
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <h2 className="form-title">Add new movie</h2>
        <div className="form-field">
          <label
            htmlFor="movie-title"
            className="inp-title"
          >
            Title:
          </label>
          <input
            name="title"
            type="text"
            id="movie-title"
            placeholder="Movie title"
            className={errors.titleErr && 'invalid'}
            value={newMovie.title}
            onChange={this.handleChange}
          />
          {errors.titleErr && (
            <span className="error">
              Please enter a movie title
            </span>
          )}
        </div>
        <div className="form-field">
          <label
            htmlFor="description"
            className="inp-title"
          >
            Description:
          </label>
          <textarea
            name="description"
            id="movie-desc"
            cols="20"
            rows="5"
            placeholder="Movie description"
            className={errors.descriptionErr && 'invalid'}
            value={newMovie.description}
            onChange={this.handleChange}
          />
          {errors.descriptionErr && (
            <span className="error">
              Please enter a movie description
            </span>
          )}
        </div>
        <div className="form-field">
          <label
            htmlFor="imdb-link"
            className="inp-title"
          >
            IMDb link:
          </label>
          <input
            name="imdbLink"
            type="text"
            id="imdb-link"
            placeholder="IMDb link"
            className={errors.imdbLinkErr && 'invalid'}
            value={newMovie.imdbLink}
            onChange={this.handleChange}
          />
          {errors.imdbLinkErr && (
            <span className="error">
              Please enter a movie IMDb Link
            </span>
          )}
        </div>
        <div className="form-field">
          <label
            htmlFor="img-link"
            className="inp-title"
          >
            Image link:
          </label>
          <input
            name="imgLink"
            type="text"
            id="img-link"
            placeholder="Image link"
            className={errors.imgLinkErr && 'invalid'}
            value={newMovie.imgLink}
            onChange={this.handleChange}
          />
          {errors.imgLinkErr && (
            <span className="error">
              Please enter a movie image Link
            </span>
          )}
        </div>
        <div className="form-field">
          <label
            htmlFor="imdb-id"
            className="inp-title"
          >
            IMDb ID:
          </label>
          <input
            name="imdbId"
            type="text"
            id="imdb-id"
            placeholder="IMDb ID"
            className={errors.imdbIdErr && 'invalid'}
            value={newMovie.imdbId}
            onChange={this.handleChange}
          />
          {errors.imdbIdErr && (
            <span className="error">
              Please enter a movie IMDb ID
            </span>
          )}
        </div>
        <button
          type="submit"
          className="btn"
          disabled={!this.state.isSubmitValid}
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

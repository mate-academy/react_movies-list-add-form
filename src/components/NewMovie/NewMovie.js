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
  };

  handleChanges = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trimLeft(),
    });
  }

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { onAdd } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(this.state);
          this.clearForm();
        }}
        className="movie-form"
      >
        <h2 className="movie-form__header">New movie form</h2>
        <h3 className="movie-form__subheader">Movie title</h3>
        <input
          className="movie-form__input"
          name="title"
          value={title}
          onChange={event => this.handleChanges(event)}
          required
        />
        <h3 className="movie-form__subheader">Movie description</h3>
        <textarea
          className="movie-form__textarea"
          name="description"
          value={description}
          onChange={event => this.handleChanges(event)}
        />
        <h3 className="movie-form__subheader">Link to movie&apos;s poster</h3>
        <input
          className="movie-form__input"
          name="imgUrl"
          value={imgUrl}
          type="url"
          onChange={event => this.handleChanges(event)}
          required
        />
        <h3 className="movie-form__subheader">Link to movie on IMDB</h3>
        <input
          className="movie-form__input"
          name="imdbUrl"
          value={imdbUrl}
          type="url"
          onChange={event => this.handleChanges(event)}
          required
        />
        <h3 className="movie-form__subheader">Add IMDB ID</h3>
        <input
          className="movie-form__input"
          name="imdbId"
          value={imdbId}
          onChange={event => this.handleChanges(event)}
          required
        />
        <button
          type="submit"
          className="movie-form__button"
        >
          Add new film
        </button>

      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

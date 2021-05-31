import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
    isEmpty: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      [name]: value,
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (
      (title.trim().length === 0)
      || (description.trim().length === 0)
      || (imgUrl.trim().length === 0)
      || (imdbUrl.trim().length === 0)
      || (imdbId.trim().length === 0)
    ) {
      this.setState({
        isEmpty: true,
      });

      return;
    }

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
      isEmpty: false,
    });
  }

  render() {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
      isEmpty,
    } = this.state;

    return (
      <form
        className="form form"
        onSubmit={this.handleSubmit}
      >

        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imgUrl"
          placeholder="image url"
          value={imgUrl}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imdbUrl"
          placeholder="IMDb url"
          value={imdbUrl}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imdbId"
          placeholder="IMDb id"
          value={imdbId}
          onChange={this.handleChange}
        />

        <textarea
          rows="4"
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={this.handleChange}
        />
        {isEmpty && (
          <div className="error">
            Please fill all field
          </div>
        )}
        <button
          className="form__button"
          type="submit"
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

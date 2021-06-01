import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
      errors: {
        ...state.errors,
        [`${name}`]: false,
      },
    }));
  };

  handleSubmit = (event) => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    event.preventDefault();

    this.setState(state => ({
      ...state,
      errors: {
        title: !state.title,
        imgUrl: !state.imgUrl,
        imdbUrl: !state.imdbUrl,
        imdbId: !state.imdbId,
      },
    }));

    if (!title) {
      return;
    }

    if (!imgUrl) {
      return;
    }

    if (!imdbUrl) {
      return;
    }

    if (!imdbId) {
      return;
    }

    this.props.addMovie({ ...this.state });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errors: {
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      },
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter the title"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        {errors.title && <span>Enter the correct title</span>}

        <input
          type="text"
          placeholder="Enter the description"
          name="description"
          value={description}
          onChange={this.handleChange}
        />

        <input
          type="text"
          placeholder="Enter the image URL"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />
        {errors.imgUrl && <span>Enter the correct URL</span>}

        <input
          type="text"
          placeholder="Enter the IMDB URL"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        {errors.imdbUrl && <span>Enter the correct URL</span>}

        <input
          type="text"
          placeholder="Enter the IMDB ID"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />
        {errors.imdbUrl && <span>Enter the correct ID</span>}

        <button
          type="submit"
          onClick={this.handleSubmit}
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

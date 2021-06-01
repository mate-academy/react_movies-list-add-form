import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

const emptyMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component {
  state = {
    newMovie: emptyMovie,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state.newMovie);

    this.setState({ newMovie: emptyMovie });
  }

  render() {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
    } = this.state.newMovie;

    return (
      <form>
        Put the form here
        <input
          className="form-element"
          type="text"
          placeholder="Enter movie title here"
          name="title"
          value={title}
          onChange={this.handleChange}
        />

        <textarea
          className="form-element"
          rows="4"
          type="text"
          name="description"
          placeholder="Enter movie description here"
          value={description}
          onChange={this.handleChange}
        />

        <input
          className="form-element"
          type="text"
          placeholder="Enter image URL here"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />

        <input
          className="form-element"
          type="text"
          placeholder="Enter imdb URL here"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />

        <input
          className="form-element"
          type="text"
          placeholder="Enter imdb id here"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />

        <button
          type="submit"
          onClick={this.handleSubmit}
        >
          add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (!title) {
      return;
    }

    if (!description) {
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

    this.props.addMovie(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  inputChange = (event) => {
    const { name } = event.target;

    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="submitForm">
        <input
          name="title"
          type="text"
          placeholder="title"
          value={this.state.title}
          onChange={this.inputChange}
        />

        <input
          name="description"
          type="text"
          placeholder="description"
          value={this.state.description}
          onChange={this.inputChange}
        />

        <input
          name="imgUrl"
          type="url"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={this.inputChange}
        />

        <input
          name="imdbUrl"
          type="url"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.inputChange}
        />

        <input
          name="imdbId"
          type="text"
          placeholder="imdbId"
          value={this.state.imdbId}
          onChange={this.inputChange}
        />
        <button type="submit">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

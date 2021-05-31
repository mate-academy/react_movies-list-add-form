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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSumbit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    return (
      <form
        className="newMovieForm"
        onSubmit={this.handleSumbit}
      >
        <input
          className="newMovieForm__input"
          type="text"
          placeholder="title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />

        <input
          className="newMovieForm__input"
          type="text"
          placeholder="description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        <input
          className="newMovieForm__input"
          type="url"
          placeholder="imgUrl"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
        />

        <input
          className="newMovieForm__input"
          type="url"
          placeholder="imdbUrl"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
        />

        <input
          className="newMovieForm__input"
          type="text"
          placeholder="imdbId"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
        />

        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

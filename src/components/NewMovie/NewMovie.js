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

  handleSubmit = (event) => {
    event.preventDefault();
    const movie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.clearedForm();
    this.props.addMovie(movie);
  }

  clearedForm = () => {
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
      <form onSubmit={this.handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}
          required
        />
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
          required
        />
        <input
          name="imgUrl"
          type="text"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          required
        />
        <input
          name="imdbUrl"
          type="text"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          required
        />
        <input
          name="imdbId"
          type="text"
          placeholder="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
          required
        />
        <button type="submit">Add Film</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

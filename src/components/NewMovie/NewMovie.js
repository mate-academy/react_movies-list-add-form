import React, { Component } from 'react';
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

    this.setState(state => ({
      [name]: value,
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(movie);

    this.setState(state => ({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));
  };

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add your movie</h1>

        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Write title here"
          required
        />

        <textarea
          name="description"
          value={description}
          onChange={this.handleChange}
          placeholder="Write description here"
          required
        />

        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          placeholder="Write imgUrl here"
          required
        />

        <input
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          placeholder="Write imdbUrl here"
          required
        />

        <input
          type="text"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          placeholder="Write imdbId here"
          required
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

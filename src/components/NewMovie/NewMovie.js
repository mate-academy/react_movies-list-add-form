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

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addMovie({
      ...this.state,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <>
        <h1>Add Movie</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder="imgUrl"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder="imdbId"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Add movie</button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

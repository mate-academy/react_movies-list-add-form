import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div>
        <h1>Add Movie</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
            required
            className="mb-2"
          />
          <input
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.handleChange}
            className="mb-2"
          />
          <input
            placeholder="imgUrl"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
            className="mb-2"
          />
          <input
            placeholder="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
            className="mb-2"
          />
          <input
            placeholder="imdbId"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
            className="mb-2 mr-2"
          />
          <button type="submit" variant="outline-dark">
            Add movie
          </button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

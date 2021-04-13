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
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

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

    this.props.addMovie(movie);

    this.resetForm();
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <>
        <h2 className="display-4 text-center mb-3">Add movie</h2>
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            className="form-control mb-3"
            placeholder="Title"
            required
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="imgUrl"
            required
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="imdbUrl"
            required
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="imdbId"
            required
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-success mb-3"
            type="submit"
          >
            Add movie
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

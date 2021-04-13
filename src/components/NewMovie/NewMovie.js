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

  handleTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  handleImgUrl = (event) => {
    this.setState({
      imgUrl: event.target.value,
    });
  }

  handleImdbUrl = (event) => {
    this.setState({
      imdbUrl: event.target.value,
    });
  }

  handleImdbId = (event) => {
    this.setState({
      imdbId: event.target.value,
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

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
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
            value={title}
            onChange={this.handleTitle}
          />
          <input
            className="form-control mb-3"
            placeholder="Description"
            value={description}
            onChange={this.handleDescription}
          />
          <input
            className="form-control mb-3"
            placeholder="imgUrl"
            required
            value={imgUrl}
            onChange={this.handleImgUrl}
          />
          <input
            className="form-control mb-3"
            placeholder="imdbUrl"
            required
            value={imdbUrl}
            onChange={this.handleImdbUrl}
          />
          <input
            className="form-control mb-3"
            placeholder="imdbId"
            required
            value={imdbId}
            onChange={this.handleImdbId}
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

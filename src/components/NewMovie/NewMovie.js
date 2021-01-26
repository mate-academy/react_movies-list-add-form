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

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const movie = {
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
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
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <div className="mb-3">
          <label
            htmlFor="title"
            className="form-label"
          >
            Title
          </label>
          <input
            className="form-control"
            id="title"
            name="title"
            placeholder="title"
            value={title}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="imgUrl"
            className="form-label"
          >
            ImgUrl
          </label>
          <input
            className="form-control"
            id="imgUrl"
            name="imgUrl"
            placeholder="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="imdbUrl"
            className="form-label"
          >
            ImdbUrl
          </label>
          <input
            id="imdbUrl"
            className="form-control"
            name="imdbUrl"
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="imdbId"
            className="form-label"
          >
            ImdbId
          </label>
          <input
            id="imdbId"
            className="form-control"
            name="imdbId"
            placeholder="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="description"
            className="form-label"
          >
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            name="description"
            placeholder="description"
            value={description}
            onChange={this.handleChange}
          >
            {description}
          </textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

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

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;

    addMovie(this.state);

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
    const { handleChange, handleSubmit } = this;

    return (
      <form onSubmit={handleSubmit} className="form-group">
        <div>
          <label className="w-100">
            <h3 className="my-2">Title</h3>
            <input
              name="title"
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={handleChange}
              autoComplete="off"
              required
              className="form-control"
            />
          </label>
        </div>

        <div>
          <label className="w-100">
            <h3 className="my-2">Description</h3>
            <input
              name="description"
              type="text"
              placeholder="Enter a description"
              value={description}
              onChange={handleChange}
              autoComplete="off"
              required
              className="form-control"
            />
          </label>
        </div>

        <div>
          <label className="w-100">
            <h3 className="my-2">imgUrl</h3>
            <input
              name="imgUrl"
              type="url"
              placeholder="Enter an URL of img"
              value={imgUrl}
              onChange={handleChange}
              autoComplete="off"
              required
              className="form-control"
            />
          </label>
        </div>

        <div>
          <label className="w-100">
            <h3 className="my-2">imdbUrl</h3>
            <input
              name="imdbUrl"
              type="url"
              placeholder="Enter an URL of imdb"
              value={imdbUrl}
              onChange={handleChange}
              autoComplete="off"
              required
              className="form-control"
            />
          </label>
        </div>

        <div>
          <label className="w-100">
            <h3 className="my-2">imdbId</h3>
            <input
              name="imdbId"
              type="text"
              placeholder="Enter an ID of imdb"
              value={imdbId}
              onChange={handleChange}
              autoComplete="off"
              required
              className="form-control"
            />
          </label>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg my-3 px-5">
            Add
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

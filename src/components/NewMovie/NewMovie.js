import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MovieInput } from '../MovieInput';
import './NewMovie.scss';

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

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

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
        <h2 className="title">Add new movie</h2>
        <form onSubmit={this.handleSubmit}>
          <MovieInput
            title="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />

          <div className="MovieInput">
            <label htmlFor="description">
              Description
            </label>
            <textarea
              type="text"
              placeholder="Enter description"
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>

          <MovieInput
            title="Image url"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />

          <MovieInput
            title="IMDb url"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />

          <MovieInput
            title="IMDb id"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />

          <button type="submit">
            Add movie
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

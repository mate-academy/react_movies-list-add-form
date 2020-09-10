import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './NewMovie.scss';

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

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  titleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  descriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  imgUrlChange = (event) => {
    this.setState({
      imgUrl: event.target.value,
    });
  }

  imdbUrlChange = (event) => {
    this.setState({
      imdbUrl: event.target.value,
    });
  }

  imdbIdChange = (event) => {
    this.setState({
      imdbId: event.target.value,
    });
  }

  render() {
    const { title, description, imdbUrl, imdbId, imgUrl } = this.state;

    const checkFields = Object.values(this.state).every(item => item !== '');

    return (
      <form onSubmit={this.handleSubmit} className="formAddMovie">
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={this.titleChange}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <input
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={this.descriptionChange}
          />
        </label>
        <label htmlFor="imgUrl">
          imgUrl
          <input
            type="text"
            name="imgUrl"
            placeholder="imgUrl"
            value={imgUrl}
            onChange={this.imgUrlChange}
            required
          />
        </label>
        <label htmlFor="imdbUrl">
          imdbUrl
          <input
            type="text"
            name="imdbUrl"
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={this.imdbUrlChange}
            required
          />
        </label>
        <label htmlFor="imdbId">
          imdbId
          <input
            type="text"
            name="imdbId"
            placeholder="imdbId"
            value={imdbId}
            onChange={this.imdbIdChange}
            required
          />
        </label>
        <button
          type="submit"
          onClick={() => (checkFields) && (this.props.addMovie({
            title,
            description,
            imdbUrl,
            imdbId,
            imgUrl,
          }))
          }
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

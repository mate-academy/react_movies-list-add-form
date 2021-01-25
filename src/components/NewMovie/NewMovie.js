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
    imgUrlError: false,
    imdbUrlError: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    // eslint-disable-next-line
    const validator = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (name === 'imgUrl') {
      if (!validator.test(value)) {
        this.setState({ imgUrlError: true });
      } else {
        this.setState({ imgUrlError: false });
      }
    }

    if (name === 'imdbUrl') {
      if (!validator.test(value)) {
        this.setState({ imdbUrlError: true });
      } else {
        this.setState({ imdbUrlError: false });
      }
    }

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      imgUrlError: false,
      imdbUrlError: false,
    });

    const movie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.onAdd(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl,
      imdbUrl, imdbId, imgUrlError, imdbUrlError } = this.state;

    return (
      <form
        action="/movies.js"
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={this.handleChange}
            required
          />
        </label>

        <label htmlFor="description">
          Description
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imgUrl">
          imgUrl
          <input
            className={imgUrlError ? 'error' : ''}
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
          {imgUrlError && <p className="error-text">Invalid value</p>}
        </label>

        <label htmlFor="imdbUrl">
          imdbUrl
          <input
            className={imdbUrlError ? 'error' : ''}
            type="text"
            id="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
          {imdbUrlError && <p className="error-text">Invalid value</p>}
        </label>

        <label htmlFor="imdbId">
          imdbId
          <input
            type="text"
            id="imdbId"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />

        <button
          className="btn btn-primary"
          type="submit"
          disabled={this.state.imgUrlError || this.state.imdbUrlError}
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

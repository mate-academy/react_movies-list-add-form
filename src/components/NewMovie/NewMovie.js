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

    const { onAdd } = this.props;

    this.setState({
      imgUrlError: false,
      imdbUrlError: false,
    });

    // eslint-disable-next-line
    const urlValidation = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!imgUrl || !urlValidation.test(imgUrl)) {
      this.setState({ imgUrlError: true });

      return;
    }

    if (!imdbUrl || !urlValidation.test(imdbUrl)) {
      this.setState({ imdbUrlError: true });

      return;
    }

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);

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
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={imgUrl}
            placeholder="hhtps://"
            onChange={this.handleChange}
            required
          />
          {imgUrlError && <p className="error-text">Invalid value</p>}
        </label>

        <label htmlFor="imdbUrl">
          imdbUrl
          <input
            type="text"
            id="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            placeholder="hhtps://"
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
          className="button"
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    error: false,
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    /* eslint-disable-next-line */
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    let isError = false;

    if (!pattern.test(imgUrl)) {
      isError = true;

      this.setState({
        error: true,
      });

      return;
    }

    if (!pattern.test(imdbUrl)) {
      isError = true;

      this.setState({
        error: true,
      });

      return;
    }

    if (!isError) {
      this.props.addMovie({
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
        error: false,
        imdbId: '',
      });
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      error,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label className="form__title">
          Title:
          <input
            type="text"
            name="title"
            className="form__input"
            onChange={this.handleChange}
            value={title}
            placeholder="Enter title"
            required
          />
        </label>
        <label className="form__title">
          Description:
          <textarea
            className="form__input form__input--textarea"
            name="description"
            onChange={this.handleChange}
            value={description}
            placeholder="Enter description"
          />
        </label>
        <label className="form__title">
          Image URL:
          <input
            type="text"
            name="imgUrl"
            className={error ? 'error-field form__input' : 'form__input'}
            onChange={this.handleChange}
            value={imgUrl}
            placeholder="Enter poster link"
            required
          />
          {error && (
            <span className="error-message">Enter correct URL</span>
          )}
        </label>
        <label className="form__title">
          IMDb URL:
          <input
            type="text"
            name="imdbUrl"
            className={error ? 'error-field form__input' : 'form__input'}
            onChange={this.handleChange}
            value={imdbUrl}
            placeholder="Enter movie link on IMDBb"
            required
          />
          {error && (
            <span className="error-message">Enter correct URL</span>
          )}
        </label>
        <label className="form__title">
          IMDb Id:
          <input
            type="text"
            name="imdbId"
            className="form__input"
            onChange={this.handleChange}
            value={imdbId}
            placeholder="Enter movie IMDbId"
            required
          />
        </label>
        <button
          type="submit"
          className="form__btn"
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

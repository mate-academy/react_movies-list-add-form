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
    invalidImgUrl: false,
    invalidImdbUrl: false,
  }

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

    /* eslint-disable-next-line */
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    let isInvalid = false;

    if (!pattern.test(imgUrl)) {
      isInvalid = true;

      this.setState({
        invalidImgUrl: true,
      });
    }

    if (!pattern.test(imdbUrl)) {
      isInvalid = true;

      this.setState({
        invalidImdbUrl: true,
      });
    }

    if (!isInvalid) {
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
        imdbId: '',
      });
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      invalidImdbUrl,
      invalidImgUrl,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label>
          Title:
          <input
            type="text"
            name="title"
            className="movie__title element"
            onChange={this.handleChange}
            value={title}
            placeholder="Enter title"
            required
          />
        </label>
        <label>
          Description:
          <textarea
            className="movie__description element"
            name="description"
            onChange={this.handleChange}
            value={description}
            placeholder="Enter description"
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imgUrl"
            className={invalidImgUrl ? 'invalid-field element' : 'element'}
            onChange={this.handleChange}
            value={imgUrl}
            placeholder="Enter poster link"
            required
          />
          {invalidImgUrl && (
            <span className="invalid-message">Enter correct URL</span>
          )}
        </label>
        <br />
        <label>
          IMDb URL:
          <input
            type="text"
            name="imdbUrl"
            className={invalidImdbUrl ? 'invalid-field element' : 'element'}
            onChange={this.handleChange}
            value={imdbUrl}
            placeholder="Enter movie link on IMDBb"
            required
          />
          {invalidImdbUrl && (
            <span className="invalid-message">Enter correct URL</span>
          )}
        </label>
        <br />
        <label>
          IMDb Id:
          <input
            type="text"
            name="imdbId"
            className="movie__imdbId element"
            onChange={this.handleChange}
            value={imdbId}
            placeholder="Enter movie IMDbId"
            required
          />
        </label>
        <button
          type="submit"
          className="movie__button"
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

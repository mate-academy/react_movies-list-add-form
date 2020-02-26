import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as cx from 'classnames';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isError: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value.replace(/^\s/, ''),
    });
  }

  submitHandler = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!pattern.test(imgUrl) || !pattern.test(imdbUrl)) {
      this.setState({
        isError: true,
      });

      return;
    }

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
      isError: false,
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isError,
    } = this.state;

    const invalidClassName = cx('form__error', {
      'form__error--visible': !!isError,
    });

    return (
      <form
        className="form"
        onSubmit={this.submitHandler}
      >
        <p className="form__item">
          <label className="form__label" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="form__input"
            value={title}
            placeholder="Enter title"
            onChange={this.handleChange}
            required
          />
        </p>

        <p className="form__item">
          <label className="form__label" htmlFor="decription">
            Description:
          </label>
          <input
            id="description"
            type="text"
            name="description"
            className="form__input"
            value={description}
            placeholder="Enter description"
            onChange={this.handleChange}
          />
        </p>

        <p className="form__item">
          <label className="form__label" htmlFor="imgUrl">Image URL:</label>
          <input
            id="imgUrl"
            type="text"
            name="imgUrl"
            className="form__input"
            value={imgUrl}
            placeholder="Enter image URL"
            onChange={this.handleChange}
            required
          />
          <span className={invalidClassName}>Enter correct URL</span>
        </p>

        <p className="form__item">
          <label className="form__label" htmlFor="imdbUrl">
            IMDb URL:
          </label>
          <input
            id="imdbUrl"
            type="text"
            name="imdbUrl"
            className="form__input"
            value={imdbUrl}
            placeholder="Enter IMDb URL"
            onChange={this.handleChange}
            required
          />
          {isError
            && <span className={invalidClassName}>Enter correct URL</span>}
        </p>

        <p className="form__item">
          <label className="form__label" htmlFor="imdb-id">
            IMDb ID:
          </label>
          <input
            id="imdb-id"
            type="text"
            name="imdbId"
            className="form__input"
            value={imdbId}
            placeholder="Enter IMDb ID"
            onChange={this.handleChange}
            required
          />
        </p>
        <button
          type="submit"
          className="form__button"
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

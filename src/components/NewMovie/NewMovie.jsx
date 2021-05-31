import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NewMovie.scss';

// eslint-disable-next-line
const urlValidation = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isError: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  componentDidMount() {
    this.defaultState = this.state;
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
      case 'imdbId':
        this.setState(state => ({
          [name]: value,
          isError: {
            ...state.isError,
            [name]: !value.trim(),
          },
        }));

        return;
      case 'imgUrl':
      case 'imdbUrl':
        this.setState(state => ({
          [name]: value,
          isError: {
            ...state.isError,
            [name]: !urlValidation.test(value),
          },
        }));

        return;
      default:
        this.setState({ [name]: value });
    }
  };

  addNewMovie = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    const isError = {
      title: !title.trim(),
      imgUrl: !urlValidation.test(imgUrl),
      imdbUrl: !urlValidation.test(imdbUrl),
      imdbId: !imdbId.trim(),
    };

    if (Object.values(isError).includes(true)) {
      this.setState({ isError });

      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    this.setState(this.defaultState);
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

    return (
      <form
        className="new-movie"
        onSubmit={this.addNewMovie}
      >
        <label htmlFor="title">
          <h2>Title</h2>
          <input
            type="text"
            id="title"
            className={classNames(
              'new-movie__input', isError.title && 'disable',
            )}
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </label>
        <p
          className={classNames(
            'new-movie__error', isError.title && 'active',
          )}
        >
          Please, enter a correct title
        </p>

        <label htmlFor="description">
          <h2>Description</h2>
          <input
            type="text"
            id="description"
            className="new-movie__input"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <p className="new-movie__error" />
        </label>

        <label htmlFor="imgUrl">
          <h2>ImgUrl</h2>
          <input
            type="text"
            id="imgUrl"
            className={classNames(
              'new-movie__input', isError.imgUrl && 'disable',
            )}
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
        </label>
        <p
          className={classNames(
            'new-movie__error', isError.imgUrl && 'active',
          )}
        >
          Please, enter a correct url-address
        </p>

        <label htmlFor="imdbUrl">
          <h2>ImdbUrl</h2>
          <input
            type="text"
            id="imdbUrl"
            className={classNames(
              'new-movie__input', isError.imdbUrl && 'disable',
            )}
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </label>
        <p
          className={classNames(
            'new-movie__error', isError.imdbUrl && 'active',
          )}
        >
          Please, enter a correct url-address
        </p>

        <label htmlFor="imdbId">
          <h2>ImdbId</h2>
          <input
            type="text"
            id="imdbId"
            className={classNames(
              'new-movie__input', isError.imdbId && 'disable',
            )}
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
        </label>
        <p
          className={classNames(
            'new-movie__error', isError.imdbId && 'active',
          )}
        >
          Please, enter a correct id
        </p>

        <button
          type="submit"
          className="new-movie__button"
          disabled={Object.values(isError).includes(true)}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

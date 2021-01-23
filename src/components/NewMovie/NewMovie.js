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
    cleanForm: true,
    errors: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    checkDoubles: PropTypes.func.isRequired,
  }

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errors: {
        title: false,
        description: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      },
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      [name]: value,
      cleanForm: false,
      errors: {
        ...state.errors,
        [name]: false,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      cleanForm,
      errors,
    } = this.state;

    if (cleanForm) {
      this.setState(state => ({
        cleanForm: false,
        errors: {
          ...state.errors,
          title: true,
          imgUrl: true,
          imdbUrl: true,
          imdbId: true,
        },
      }));

      return;
    }

    if (Object.values(errors).some(error => error)) {
      return;
    }

    const newMovie = {
      title, description, imgUrl, imdbUrl, imdbId,
    };

    this.clearState();
    this.props.onAdd(newMovie);
  }

  showError = (name) => {
    this.setState(state => ({
      errors: {
        ...state.errors,
        [name]: true,
      },
    }));
  }

  validateInput = (event) => {
    const { name, dataset, value } = event.target;
    const { checkDoubles } = this.props;

    // eslint-disable-next-line
    if (dataset.type === 'url' && !value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/)) {
      this.showError(name);

      return;
    }

    if (dataset.type === 'id' && checkDoubles(value)) {
      this.showError(name);

      return;
    }

    if (!value) {
      this.showError(name);
    }
  }

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId, errors,
    } = this.state;

    return (
      <form
        action="/"
        type="POST"
        onSubmit={this.handleSubmit}
      >
        <fieldset className="section">
          <legend>Add new Movie</legend>

          <label htmlFor="title">
            Title:&nbsp;
            <input
              type="text"
              name="title"
              id="title"
              className={errors.title ? 'error' : undefined}
              autoComplete="off"
              placeholder="Movie title"
              value={title}
              onChange={this.handleChange}
              onBlur={this.validateInput}
            />
          </label>
          <p
            className="error-message"
            hidden={!errors.title}
          >
            Please, provide movie name
          </p>

          <label htmlFor="description">
            Description:&nbsp;
            <input
              type="text"
              name="description"
              id="description"
              autoComplete="off"
              placeholder="Movie description"
              value={description}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="imgUrl">
            Movie poster:&nbsp;
            <input
              type="text"
              name="imgUrl"
              id="imgUrl"
              data-type="url"
              className={errors.imgUrl ? 'error' : undefined}
              autoComplete="off"
              placeholder="Poster URL"
              value={imgUrl}
              onChange={this.handleChange}
              onBlur={this.validateInput}
            />
          </label>
          <p
            className="error-message"
            hidden={!errors.imgUrl}
          >
            Please, provide poster URL
          </p>

          <label htmlFor="imdbUrl">
            IMDB URL:&nbsp;
            <input
              type="text"
              name="imdbUrl"
              id="imdbUrl"
              data-type="url"
              className={errors.imdbUrl ? 'error' : undefined}
              autoComplete="off"
              placeholder="IMDB URL"
              value={imdbUrl}
              onChange={this.handleChange}
              onBlur={this.validateInput}
            />
          </label>
          <p
            className="error-message"
            hidden={!errors.imdbUrl}
          >
            Please, provide IMDB URL
          </p>

          <label htmlFor="imdbId">
            IMDB ID:&nbsp;
            <input
              type="text"
              name="imdbId"
              id="imdbId"
              data-type="id"
              className={errors.imdbId ? 'error' : undefined}
              autoComplete="off"
              placeholder="IMDB ID"
              value={imdbId}
              onChange={this.handleChange}
              onBlur={this.validateInput}
            />
          </label>
          <p
            className="error-message"
            hidden={!errors.imdbId}
          >
            IMDB ID is empty or matches already existing
          </p>

          <button
            type="submit"
            disabled={Object.values(errors).some(error => error)}
          >
            Add Movie
          </button>
        </fieldset>
      </form>
    );
  }
}

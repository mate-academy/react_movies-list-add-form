import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NewMovie.scss';

const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];

export class NewMovie extends Component {
  state = {
    values: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
      buttonDisabled: false,
    },
  };

  static propTypes = {
    addMovie: PropTypes.func.isRequired,
  }

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState((state) => {
      const buttonDisabled = Object.keys(state.values)
        .some(field => requiredFields
          .includes(this.state.values[field]) && !this.state.values[field]);

      return ({
        values: {
          ...state.values,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: false,
          buttonDisabled,
        },
      });
    });
  }

  clearForm = () => {
    this.setState({
      values: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      errors: {
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
        buttonDisabled: false,
      },
    });
  }

  onSubmit = (event) => {
    const {
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    } = this.state.values;

    const { addMovie } = this.props;

    event.preventDefault();

    const currentErrors = {
      buttonDisabled: true,
    };

    if (!title) {
      currentErrors.title = true;
    }

    // eslint-disable-next-line
    const urlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!imgUrl || !urlRegex.test(imgUrl)) {
      currentErrors.imgUrl = true;
    }

    if (!imdbUrl || !urlRegex.test(imdbUrl)) {
      currentErrors.imdbUrl = true;
    }

    if (!imdbId) {
      currentErrors.imdbId = true;
    }

    if (Object.keys(currentErrors).length > 1) {
      this.setState({ errors: currentErrors });

      return;
    }

    addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.clearForm();
  };

  render() {
    const { values, errors } = this.state;

    return (
      <form
        action=""
        method="post"
        onSubmit={this.onSubmit}
      >
        {errors.title && (
          <span className="error">
            Please enter a film title
          </span>
        )}

        <label className="label">
          Film Title:
          <input
            className={classNames(
              'input',
              { 'is-danger': errors.title },
            )}
            name="title"
            type="text"
            value={values.title}
            placeholder="Title"
            onChange={this.onChange}
          />
        </label>

        <label className="label">
          Film Description:
          <input
            className="input"
            name="description"
            type="text"
            placeholder="Description"
            value={values.description}
            onChange={this.onChange}
          />
        </label>

        {errors.imgUrl && (
          <span className="error">
            Please enter an image link
          </span>
        )}

        <label className="label">
          Image link:
          <input
            className={classNames(
              'input',
              { 'is-danger': errors.imgUrl },
            )}
            name="imgUrl"
            type="text"
            placeholder="Image Url"
            value={values.imgUrl}
            onChange={this.onChange}
          />
        </label>

        {errors.imdbUrl && (
          <span className="error">
            Please enter an IMDB link
          </span>
        )}

        <label className="label">
          IMDB link:
          <input
            className={classNames({
              input: true,
              'is-danger': errors.imdbUrl,
            })}
            name="imdbUrl"
            type="text"
            placeholder="IMDB Url"
            value={values.imdbUrl}
            onChange={this.onChange}
          />
        </label>

        {errors.imdbId && (
          <span className="error">
            Please enter an IMDB id
          </span>
        )}

        <label className="label">
          IMDB ID:
          <input
            className={classNames(
              'input',
              { 'is-danger': errors.imdbId },
            )}
            name="imdbId"
            type="text"
            placeholder="IMDB Id"
            value={values.imdbId}
            onChange={this.onChange}
          />
        </label>

        <button
          className="button is-warning"
          type="submit"
          disabled={errors.buttonDisabled}
        >
          Add new movie
        </button>
      </form>
    );
  }
}

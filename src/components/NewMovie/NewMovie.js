import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    values: {
      title: '',
      description: '', // not req
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      title: false,
      description: false, // not req
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
      isValidImdbUrl: false,
      isValidImgUrl: false,
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value.trim(),
      },
      errors: {
        ...state.errors,
        [name]: false,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const { values } = this.state;
    const { title, imgUrl, imdbUrl, imdbId } = values;
    // eslint-disable-next-line
    const urlRegExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!title
      || !imgUrl
      || !imdbUrl
      || !imdbId
      || urlRegExp.test(imgUrl) === false
      || urlRegExp.test(imdbUrl) === false
    ) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          title: !title,
          imgUrl: !imgUrl,
          imdbUrl: !imgUrl,
          imdbId: !imgUrl,
          isValidImgUrl: !urlRegExp.test(imgUrl),
          isValidImdbUrl: !urlRegExp.test(imdbUrl),
        },
      }));

      return;
    }

    onAdd(values);

    this.setState({
      values: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  }

  render() {
    const { values, errors } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="title">
          Enter a film name:
        </label>

        <input
          type="text"
          id="title"
          className={errors.title ? 'invalid' : ''}
          name="title"
          value={values.title}
          onChange={this.handleChange}
          placeholder="Film name"
        />

        {errors.title && (
          <span className="error">
            Please enter a name
          </span>
        )}

        <label htmlFor="description">
          Enter a description:
        </label>

        <input
          type="text"
          id="description"
          className={errors.description ? 'invalid' : ''}
          name="description"
          value={values.description}
          onChange={this.handleChange}
          placeholder="Film description"
        />

        {errors.description && (
          <span className="error">
            Please enter a description
          </span>
        )}

        <label htmlFor="imgUrl">
          Enter a link on the film image:
        </label>

        <input
          type="text"
          id="imgUrl"
          className={errors.imgUrl ? 'invalid' : ''}
          name="imgUrl"
          value={values.imgUrl}
          onChange={this.handleChange}
          placeholder="https://example.com"
        />

        {errors.imgUrl && (
          <span className="error">
            Please enter a link on the film image
          </span>
        )}

        <label htmlFor="imdbUrl">
          Enter a link on the IMDb logo:
        </label>

        <input
          type="text"
          id="imdbUrl"
          className={errors.imdbUrl ? 'invalid' : ''}
          name="imdbUrl"
          value={values.imdbUrl}
          onChange={this.handleChange}
          placeholder="https://example.com"
        />

        {errors.imdbUrl && (
          <span className="error">
            Please enter a link on the IMDb logo
          </span>
        )}

        <label htmlFor="imdbId">
          Enter an IMDb id:
        </label>

        <input
          type="text"
          id="imdbId"
          className={errors.imdbId ? 'invalid' : ''}
          name="imdbId"
          value={values.imdbId}
          onChange={this.handleChange}
          placeholder="IMDb id"
        />

        {errors.imdbId && (
          <span className="error">
            Please enter an IMDb id
          </span>
        )}

        <button type="submit">
          Add New Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

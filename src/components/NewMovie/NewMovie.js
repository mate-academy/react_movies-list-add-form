import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { InputField } from '../InputField';

// eslint-disable-next-line max-len
const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  errors: {
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  },
};

export class NewMovie extends Component {
  state = {
    ...initialState,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      [name]: value,
      errors: {
        ...state.errors,
        [name]: false,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { errors } = this.state;

    if (errors.title || errors.imgUrl || errors.imdbUrl || errors.imdbId) {
      return;
    }

    const { onAdd } = this.props;

    const movie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    onAdd(movie);

    this.setState({
      ...initialState,
    });
  }

  validateText = (event) => {
    const { name } = event.target;

    if (this.state[name].trim()) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          [name]: false,
        },
      }));
    } else {
      this.setState(state => ({
        errors: {
          ...state.errors,
          [name]: true,
        },
      }));
    }
  }

  validateUrl = (event) => {
    const { name } = event.target;

    if (this.state[name].match(regExp)) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          [name]: false,
        },
      }));
    } else {
      this.setState(state => ({
        errors: {
          ...state.errors,
          [name]: true,
        },
      }));
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
    } = this.state;

    const {
      handleChange,
      handleSubmit,
      validateText,
      validateUrl,
    } = this;

    return (
      <form onSubmit={handleSubmit}>
        <h2 className="h5">Add movie</h2>

        <InputField
          name="title"
          value={title}
          error={errors.title}
          onChange={handleChange}
          onBlur={validateText}
        />

        <InputField
          name="description"
          value={description}
          onChange={handleChange}
        />

        <InputField
          name="imgUrl"
          value={imgUrl}
          error={errors.imgUrl}
          onChange={handleChange}
          onBlur={validateUrl}
        />

        <InputField
          name="imdbUrl"
          value={imdbUrl}
          error={errors.imdbUrl}
          onChange={handleChange}
          onBlur={validateUrl}
        />

        <InputField
          name="imdbId"
          value={imdbId}
          error={errors.imdbId}
          onChange={handleChange}
          onBlur={validateText}
        />

        <button
          type="submit"
          className="btn btn-info mt-4"
          disabled={!title || !imgUrl || !imdbUrl || !imdbId}
        >
          Add New Movie
        </button>

      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

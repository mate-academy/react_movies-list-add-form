import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './NewMovie.scss';

// eslint-disable-next-line
const regexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

const defaultValues = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component {
  state = {
    values: defaultValues,
    errors: {
      titleError: false,
      descriptionError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbIdError: false,
    },
  };

  handleInput = (event) => {
    const { target } = event;
    const { name } = event.target;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: target.value.trim(),
      },
      errors: {
        ...prevState.errors,
        [`${name}Error`]: false,
      },
    }));
  };

  clearForm = () => (
    this.setState({
      values: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    })
  )

  onBlurTitle = (event) => {
    if (!this.state.values.title) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          titleError: !prevState.values.title,
        },
      }));
    }
  }

  onBlurDescription = (event) => {
    if (!this.state.values.title) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          descriptionError: !prevState.values.description,
        },
      }));
    }
  }

  onBlurImgUrl = (event) => {
    if (!regexp.test(this.state.values.imgUrl)
      || this.state.values.imgUrl === '') {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          imgUrlError: true,
        },
      }));
    }
  }

  onBlurImdbUrl = (event) => {
    if (!regexp.test(this.state.values.imdbUrl)) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          imdbUrlError: true,
        },
      }));
    }
  }

  onBlurImdbId = (event) => {
    if (!this.state.values.title) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          imdbIdError: !prevState.values.title,
        },
      }));
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.addMovie({ ...this.state.values });
    this.setState({ values: defaultValues });
  }

  render() {
    const { errors, values } = this.state;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.values;
    const {
      titleError,
      descriptionError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state.errors;

    const disabledSubmit = (Object.values(errors).some(error => error === true))
      || (Object.values(values).some(value => value === ''));

    return (
      <>
        <form onSubmit={this.onSubmit} className="form">

          <label className="form__item">
            Title
            <input
              type="text"
              name="title"
              value={title}
              onBlur={this.onBlurTitle}
              onChange={this.handleInput}
              className={titleError ? 'form__input-error' : 'form__input'}
            />
          </label>
          {titleError && (
            <span className="error">
              Please, enter a title
            </span>
          )}

          <label className="form__item">
            Description
            <input
              type="text"
              name="description"
              value={description}
              onBlur={this.onBlurDescription}
              onChange={this.handleInput}
              className={descriptionError ? 'form__input-error' : 'form__input'}
            />
          </label>
          {descriptionError && (
            <span className="error">
              Please, enter a description
            </span>
          )}
          <label className="form__item">
            ImgUrl
            <input
              type="text"
              name="imgUrl"
              value={imgUrl}
              onChange={this.handleInput}
              onBlur={this.onBlurImgUrl}
              className={imgUrlError ? 'form__input-error' : 'form__input'}
            />
          </label>
          {imgUrlError && (
            <span className="error">
              Please enter correct ImgUrl
            </span>
          )}
          <label className="form__item">
            ImdbUrl
            <input
              type="text"
              name="imdbUrl"
              value={imdbUrl}
              onChange={this.handleInput}
              onBlur={this.onBlurImdbUrl}
              className={imdbUrlError ? 'form__input-error' : 'form__input'}
            />
          </label>
          {imdbUrlError && (
            <span className="error">
              Please enter correct ImdbUrl
            </span>
          )}
          <label className="form__item">
            ImdbId
            <input
              type="text"
              name="imdbId"
              value={imdbId}
              onChange={this.handleInput}
              className="form__input"
            />
          </label>
          {imdbIdError && (
            <span className="error">
              Please enter correct ImdbId
            </span>
          )}
          <button
            type="submit"
            disabled={disabledSubmit}
            className={classNames(
              { form__button: !disabledSubmit },
              { 'form__button--disabled': disabledSubmit },
            )}
          >
            Submit
          </button>
        </form>
      </>

    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

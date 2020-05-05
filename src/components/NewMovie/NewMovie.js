import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleInputError: false,
    descriptionInputError: false,
    imgUrlInputError: false,
    imdbUrlInputError: false,
    imdbIdInputError: false,
    formErrors: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    formValid: false,
  };

  onAdd = (e) => {
    e.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { addMovie } = this.props;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(newMovie);
    this.clearForm();
  }

  clearForm= () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      titleInputError: false,
      descriptionInputError: false,
      imgUrlInputError: false,
      imdbUrlInputError: false,
      imdbIdInputError: false,
      formErrors: {
        title: '', description: '', imgUrl: '', imdbUrl: '', imdbId: '',
      },
      formValid: false,
    });
  }

  handleInput = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    this.setState(
      { [name]: value },
      () => {
        this.checkField(name, value);
      },
    );
  }

  checkField(fieldName, valueStr) {
    let { titleInputError, descriptionInputError } = this.state;
    let { imgUrlInputError, imdbUrlInputError, imdbIdInputError } = this.state;
    const { formErrors } = this.state;
    const value = valueStr.trim();
    // eslint-disable-next-line
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    switch (fieldName) {
      case 'title':
        titleInputError = value.length > 0 && value.length < 30;
        formErrors.title = titleInputError
          ? ''
          : 'Title length is from 1 to 30 characters';
        break;
      case 'description':
        descriptionInputError = value.length > 0;
        formErrors.description = descriptionInputError
          ? ''
          : 'Enter movie description';
        break;
      case 'imgUrl':
        imgUrlInputError = regExp.test(value);
        formErrors.imgUrl = imgUrlInputError
          ? ''
          : 'Enter the correct link';
        break;
      case 'imdbUrl':
        imdbUrlInputError = regExp.test(value);
        formErrors.imdbUrl = imdbUrlInputError ? '' : 'Enter the correct link';
        break;
      case 'imdbId':
        imdbIdInputError = value.length === 9;
        formErrors.imdbId = imdbIdInputError
          ? ''
          : 'imdbId length is 9 characters';
        break;
      default:
        break;
    }

    this.setState({
      formErrors,
      titleInputError,
      descriptionInputError,
      imgUrlInputError,
      imdbUrlInputError,
      imdbIdInputError,
    }, this.validateForm);
  }

  validateForm() {
    this.setState(state => ({
      formValid: state.titleInputError
      && state.descriptionInputError
      && state.imgUrlInputError
      && state.imdbUrlInputError
      && state.imdbIdInputError,
    }));
  }

  render() {
    const { title, description, imgUrl } = this.state;
    const { imdbUrl, imdbId, formValid, formErrors } = this.state;

    return (
      <>
        <h1 className="">New movie</h1>
        <form
          className="form"
          onSubmit={this.onAdd}
        >
          <Input
            value={title}
            formErrors={formErrors}
            handleInput={this.handleInput}
            name="title"
          />

          <div className={`form-group
          ${(this.state.formErrors.description.length === 0
        ? ''
        : 'has-error')}`
          }
          >
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              type="text"
              name="description"
              value={description}
              autoComplete="off"
              onChange={this.handleInput}
            />
            {formErrors.description.length
              ? <span className="formErrors">{formErrors.description}</span>
              : ''
            }
          </div>

          <Input
            value={imgUrl}
            formErrors={formErrors}
            handleInput={this.handleInput}
            name="imgUrl"
          />
          <Input
            value={imdbUrl}
            formErrors={formErrors}
            handleInput={this.handleInput}
            name="imdbUrl"
          />
          <Input
            value={imdbId}
            formErrors={formErrors}
            handleInput={this.handleInput}
            name="imdbId"
          />

          <button
            className="btn btn-primary"
            type="submit"
            disabled={!formValid}
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

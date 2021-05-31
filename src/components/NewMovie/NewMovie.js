import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import cloneDeep from 'lodash/cloneDeep';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      titleError: {
        empty: '',
      },
      imgUrlError: {
        empty: '',
      },
      imdbUrlError: {
        empty: '',
      },
      imdbIdError: {
        empty: '',
      },
    },
    validation: false,
  }

  hasErrors = () => {
    const { errors } = this.state;
    const arrOfErrors = Object.keys(errors);

    return arrOfErrors.indexOf(error => error.empty.length > 0) !== -1;
  }

  isRequiredFieldsFilled = () => {
    const arrOfFields = Object.keys(this.state);
    const requiredFields = arrOfFields.filter((field) => {
      return field !== 'errors'
        && field !== 'description'
        && field !== 'validation';
    });

    return requiredFields.every(field => this.state[field].length > 0);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    if (!title && !imgUrl && !imdbUrl && !imdbId) {
      return;
    }

    this.props.onAdd({
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

  validateField = (event) => {
    const field = event.target.name;

    if (event.target.value.length === 0) {
      this.saveErrors(field, 'empty', 'is required');
    }

    if (!this.hasErrors() && this.isRequiredFieldsFilled()) {
      this.setState({ validation: true });
    }
  }

  saveErrors = (forField, typeOfError, message) => {
    this.setState(prevState => ({
      ...cloneDeep(prevState),
      errors: {
        ...prevState.errors,
        [forField.concat('Error')]: { [typeOfError]: message },
      },
    }));
  }

  clearEmptyErrorForField = (field) => {
    const { errors } = this.state;

    if (errors[field.concat('Error')]?.empty.length > 0) {
      errors[field.concat('Error')].empty = '';
    }
  }

  hangleField = (event) => {
    const field = event.target.name;

    this.setState({ [field]: event.target.value });
    this.clearEmptyErrorForField(field);
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId } = this.state;

    const { titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError } = this.state.errors;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        <fieldset>
          <legend>New film informanition:</legend>
          <div className="field">
            <label htmlFor="title">Title:&nbsp;</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={this.hangleField}
              onBlur={this.validateField}
            />
            {titleError.empty && (
              <span className="error">{titleError.empty}</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="description">Description:&nbsp;</label>
            <textarea
              id="description"
              name="description"
              className="description"
              value={description}
              onChange={this.hangleField}
            />
          </div>
          <div className="field">
            <label htmlFor="imgUrl">imgUrl:&nbsp;</label>
            <input
              type="text"
              id="imgUrl"
              name="imgUrl"
              value={imgUrl}
              onChange={this.hangleField}
              onBlur={this.validateField}
            />
            {imgUrlError.empty && (
              <span className="error">{imgUrlError.empty}</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="imdbUrl">imdbUrl:&nbsp;</label>
            <input
              type="text"
              id="imdbUrl"
              name="imdbUrl"
              value={imdbUrl}
              onChange={this.hangleField}
              onBlur={this.validateField}
            />
            {imdbUrlError.empty && (
              <span className="error">{imdbUrlError.empty}</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="imdbId">imdbId:&nbsp;</label>
            <input
              type="text"
              id="imdbId"
              name="imdbId"
              value={imdbId}
              onChange={this.hangleField}
              onBlur={this.validateField}
            />
            {imdbIdError.empty && (
              <span className="error">{imdbIdError.empty}</span>
            )}
          </div>
        </fieldset>
        <button
          type="submit"
          className="btn"
        >
          Add a film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

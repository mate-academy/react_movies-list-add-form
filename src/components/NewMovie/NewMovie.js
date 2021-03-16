import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    values: {
      imdbId: '',
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
    },
    errors: {},
    maxlength: 30,
    charsLeft: 30,
  };

  validate = {
    title: title => this.validateString('Title', title),
    description: description => this.validateString('Description', description),
    imgUrl: url => this.validateUrl(url),
    imdbUrl: url => this.validateUrl(url),
    imdbId: id => this.validateString('ID', id),
  };

  initialValues = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  validateString = (fieldName, fieldValue) => {
    if (fieldValue.trim() === '') {
      return `${fieldName} is required`;
    }

    if (fieldName === 'Title' && /[^a-zA-Z -]/.test(fieldValue)) {
      return 'Invalid characters';
    }

    if (fieldValue.trim().length < 1) {
      return `${fieldName} needs to be at least one characters`;
    }

    return null;
  };

  validateUrl = (url) => {
    if (
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(
        url,
      )
    ) {
      return null;
    }

    if (url.trim() === '') {
      return 'Url is required';
    }

    return 'Please enter a valid Url';
  };

  getCharactersLeft = (type, name, value, charsLeft) => {
    const { maxlength } = this.state;

    return type === 'text' && name === 'title'
      ? maxlength - value.length
      : charsLeft;
  }

  handleChange = (event) => {
    const { name, value, type } = event.target;

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: type === 'text' ? value.replace(/^\s/g, '') : value,
      },
      charsLeft: this.getCharactersLeft(type, name, value, state.charsLeft),
    }));
  }

  handleBlur = (event) => {
    const { name, value } = event.target;
    const { errors } = this.state;

    const { [name]: removedError, ...rest } = errors;
    const error = this.validate[name](value);

    this.setState({
      errors: {
        ...rest,
        ...(error && { [name]: error }),
      },
    });
  };

  handleSubmit = (event) => {
    const { values, errors, maxlength } = this.state;
    const { onAdd } = this.props;

    event.preventDefault();

    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = this.validate[key](values[key]);

        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
        };
      },
      {
        errors: { ...errors },
      },
    );

    this.setState({
      errors: formValidation.errors,
    });

    if (this.checkFormError(formValidation)) {
      onAdd(values);
      this.setState({
        values: this.initialValues,
        charsLeft: maxlength,
      });
    }
  };

  checkFormError = formValidation => !Object
    .values(formValidation.errors).length;

  render() {
    const {
      maxlength,
      charsLeft,
      values,
      errors,
    } = this.state;

    return (
      <div className="newMovie">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div>
            <input
              type="text"
              name="imdbId"
              className={errors.imdbId ? 'error' : ''}
              value={values.imdbId}
              placeholder="Please enter a ID"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {errors.imdbId && (
              <div className="errorText">
                {errors.imdbId}
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="title"
              maxLength={maxlength}
              className={errors.title ? 'error' : ''}
              value={values.title}
              placeholder="Please enter a title"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <p>
              Characters Left:
              {' '}
              { charsLeft }
            </p>
            {errors.title && (
            <div className="errorText">
              {errors.title}
            </div>
            )}
          </div>
          <div>
            <textarea
              name="description"
              value={values.description}
              placeholder="Please enter a description"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {errors.description && (
              <div className="errorText">
                {errors.description}
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="imgUrl"
              className={errors.imgUrl ? 'error' : ''}
              value={values.imgUrl}
              placeholder="Please enter a image Url"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {errors.imgUrl && (
            <div className="errorText">
              {errors.imgUrl}
            </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="imdbUrl"
              className={errors.imdbUrl ? 'error' : ''}
              value={values.imdbUrl}
              placeholder="Please enter a Imdb Url"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {errors.imdbUrl && (
            <div className="errorText">
              {errors.imdbUrl}
            </div>
            )}
          </div>
          <button
            className="add"
            type="submit"
            disabled={Object.keys(errors).length !== 0}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

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

  handleChange = (event) => {
    const { name, value, type } = event.target;
    const { maxlength } = this.state;

    event.persist();

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: type === 'text' ? value.replace(/^\s/g, '') : value,
      },
      charsLeft: type === 'text' && name === 'title'
        ? maxlength - value.length
        : state.charsLeft,
    }));
  }

  handleBlur = (event) => {
    const { name, value } = event.target;
    const { validate } = this.props;
    const { errors } = this.state;

    const { [name]: removedError, ...rest } = errors;
    const error = validate[name](value);

    this.setState({
      errors: {
        ...rest,
        ...(error && { [name]: error }),
      },
    });
  };

  handleSubmit = (event) => {
    const { values, errors, maxlength } = this.state;
    const { validate, onAdd, initialValues } = this.props;

    event.preventDefault();

    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const isDescriptionKey = key === 'description';
        const newError = isDescriptionKey ? null : validate[key](values[key]);

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

    if (
      !Object.values(formValidation.errors).length // errors object is empty
    ) {
      onAdd(values);
      this.setState({
        values: initialValues,
        charsLeft: maxlength,
      });
    }
  };

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
            />
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
  initialValues: PropTypes.shape().isRequired,
  validate: PropTypes.shape().isRequired,
};

NewMovie.default = {
  description: '',
};

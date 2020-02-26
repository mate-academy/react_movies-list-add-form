import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';
import { TextField } from '../TextField/TextField';
import {
  initialValues,
  initialErrors,
  fields,
} from './constants';

export class NewMovie extends Component {
  state = {
    values: initialValues,
    errors: initialErrors,
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { values } = this.state;
    const newErrors = this.validate();
    const hasErrors = Object.values(newErrors).some(Boolean);

    if (!hasErrors) {
      this.props.addMovie({ ...values });
    }

    this.setState((prevState) => {
      return {
        values: hasErrors ? prevState.values : initialValues,
        errors: newErrors,
      };
    });
  }

  validate() {
    const {
      values,
      errors,
    } = this.state;

    const newErrors = fields
      .reduce((acc, fieldConfig) => {
        const { name, validators } = fieldConfig;

        if (!validators) {
          return {
            ...acc,
            [name]: null,
          };
        }

        const fieldValue = values[name];

        const fieldError = validators.reduce((error, validator) => {
          if (error) {
            return error;
          }

          return validator(name, fieldValue);
        }, null);

        return {
          ...acc,
          [name]: fieldError,
        };
      }, { ...errors });

    return newErrors;
  }

  render() {
    const {
      values,
      errors,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <h1 className="form__heading">Add your movie</h1>
        {fields.map((fieldConfig) => {
          const {
            name,
            label,
            placeholder,
          } = fieldConfig;

          return (
            <TextField
              key={name}
              name={name}
              label={label}
              placeholder={placeholder}
              value={values[name]}
              onChange={this.handleInputChange}
              error={errors[name]}
            />
          );
        })}

        <button
          type="submit"
          className="button is-link"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

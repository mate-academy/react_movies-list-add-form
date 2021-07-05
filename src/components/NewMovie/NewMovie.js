import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import { inputsConfig, inputsErrors, initialInputs } from './constants';

export class NewMovie extends Component {
  state = {
    ...initialInputs,
    errors: inputsErrors,
  };

  addInfo = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  onAdd = (event) => {
    event.preventDefault();
    const { addMovie } = this.props;

    this.setState((prevState) => {
      const { errors, hasErrors } = this.validateNewMovie(this.state);

      if (hasErrors) {
        return {
          errors,
        };
      }

      addMovie(prevState);

      return this.clearInputs();
    });
  }

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errors: inputsErrors,
    });
  }

  requiredValidator = (name, value) => {
    return value
      ? null
      : `Field ${name} is required`;
  }

  validateNewMovie = (newMovie) => {
    const errorsEntries = Object.entries(newMovie).map(([name, value]) => {
      const error = this.requiredValidator(name, value);

      return [name, error];
    });

    const hasErrors = errorsEntries.some(([, error]) => !!error);
    const errors = errorsEntries.reduce((acc, [name, error]) => {
      return {
        ...acc,
        [name]: error,
      };
    }, {});

    return {
      errors,
      hasErrors,
    };
  }

  blurValidation = (event) => {
    const { name } = event.target;

    if (this.state[name]) {
      this.setState((prevState) => {
        return ({
          errors: {
            ...prevState.errors,
            [name]: '',
          },
        });
      });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <form action="submit">
        {inputsConfig.map(name => (
          <div key={name}>
            <label className="add-movie-label">
              Add
              {name}
              <input
                className={classNames('ui input add-movie-input', {
                  error_in_field: errors[name],
                })}
                type="text"
                value={this.state[name]}
                onChange={this.addInfo}
                name={name}
                onBlur={this.blurValidation}
              />
            </label>
            {errors[name] && (
              <p className="error-text">{errors[name]}</p>
            )}
          </div>
        ))}

        <div>
          <button
            className="ui button add-movie-button"
            type="submit"
            onClick={this.onAdd}
          >
            Add movie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

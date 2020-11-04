import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateForm } from './validateForm';
import { Inputs } from './Inputs';

const movies = [
  'title',
  'description',
  'imgUrl',
  'imdbUrl',
  'imdbId',
];

const initialValues = movies.reduce((acc, name) => {
  return {
    ...acc,
    [name]: '',
  };
}, {});

const initialErrors = movies.reduce((acc, name) => {
  return {
    ...acc,
    [name]: null,
  };
}, {});

export class NewMovie extends Component {
  state = {
    values: initialValues,
    errors: initialErrors,
  };

  handleChange = ({ target }) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [target.name]: target.value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;

    this.setState((prevState) => {
      const {
        errors,
        hasErrors,
      } = validateForm(prevState.values);

      if (hasErrors) {
        return {
          errors,
        };
      }

      onSubmit(prevState.values);

      return {
        errors,
        values: initialValues,
      };
    });
  };

  render() {
    const { values, errors } = this.state;

    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        {movies.map(movie => (
          <Inputs
            movie={movie}
            values={values}
            errors={errors}
            handleChange={this.handleChange}
          />
        ))}
        <button type="submit">Ok</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

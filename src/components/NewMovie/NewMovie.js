import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateForm } from './validateForm';
import { Input } from './Input';

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
    // console.log(errors);

    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        {Object.entries(values).map(([movie, value]) => (
          <Input
            key={movie}
            movie={movie}
            value={value}
            error={errors[movie]}
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

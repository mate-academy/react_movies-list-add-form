import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input/Input';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const initialErrors = {
  title: null,
  imgUrl: null,
  imdbUrl: null,
  imdbId: null,
};

// eslint-disable-next-line
const regexUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

function isValidUrl(value) {
  return regexUrl.test(value)
    ? null
    : 'You should enter a valid Url';
}

function isRequiredField(value) {
  return !value
    ? 'The field is required'
    : null;
}

const validators = {
  title: isRequiredField,
  description: () => null,
  imgUrl: isValidUrl,
  imdbUrl: isValidUrl,
  imdbId: isRequiredField,
};

export class NewMovie extends React.Component {
  state = {
    inputs: initialState,
    errors: initialErrors,
  };

  handleValue = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => {
      return { inputs: {
        ...prevState.inputs,
        [name]: value,
      } };
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      const validatedValues = Object.entries(prevState.inputs).map(
        ([name, value]) => [name, validators[name](value)],
      ).filter(([name, error]) => error !== null);

      if (validatedValues.length === 0) {
        this.props.addMovie(prevState.inputs);

        return {
          inputs: initialState,
          errors: initialErrors,
        };
      }

      const errors = validatedValues.reduce((acc, [name, error]) => {
        return {
          ...acc,
          [name]: error,
        };
      }, {});

      return {
        errors,
      };
    });
  }

  render() {
    const { inputs, errors } = this.state;

    return (
      <form name="addMovie" onSubmit={this.handleSubmit}>
        {Object.entries(inputs).map(
          ([name, value]) => (
            <Input
              value={value}
              id={name}
              labelText={`Add a ${name}`}
              placeholder={
                name.includes('Url')
                  ? 'https://example.com'
                  : name
              }
              onChange={this.handleValue}
              error={errors[name]}
            />
          ),
        )}

        <div className="field">
          <button className="button is-link" type="submit">
            Add a movie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

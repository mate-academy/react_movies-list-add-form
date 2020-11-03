import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import './NewMovie.scss';

// eslint-disable-next-line max-len
const URLRegExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/;

const inputsFromServer = [
  'title',
  'description',
  'imgUrl',
  'imdbUrl',
  'imdbId',
];

const initialInputs = inputsFromServer.reduce((acc, field) => {
  return {
    ...acc,
    [field]: '',
  };
}, {});

const initialErrors = inputsFromServer.reduce((acc, error) => {
  return {
    ...acc,
    [error]: 'start',
  };
}, {});

function containsURL(inputName) {
  return /url/i.test(inputName);
}

export class NewMovie extends Component {
  state = {
    inputs: initialInputs,
    errors: initialErrors,
  };

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: value,
      },
    }));
  }

  onBlur = (fieldName) => {
    const inputValue = this.state.inputs[fieldName];

    if (!inputValue) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [fieldName]: 'empty',
        },
      }));

      return;
    }

    if (containsURL(fieldName)) {
      if (!inputValue.match(URLRegExp)) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [fieldName]: 'invalid',
          },
        }));
      } else {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [fieldName]: null,
          },
        }));
      }

      return;
    }

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [fieldName]: null,
      },
    }));
  }

  handlerSubmit = (event) => {
    event.preventDefault();

    const isError = Object.entries(this.state.errors).some(([name, error]) => {
      return !!error && name !== 'description';
    });

    if (isError) {
      return;
    }

    this.props.addMovie(this.state.inputs);
    this.resetState();
  }

  resetState = () => {
    this.setState({
      inputs: initialInputs,
      errors: initialErrors,
    });
  }

  render() {
    const { inputs, errors } = this.state;
    const hasErrors = Object.entries(errors).some(([name, error]) => {
      return !!error && name !== 'description';
    });

    return (
      <form
        className="form form-group"
        onSubmit={this.handlerSubmit}
      >
        <Input
          errorField={errors.title}
          field={inputs.title}
          fieldName="title"
          onChange={this.onChange}
          onBlur={this.onBlur}
        />

        <textarea
          name="description"
          placeholder="description"
          type="text"
          className="form-control"
          value={inputs.description}
          onChange={event => this.onChange(event)}
        />

        <Input
          errorField={errors.imgUrl}
          field={inputs.imgUrl}
          fieldName="imgUrl"
          onChange={this.onChange}
          onBlur={this.onBlur}
        />

        <Input
          errorField={errors.imdbUrl}
          field={inputs.imdbUrl}
          fieldName="imdbUrl"
          onChange={this.onChange}
          onBlur={this.onBlur}
        />

        <Input
          errorField={errors.imdbId}
          field={inputs.imdbId}
          fieldName="imdbId"
          onChange={this.onChange}
          onBlur={this.onBlur}
        />

        <button
          type="submit"
          className={hasErrors ? 'btn btn-dark disabled' : 'btn btn-dark'}
        >
          Add a movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

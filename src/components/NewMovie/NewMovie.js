import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import './NewMovie.scss';
import {
  URLRegExp,
  initialInputs,
  initialErrors,
  doesContainsURL,
} from '../../consts';

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
    const setError = text => (
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [fieldName]: text,
        },
      }))
    );

    if (fieldName === 'description') {
      return;
    }

    if (!inputValue) {
      setError('emptyField');

      return;
    }

    if (doesContainsURL(fieldName)) {
      if (!inputValue.match(URLRegExp)) {
        setError('invalid');
      } else {
        setError(null);
      }

      return;
    }

    setError(null);
  }

  handlerSubmit = (event) => {
    event.preventDefault();
    const { inputs } = this.state;

    const hasError = Object.entries(this.state.errors).some(([name, error]) => {
      return !!error && name !== 'description';
    });

    if (hasError) {
      return;
    }

    const newMovie = Object.entries(inputs).reduce((acc, [name, value]) => {
      return {
        ...acc,
        [name]: value,
      };
    }, {});

    this.props.addMovie(newMovie);
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
    const inputNames = Object.keys(inputs);

    return (
      <form
        className="form form-group"
        onSubmit={this.handlerSubmit}
      >
        {
          inputNames.map(inputName => (
            <Input
              errorField={errors[inputName]}
              field={inputs[inputName]}
              fieldName={inputName}
              onChange={this.onChange}
              onBlur={this.onBlur}
            />
          ))
        }

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

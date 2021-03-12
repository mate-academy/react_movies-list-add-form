import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from '../Input/Input';
import './NewMovie.scss';

const initalFields = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const initalErrors = {
  title: false,
  imgUrl: false,
  imdbUrl: false,
  imdbId: false,
};

// eslint-disable-next-line max-len
const patternUrl = '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)\n?[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)\n((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)#?\n(?:[.!/\\\\\\w]*))?)$';
const patternId = 'tt\\d{7}';

export class NewMovie extends Component {
  state = {
    fields: { ...initalFields },
    errors: { ...initalErrors },
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: false,
      },
    }));
  }

  handleBlur = (event) => {
    const { name } = event.target;

    this.setState((prevState) => {
      const inputIsEmpty = !prevState.fields[name].trim();

      const urlFormatNotValid = /Url/.test(name)
        && !prevState.fields[name].match(patternUrl);

      const idFormatNotValid = name === 'imdbId'
        && !prevState.fields[name].match(patternId);

      if (inputIsEmpty || urlFormatNotValid || idFormatNotValid) {
        return ({
          errors: {
            ...prevState.errors,
            [name]: true,
          },
        });
      }

      return ({
        errors: {
          ...prevState.errors,
          [name]: false,
        },
      });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { errors } = this.state;

    if (Object.entries(errors).some(error => error[1])) {
      return;
    }

    this.props.addMovie(this.state);
    this.setState({
      fields: { ...initalFields },
      errors: { ...initalErrors },
    });
  }

  render() {
    const { fields, errors } = this.state;
    const preparedFields = Object.entries(fields);
    const preparedErrors = Object.entries(errors);
    const error = preparedErrors.some(err => err[1]);

    return (
      <form onSubmit={this.handleSubmit}>
        {error && <div className="error">Not valid input</div> }
        {preparedFields.map(([inputName, value]) => (
          <Input
            key={inputName}
            name={inputName}
            value={value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        ))
        }
        <button type="submit" className="button is-link">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

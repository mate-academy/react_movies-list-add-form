import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './NewMovie.scss';

// eslint-disable-next-line
const urlRegex = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/g);

export class NewMovie extends Component {
  state = {
    title: {
      value: '',
      valid: true,
    },
    description: {
      value: '',
      valid: true,
    },
    imgUrl: {
      value: '',
      valid: true,
    },
    imdbUrl: {
      value: '',
      valid: true,
    },
    imdbId: {
      value: '',
      valid: true,
    },
  };

  isUrlValid = (url) => {
    return url.match(urlRegex) !== null;
  };

  isFieldValid = (name, value) => {
    return name === 'description'
      || (value.length !== 0
      && (!name.includes('Url') || this.isUrlValid(value)));
  };

  capitalize = (name) => {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
  }

  getErrorMessage = (name, value) => {
    if (value.length === 0) {
      return 'Please fill in this field';
    }

    if (name.includes('Url') && !this.isUrlValid(value)) {
      return 'Please enter valid URL';
    }

    return '';
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: {
        value,
        valid: true,
      },
    });
  };

  handleBlur = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: {
        value,
        valid: this.isFieldValid(name, value),
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState((state) => {
      const movie = Object.entries(state)
        .map(([name, data]) => ({
          [name]: data.value,
        }))
        .reduce((obj, current) => ({
          ...obj,
          ...current,
        }), {});

      this.props.onAdd(movie);

      return Object.entries(state)
        .map(([name]) => ({
          [name]: {
            value: '',
            valid: true,
          },
        }))
        .reduce((obj, current) => ({
          ...obj,
          ...current,
        }), {});
    });
  };

  render() {
    return (
      <form
        className="NewMovieForm"
        onSubmit={this.handleSubmit}
      >
        {Object.entries(this.state).map(([name, data]) => (
          <div
            key={name}
            className={cn('NewMovieForm__field', {
              'NewMovieForm__field--invalid': !data.valid,
            })}
            data-error={this.getErrorMessage(name, data.value)}
          >
            <input
              className="NewMovieForm__input"
              type="text"
              name={name}
              value={data.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder={this.capitalize(name)}
              required={name !== 'description'}
            />
          </div>
        ))}

        <div className="NewMovieForm__field">
          <button
            type="submit"
            className="NewMovieForm__button"
            onSubmit={this.handleSubmit}
            disabled={Object.values(this.state).some(value => !value.valid)}
          >
            Add Movie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

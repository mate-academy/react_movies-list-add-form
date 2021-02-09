/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

const links = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
const movies = ['title', 'imdbUrl', 'imgUrl', 'description', 'imdbId'];

const initState = {
  imdbUrl: '',
  title: '',
  imgUrl: '',
  imdbId: '',
  description: '',
  error: {
    title: false,
    imdbUrl: false,
    imgUrl: false,
    imdbId: false,
  },
  showError: {
    title: false,
    imdbUrl: false,
    imgUrl: false,
    imdbId: false,
  },
  disabled: false,
};

export class NewMovie extends Component {
  state = initState;

  handleBlur = (event) => {
    const { error } = this.state;
    const { name } = event.target;

    if (!error[name]) {
      return (this.validateError() && this.validateForm())
        ? this.setState({ disabled: false })
        : this.setState({ disabled: true });
    }

    return this.setState(state => ({
      showError: {
        ...state.showError, [name]: true,
      },
      disabled: true,
    }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const { showError } = this.state;
    let isValidEmail;

    switch (name) {
      case 'imdbUrl':
      case 'imgUrl': {
        isValidEmail = links.test(value);

        break;
      }

      case 'title':
      case 'imdbId': {
        isValidEmail = (value !== '');

        break;
      }

      default: {
        isValidEmail = true;
        break;
      }
    }

    this.setState(state => ({
      [name]: value,
      error: {
        ...state.error, [name]: !isValidEmail,
      },
    }));

    if (showError[name] && isValidEmail) {
      this.setState(state => ({ showError: {
        ...state.showError, [name]: false,
      } }));
    }
  }

  validateError = () => {
    const { error } = this.state;

    // eslint-disable-next-line no-restricted-syntax
    for (const err of Object.values(error)) {
      if (err === true) {
        return false;
      }
    }

    return true;
  }

  validateForm = () => {
    // eslint-disable-next-line no-restricted-syntax
    const requiredArr = movies.filter(movie => movie !== 'description');

    for (const film of requiredArr) {
      if (!this.state[film]) {
        return false;
      }
    }

    return true;
  }

  onSubmit = (event) => {
    event.preventDefault();
    const newMovie = this.creatNewMovie();

    this.props.onAdd(newMovie);
    this.clearForm();
  }

  creatNewMovie = () => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    return newMovie;
  }

  clearForm = () => {
    this.setState(initState);
  }

  render() {
    const { showError } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.onSubmit}
      >
        <>
          { movies.map(item => (
            <div key={item}>
              <input
                className="input"
                name={item}
                type="text"
                value={this.state[item]}
                placeholder={`Enter ${item}`}
                onChange={(event) => {
                  this.handleChange(event);
                }}
                onBlur={this.handleBlur}
              />
              {showError[item] && (
                <span
                  className="error"
                >
                  {`Please enter a valid
                  ${item}`}
                </span>
              )}
            </div>
          ))}
        </>
        <button
          type="submit"
          disabled={this.state.disabled}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

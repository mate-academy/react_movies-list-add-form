import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },

    errors: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },

    requiredFields: {
      title: true,
      description: false,
      imgUrl: true,
      imdbUrl: true,
      imdbId: true,
    },

    submitDisable: false,
  };

  isUrlValid = ({ value }) => {
    // eslint-disable-next-line
    const urlCheckerRegExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return urlCheckerRegExp.test(value);
  }

  setErrorStatusTrue = ({ name, value }) => {
    if (!this.state.requiredFields[name]) {
      return;
    }

    if (!this.state.newMovie[name]) {
      this.setState(state => ({
        ...state,

        errors: {
          ...state.errors,
          [name]: true,
        },
      }));
    }

    if (name === 'imgUrl'
      || name === 'imdbUrl') {
      if (!this.isUrlValid(value)) {
        this.setState(state => ({
          ...state,

          errors: {
            ...state.errors,
            [name]: true,
          },
        }));
      }
    }
  }

  changeValueHandler = ({ target }) => {
    this.setState(state => ({
      ...state,

      newMovie: {
        ...state.newMovie,
        [target.name]: target.value,
      },

      errors: (target.name === 'description')
        ? { ...state.errors }
        : {
          ...state.errors,
          [target.name]: false,
        },

      submitDisable: false,
    }));
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { newMovie, errors } = this.state;

    Object.entries(newMovie)
      .forEach(([fieldName, fieldValue]) => {
        if (fieldValue === '') {
          this.setErrorStatusTrue({
            name: fieldName,
            value: fieldValue,
          });
        }
      });

    if (!newMovie.title
    || !newMovie.imgUrl
    || !newMovie.imdbUrl
    || !newMovie.imdbId
    || Object.values(errors).some(err => err)) {
      this.setState(state => ({
        ...state,
        submitDisable: true,
      }));

      return;
    }

    this.props.addMovie(newMovie);

    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      errors: {
        title: false,
        description: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      },
      submitDisable: false,
    });
  }

  render() {
    const { newMovie, errors, submitDisable } = this.state;

    return (
      <form
        className="NewMovie"
        onSubmit={event => this.submitHandler(event)}
      >
        {Object.entries(newMovie).map(field => (
          <Input
            key={field[0]}
            field={field}
            changeValue={this.changeValueHandler}
            setError={this.setErrorStatusTrue}
            errors={errors}
          />
        ))}

        <button
          className="NewMovie__addBtn"
          type="submit"
          disabled={submitDisable}
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

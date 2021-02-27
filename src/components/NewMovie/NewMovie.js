import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FormInput } from '../FormInput';
import { NewMovieProps } from '../../props/NewMovieProps';

// eslint-disable-next-line max-len
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

const NEW_MOVIE = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const MOVIE_ERRORS = Object.keys(NEW_MOVIE)
  .filter(fild => fild === 'title'
    || fild === 'imgUrl'
    || fild === 'imdbUrl'
    || fild === 'imdbId')
  .reduce((errors, movie) => ({
    ...errors,
    [movie]: null,
  }), {});

export class NewMovie extends Component {
  state = {
    values: NEW_MOVIE,
    errors: MOVIE_ERRORS,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state.values);

    this.setState({
      values: NEW_MOVIE,
    });
  }

  handleBlur = (event) => {
    const { name, value } = event.target;
    const { errors } = this.state;
    const isControled = Object
      .prototype
      .hasOwnProperty
      .call(errors, name);

    if (!isControled) {
      return;
    }

    this.setState(state => ({
      errors: {
        ...state.errors,
        [name]: value ? null : `The ${name} is required`,
      },
    }));

    if (value && name.includes('Url')) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          [name]: regex.test(value) ? null : 'Please enter a valid url',
        },
      }));
    }
  }

  isDisabledButton = () => {
    const { title, imgUrl, imdbUrl, imdbId } = this.state.values;
    const hasErrors = Object.values(this.state.errors).some(err => err);

    return !imdbId
      || !imdbUrl
      || !imgUrl
      || !title
      || hasErrors;
  }

  render() {
    const {
      errors,
      values,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className="form-group row">Add film</h3>

        {Object.keys(values).map(fild => (
          <FormInput
            key={fild}
            name={fild}
            value={values[fild]}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            textError={errors[fild]}
          />
        ))}

        <button
          type="submit"
          className="btn btn-primary form-group row"
          disabled={this.isDisabledButton()}
        >
          Add film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = NewMovieProps;

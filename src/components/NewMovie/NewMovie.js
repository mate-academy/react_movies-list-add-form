import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NewMovieInput } from '../NewMovieInput/NewMovieInput';
import { NewMovieDefaultState,
  NewMovieDefaultStateValidatedFalse } from './NewMovieDefaultState';

export class NewMovie extends Component {
  state = NewMovieDefaultState;

  handleInput = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  }

  isValidatedInput = (event) => {
    const { name } = event.target;
    const validateItem = this.state[name];
    const isValueValidated = validateItem.pattern.test(validateItem.value);

    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        isValid: isValueValidated,
      },
    }));
  }

  onSubmittedMovie = (event) => {
    event.preventDefault();
    if (Object.is(this.state, NewMovieDefaultState)) {
      this.setState(NewMovieDefaultStateValidatedFalse);

      return;
    }

    const hadUnvalidated = Object.values(this.state)
      .some(el => el.value.length === 0);

    if (hadUnvalidated) {
      return;
    }

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    const { addMovie } = this.props;

    const movie = {
      title: title.value,
      description: description.value,
      imgUrl: imgUrl.value,
      imdbUrl: imdbUrl.value,
      imdbId: imdbId.value,
    };

    addMovie(movie);
    this.setState(NewMovieDefaultState);
  }

  render() {
    return (
      <form
        onSubmit={event => this.onSubmittedMovie(event)}
        className="p-2 d-flex flex-column justify-content-center"
      >
        {Object.entries(this.state)
          .map(([key, valueItem]) => (
            <NewMovieInput
              key={key}
              name={key}
              valueItem={valueItem}
              handleInput={this.handleInput}
              isValidatedInput={this.isValidatedInput}
            />
          ))
        }
        <button
          type="submit"
          className="btn btn-primary"
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

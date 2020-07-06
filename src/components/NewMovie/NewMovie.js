import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NewMovieInput } from '../NewMovieInput/NewMovieInput';
import { NewMovieDefaultState } from './NewMovieDefaultState';

export class NewMovie extends Component {
  state = {
    movie: NewMovieDefaultState,
    isActiveButton: false,
  }

  handleInput = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      movie: {
        ...prevState.movie,
        [name]: {
          ...prevState.movie[name],
          value,
        },
      },
    }));
  }

  isValidatedInput = (event) => {
    const { name } = event.target;
    const { value, pattern } = this.state.movie[name];
    const isValueValidated = Boolean((value.match(pattern) || []).length);

    const hadUnvalidated = Object.values(this.state.movie)
      .every(el => el.isValid && el.value.length);

    this.setState(prevState => ({
      ...prevState,
      isActiveButton: (hadUnvalidated),
      movie: {
        ...prevState.movie,
        [name]: {
          ...prevState.movie[name],
          isValid: isValueValidated,
        },
      },
    }));
  }

  onSubmittedMovie = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.movie;
    const { addMovie } = this.props;

    const movie = {
      title: title.value,
      description: description.value,
      imgUrl: imgUrl.value,
      imdbUrl: imdbUrl.value,
      imdbId: imdbId.value,
    };

    addMovie(movie);
    this.setState({
      movie: NewMovieDefaultState,
      isActiveButton: false,
    });
  }

  render() {
    const { isActiveButton } = this.state;

    return (
      <form
        onSubmit={event => this.onSubmittedMovie(event)}
        className="p-2 d-flex flex-column justify-content-center"
      >
        {Object.entries(this.state.movie)
          .map(([key, valueItem]) => (
            <NewMovieInput
              key={key}
              name={key}
              valueItem={valueItem}
              handleInput={this.handleInput}
              isValidatedInput={this.isValidatedInput}
              isActiveButton={isActiveButton}
            />
          ))
        }
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isActiveButton}
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

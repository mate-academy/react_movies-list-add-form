import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  validate = {
    title: title => this.titleOrIdValidation('Title', title),
    imgUrl: url => this.urlValidation(url),
    imdbUrl: url => this.urlValidation(url),
    imdbId: id => this.titleOrIdValidation('ID', id),
  };

  initialValues = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  addMovie = (movie) => {
    this.setState(state => ({
      movies: [...state.movies, movie],
    }));
  };

  titleOrIdValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === '') {
      return `${fieldName} is required`;
    }

    if (fieldName === 'Title' && /[^a-zA-Z -]/.test(fieldValue)) {
      return 'Invalid characters';
    }

    if (fieldValue.trim().length < 1) {
      return `${fieldName} needs to be at least one characters`;
    }

    return null;
  };

  urlValidation = (url) => {
    if (
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(
        url,
      )
    ) {
      return null;
    }

    if (url.trim() === '') {
      return 'Url is required';
    }

    return 'Please enter a valid Url';
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <NewMovie
            onAdd={this.addMovie}
            validate={this.validate}
            initialValues={this.initialValues}
          />
        </div>
      </div>
    );
  }
}

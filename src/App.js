/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  addMovie = (event, form) => {
    event.preventDefault();

    const newMovie = {
      title: form.title,
      description: form.description,
      imgUrl: form.imgUrl,
      imdbUrl: form.imdbUrl,
      imdbId: form.imdbId,
    };

    this.setState(state => ({
      movies: [...state.movies, newMovie],
    }));

    for (const key in form) {
      form[key] = '';
    }
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <NewMovie onAdd={this.addMovie} />
        </div>
      </div>
    );
  }
}

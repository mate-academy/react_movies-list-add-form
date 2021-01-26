import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: moviesFromServer,
    input: '',
  };

  addMovie = (movie) => {
    this.setState(prevState => ({
      movies: [...prevState.movies, movie],
    }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <div className="field">
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                name="input"
                className="input"
                placeholder="Type search word"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <MoviesList movies={movies} filter={this.state.input} />
        </div>
        <div className="sidebar">
          <NewMovie onAdd={this.addMovie} />
        </div>
      </div>
    );
  }
}

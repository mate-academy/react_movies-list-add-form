import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  addMovie = (event, title, description, imdbId, getImdbUrl, imgUrl) => {
    event.preventDefault()
    this.setState(prev => ({
      movies: [
        ...prev.movies,
        {
          title,
          description,
          imdbId,
          getImdbUrl,
          imgUrl,
        }
      ]
    }));
  };

  render() {
    const { movies } = this.state;
    console.log("App -> render -> this", this)

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <NewMovie addMovie={this.addMovie}/>
        </div>
      </div>
    );
  }
}

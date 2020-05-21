import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  maxId = 1;

  createTodoItem(title, description, imgUrl, imdbUrl, imdbId) {
    return {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    }
  }

  addMovie = (title, description, imgUrl, imdbUrl, imdbId) => {
    
    const newItem = this.createTodoItem(title, description, imgUrl, imdbUrl, imdbId);

    this.setState(({ movies }) => {
      const newArr = [
        ...movies,
        newItem
      ];

      return {
        movies: newArr
      };
    });

  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList 
          movies={movies} />
        </div>
        <div className="sidebar">
          <NewMovie onItemAdded={this.addMovie}/>
        </div>
      </div>
    );
  }
}

import React from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends React.Component {
  state = {
    movies: moviesFromServer,
  };

  submit = (values) => {
    this.setState(state => ({
      movies: [
        ...state.movies,
        {
          title: values.title,
          description: values.description,
          imgUrl: values.imgUrl,
          imdbUrl: values.imdbUrl,
          imdbId: values.imdbId,
        },
      ],
    }));
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <NewMovie submit={this.submit} />
        </div>
      </div>
    );
  }
}

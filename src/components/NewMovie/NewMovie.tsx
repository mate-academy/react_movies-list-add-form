import React, { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};
type State = {
  movieTitle: string,
  movieDescription: string,
  movieImgUrl: string,
  movieImdbUrl: string,
  movieImdbId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    movieTitle: '',
    movieDescription: '',
    movieImgUrl: '',
    movieImdbUrl: '',
    movieImdbId: '',
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      movieTitle,
      movieDescription,
      movieImgUrl,
      movieImdbUrl,
      movieImdbId,
    } = this.state;

    const movie: Movie = {
      title: movieTitle,
      description: movieDescription,
      imgUrl: movieImgUrl,
      imdbUrl: movieImdbUrl,
      imdbId: movieImdbId,
    };

    this.props.addMovie(movie);
    this.clearState();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prev => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  clearState = () => {
    this.setState({
      movieTitle: '',
      movieDescription: '',
      movieImgUrl: '',
      movieImdbUrl: '',
      movieImdbId: '',
    });
  };

  render() {
    const {
      movieTitle,
      movieDescription,
      movieImgUrl,
      movieImdbUrl,
      movieImdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label className="label" htmlFor="title">
          Title
          <input
            type="text"
            placeholder="New title for movie"
            id="movieTitle"
            value={movieTitle}
            onChange={(event) => {
              this.handleChange(event);
            }}
            className="input is-primary"
          />
        </label>

        <label className="label" htmlFor="description">
          Description
          <input
            type="text"
            placeholder="Add movie description"
            id="movieDescription"
            value={movieDescription}
            onChange={(event) => {
              this.handleChange(event);
            }}
            className="input is-primary"
          />
        </label>

        <label className="label" htmlFor="imgUrl">
          imgUrl
          <input
            type="text"
            placeholder="Add url for movie image"
            id="movieImgUrl"
            value={movieImgUrl}
            onChange={(event) => {
              this.handleChange(event);
            }}
            className="input is-primary"
          />
        </label>

        <label className="label" htmlFor="imdbUrl">
          imdbUrl
          <input
            type="text"
            placeholder="Add url for IMDB"
            id="movieImdbUrl"
            value={movieImdbUrl}
            onChange={(event) => {
              this.handleChange(event);
            }}
            className="input is-primary"
          />
        </label>

        <label className="label" htmlFor="imdbId">
          imdbId
          <input
            type="text"
            placeholder="Add IMDB id"
            id="movieImdbId"
            value={movieImdbId}
            onChange={(event) => {
              this.handleChange(event);
            }}
            className="input is-primary"
          />
        </label>

        <button type="submit" className="button is-success">Submit</button>
      </form>
    );
  }
}

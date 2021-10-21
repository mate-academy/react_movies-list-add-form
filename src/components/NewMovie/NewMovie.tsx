import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  addMovieForm = (name: string, value: string) => {
    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  hangleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const { hangleFormSubmit, addMovieForm } = this;

    return (
      <form
        onSubmit={hangleFormSubmit}
        className="AddMovie"
      >
        <h2 className="AddMovie__title">
          Add Movie Form
        </h2>
        {Object.entries(this.state).map(([key, value]) => (
          <input
            type="text"
            key={key}
            placeholder={key}
            className="AddMovie__input"
            value={value}
            required
            onChange={event => addMovieForm(key, event.target.value)}
          />
        ))}
        <button
          type="submit"
          className="AddMovie__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}

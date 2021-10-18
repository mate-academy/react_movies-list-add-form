import React from 'react';
import { InputElement } from '../InputElement/InputElement';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  movie: Movie
};

const inputItems = ['title', 'description', 'imgUrl', 'imdbUrl', 'imdbId'];

const movieBody = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends React.PureComponent<Props, State> {
  state: State = {
    movie: movieBody,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((currentState) => {
      const { movie } = currentState;

      return {
        movie: {
          ...movie,
          [name as string]: value,
        },
      };
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.addMovie(this.state.movie);
    this.setState({
      movie: movieBody,
    });
  };

  render() {
    return (
      <>
        <h1>Add a new movie</h1>
        <form method="Get" onSubmit={this.handleSubmit}>
          <InputElement
            inputItems={inputItems}
            handleChange={this.handleChange}
            movie={this.state.movie}
          />
          <button type="submit">
            Add film
          </button>
        </form>
      </>
    );
  }
}

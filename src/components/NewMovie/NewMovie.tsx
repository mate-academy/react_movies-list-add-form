import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

type State = {
  newMovie: Movie;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onAdd(this.state.newMovie);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  render() {
    return (
      <form className="addMovieForm" onSubmit={this.handleSubmit}>
        <input
          className="addMovieForm__input"
          required
          type="text"
          placeholder="Enter title"
          name="title"
          value={this.state.newMovie.title}
          onChange={this.handleChange}
        />

        <input
          className="addMovieForm__input"
          required
          type="text"
          placeholder="Enter description"
          name="description"
          value={this.state.newMovie.description}
          onChange={this.handleChange}
        />
        <input
          className="addMovieForm__input"
          required
          type="text"
          placeholder="Enter imgUrl"
          name="imgUrl"
          value={this.state.newMovie.imgUrl}
          onChange={this.handleChange}
        />
        <input
          className="addMovieForm__input"
          required
          type="text"
          placeholder="Enter imdbUrl"
          name="imdbUrl"
          value={this.state.newMovie.imdbUrl}
          onChange={this.handleChange}
        />
        <input
          className="addMovieForm__input"
          required
          type="text"
          placeholder="Enter imdbId"
          name="imdbId"
          value={this.state.newMovie.imdbId}
          onChange={this.handleChange}
        />

        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

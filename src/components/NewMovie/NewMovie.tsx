import { Component } from 'react';
import './NewMovie.scss';

type Inputs = HTMLInputElement | HTMLTextAreaElement;

type Props = {
  addMovie: (movie: Movie) => void;
};
type State = Movie;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<Inputs>) => {
    const { value, name } = event.target;

    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  resetState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  newMovie = () => {
    const newMovie = { ...this.state };

    this.resetState();

    return newMovie;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.addMovie(this.newMovie());
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="movie__title" className="form__label">
          Title
          <input
            className="form__input"
            type="text"
            name="title"
            id="movie__title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
        </label>

        <label htmlFor="movie__description" className="form__label">
          Description
          <textarea
            className="form__input"
            name="description"
            id="movie__description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
        </label>

        <label htmlFor="movie__imgUrl" className="form__label">
          image URL
          <input
            className="form__input"
            type="text"
            name="imgUrl"
            id="movie__imgUrl"
            value={this.state.imgUrl}
            onChange={this.handleChange}
            required
          />
        </label>

        <label htmlFor="movie__imdbUrl" className="form__label">
          imdb URL
          <input
            className="form__input"
            type="text"
            name="imdbUrl"
            id="movie__imdbUrl"
            value={this.state.imdbUrl}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="movie__imdbId" className="form__label">
          imdb ID
          <input
            className="form__input"
            type="text"
            name="imdbId"
            id="movie__imdbId"
            value={this.state.imdbId}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit" className="form__button">
          Add Movie
        </button>
      </form>
    );
  }
}

import { Component } from 'react';
import './NewMovie.scss';

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

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    this.setState(state => (
      {
        ...state,
        [name]: value,
      }
    ));
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
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.resetState();

    return {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.props.addMovie(this.newMovie());
        }}
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

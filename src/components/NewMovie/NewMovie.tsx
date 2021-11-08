import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  movie: Movie,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    movie: {
      title: '',
      description: '',
      imgUrl: 'https://imgUrl',
      imdbUrl: 'https://imdbUrl',
      imdbId: '',
    },
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
    }));
  };

  render() {
    const {
      title, description,
      imgUrl, imdbUrl,
      imdbId,
    } = this.state.movie;

    const initialState = {
      title: 'title',
      description: 'description',
      imgUrl: 'https://imgUrl',
      imdbUrl: 'https://imdbUrl',
      imdbId: 'imdbId',
    };

    return (
      <>
        <form
          className="new-movie-form"
          onSubmit={(event) => {
            event.preventDefault();
            this.props.addMovie(this.state.movie);
            this.setState({ movie: initialState });
          }}
        >
          <p
            className="new-movie-form__title"
          >
            To add new movie, fill in data below:
          </p>

          <input
            required
            className="new-movie-form__input"
            type="text"
            placeholder="title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <input
            required
            className="new-movie-form__input"
            type="text"
            placeholder="imgUrl"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
          <input
            required
            className="new-movie-form__input"
            type="text"
            placeholder="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
          <input
            required
            className="new-movie-form__input"
            type="text"
            placeholder="imdbId"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
          <textarea
            className="new-movie-form__input"
            placeholder="description (max length 150 chars)"
            name="description"
            maxLength={150}
            value={description}
            onChange={this.handleChange}
          />

          <button type="submit">Add a movie</button>

        </form>

        <pre>{JSON.stringify(this.state.movie, null, 2)}</pre>
      </>
    );
  }
}

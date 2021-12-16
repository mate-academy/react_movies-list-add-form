import { Component } from 'react';
import './NewMovie.scss';

import { Movie } from '../../interfaces/Movie';

type Props = {
  addMovie: (movie: Movie) => void;
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

  movieCreate = () => {
    this.props.addMovie(this.state.newMovie);
    this.clearState();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  clearState = () => {
    this.setState({
      newMovie: {
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        title: '',
      },
    });
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.movieCreate();
        }}
      >
        <label htmlFor="title" className="form__label">
          Title:
          {' '}
          <input
            className="form__field"
            type="text"
            name="title"
            id="title"
            value={this.state.newMovie.title}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="description" className="form__label">
          Description:
          {' '}
          <input
            className="form__field"
            type="text"
            name="description"
            id="description"
            value={this.state.newMovie.description}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imgUrl" className="form__label">
          imgUrl:
          {' '}
          <input
            className="form__field"
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={this.state.newMovie.imgUrl}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imdbUrl" className="form__label">
          imdbUrl:
          {' '}
          <input
            className="form__field"
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            value={this.state.newMovie.imdbUrl}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imdbId" className="form__label">
          imdbId:
          {' '}
          <input
            className="form__field"
            type="text"
            name="imdbId"
            id="imdbId"
            value={this.state.newMovie.imdbId}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit">Add movie</button>
      </form>
    );
  }
}

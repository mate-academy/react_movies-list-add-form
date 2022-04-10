import { ChangeEvent, FormEvent, PureComponent } from 'react';
import { Movie } from '../../types/types';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = Movie;

export class NewMovie extends PureComponent<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const addedMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.resetForm();
    this.props.onAdd(addedMovie);
  };

  render() {
    return (
      <form className="addMovieForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Enter title"
          required
        />
        <input
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="Enter description"
          required
        />
        <input
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          placeholder="Enter imgUrl"
          required
        />
        <input
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          placeholder="Enter imdbUrl"
          required
        />
        <input
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
          placeholder="Enter imdbId"
          required
        />
        <button type="submit">
          Add Movie
        </button>
      </form>
    );
  }
}

import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
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

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        Post new movie

        <input
          type="text"
          placeholder="title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          required
        />

        <input
          type="text"
          placeholder="description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          required
        />

        <input
          type="text"
          placeholder="imgUrl"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          required
        />

        <input
          type="text"
          placeholder="imdbUrl"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          required
        />

        <input
          type="text"
          placeholder="imdbId"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
          required
        />

        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

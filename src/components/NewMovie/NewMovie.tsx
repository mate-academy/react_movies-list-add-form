import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
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

  render() {
    const activButton = !!this.state.title
    && !!this.state.imgUrl
    && !!this.state.imdbUrl
    && !!this.state.imdbId;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="form__fields"
      >

        <input
          type="text"
          name="title"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          required
        />

        <input
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          required
        />

        <input
          type="text"
          name="imdbId"
          placeholder="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
          required
        />

        <button
          type="submit"
          disabled={!activButton}
        >
          Add
        </button>
      </form>
    );
  }
}

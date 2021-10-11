import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
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

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = { ...this.state };

    this.props.onAdd(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="app__input"
          name="title"
          type="text"
          value={this.state.title}
          onChange={(event) => {
            this.setState({ title: event.target.value });
          }}
          placeholder="add title"
        />
        <input
          className="app__input"
          name="description"
          type="text"
          value={this.state.description}
          onChange={(event) => {
            this.setState({ description: event.target.value });
          }}
          placeholder="add description"
        />
        <input
          className="app__input"
          name="imgUrl"
          type="text"
          value={this.state.imgUrl}
          onChange={(event) => {
            this.setState({ imgUrl: event.target.value });
          }}
          placeholder="add imgUrl"
        />
        <input
          className="app__input"
          name="imdbUrl"
          type="text"
          value={this.state.imdbUrl}
          onChange={(event) => {
            this.setState({ imdbUrl: event.target.value });
          }}
          placeholder="add imdbUrl"
        />
        <input
          className="app__input"
          name="imdbId"
          type="text"
          value={this.state.imdbId}
          onChange={(event) => {
            this.setState({ imdbId: event.target.value });
          }}
          placeholder="add imdbId"
        />
        <button
          className="app__button"
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}

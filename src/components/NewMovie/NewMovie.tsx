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

  handleChange = (event: {
    target: {
      name: string;
      value: string;
    };
  }): void => {
    const {
      name,
      value,
    } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value.trim(),
    }));
  };

  handleSubmit = (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

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
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        className="newMovie"
        onSubmit={this.handleSubmit}
      >
        <h1
          className="newMovie__heading"
        >
          Add a new movie
        </h1>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter a movie title"
          maxLength={30}
          onChange={this.handleChange}
          className="newMovie__detail"
          required
        />
        <input
          type="text"
          name="description"
          value={description}
          placeholder="Enter a movie description"
          maxLength={250}
          onChange={this.handleChange}
          className="newMovie__detail"
          required
        />
        <input
          type="url"
          name="imgUrl"
          value={imgUrl}
          placeholder="Enter a movie imgUrl"
          onChange={this.handleChange}
          className="newMovie__detail"
          required
        />
        <input
          type="url"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Enter a movie imdbUrl"
          onChange={this.handleChange}
          className="newMovie__detail"
          required
        />
        <input
          type="text"
          name="imdbId"
          value={imdbId}
          placeholder="Enter a movie imdbId"
          maxLength={9}
          onChange={this.handleChange}
          className="newMovie__detail"
          required
        />
        <button
          type="submit"
          className="newMovie__button"
        >
          Add
        </button>
      </form>
    );
  }
}

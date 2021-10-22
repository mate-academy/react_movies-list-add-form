import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void
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

  handleChange = (value: string, key: string) => {
    this.setState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  addMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    const { onAdd } = this.props;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

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
        className="new-movie"
        onSubmit={this.addMovie}
      >
        <label
          htmlFor="title"
          className="new-movie__label"
        >
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => (
              this.handleChange(event.currentTarget.value, 'title')
            )}
            required
          />
        </label>
        <label
          htmlFor="description"
          className="new-movie__label"
        >
          Description
          <input
            type="text"
            name="description"
            value={description}
            onChange={(event) => (
              this.handleChange(event.currentTarget.value, 'description')
            )}
          />
        </label>
        <label
          htmlFor="imgUrl"
          className="new-movie__label"
        >
          imgUrl
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={(event) => (
              this.handleChange(event.currentTarget.value, 'imgUrl')
            )}
            required
          />
        </label>
        <label
          htmlFor="imdbUrl"
          className="new-movie__label"
        >
          imdbUrl
          <input
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={(event) => (
              this.handleChange(event.currentTarget.value, 'imdbUrl')
            )}
            required
          />
        </label>
        <label
          htmlFor="imdbId"
          className="new-movie__label"
        >
          imdbId
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={(event) => (
              this.handleChange(event.currentTarget.value, 'imdbId')
            )}
            required
          />
        </label>
        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

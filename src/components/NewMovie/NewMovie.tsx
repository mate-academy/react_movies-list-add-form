import { Component } from 'react';
import './NewMovie.scss';

import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
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

  formHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    this.props.onAdd(newMovie);
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
        className="NewMovieForm"
        onSubmit={this.formHandler}
      >
        <input
          name="title"
          type="text"
          value={title}
          placeholder="please enter title"
          className="NewMovieForm__item"
          required
          onChange={(event) => {
            this.setState({ title: event.currentTarget.value });
          }}
        />
        <input
          name="description"
          type="text"
          value={description}
          placeholder="please enter description"
          className="NewMovieForm__item"
          required
          onChange={(event) => {
            this.setState({ description: event.currentTarget.value });
          }}
        />
        <input
          name="imgUrl"
          type="text"
          value={imgUrl}
          placeholder="please enter imgUrl"
          className="NewMovieForm__item"
          required
          onChange={(event) => {
            this.setState({ imgUrl: event.currentTarget.value });
          }}
        />
        <input
          name="imdbUrl"
          type="text"
          value={imdbUrl}
          placeholder="please enter imdbUrl"
          className="NewMovieForm__item"
          required
          onChange={(event) => {
            this.setState({ imdbUrl: event.currentTarget.value });
          }}
        />
        <input
          type="text"
          name="imdbId"
          value={imdbId}
          placeholder="please enter imdbId"
          className="NewMovieForm__item"
          required
          onChange={(event) => {
            this.setState({ imdbId: event.currentTarget.value });
          }}
        />
        <button
          type="submit"
          className="NewMovieForm__item"
        >
          Add
        </button>
      </form>
    );
  }
}

import React, { Component } from 'react';
import 'bootstrap/scss/bootstrap.scss';

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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const key: keyof State = name as keyof State;

    this.setState({
      [key]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent) => {
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

    if (title !== '') {
      onAdd(newMovie);
    }
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
        className="mb-3"
        onSubmit={this.handleSubmit}
      >
        <label
          className="form-label"
          htmlFor="movie__title"
        >
          Title
          <input
            className="form-control"
            type="text"
            id="movie__title"
            name="title"
            placeholder="Movie title"
            value={title}
            onChange={this.handleChange}
          />
        </label>

        <label
          className="form-label"
          htmlFor="movie__description"
        >
          Description
          <input
            className="form-control"
            type="text"
            id="movie__description"
            name="description"
            placeholder="Movie description"
            value={description}
            onChange={this.handleChange}
          />
        </label>

        <label
          className="form-label"
          htmlFor="movie__imgUrl"
        >
          Add imgUrl
          <input
            className="form-control"
            type="text"
            id="movie__imgUrl"
            name="imgUrl"
            placeholder="Movie imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
        </label>

        <label
          className="form-label"
          htmlFor="movie__imdbUrl"
        >
          Add imdbUrl
          <input
            className="form-control"
            type="text"
            id="movie__imdbUrl"
            name="imdbUrl"
            placeholder="Movie imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </label>

        <label
          className="form-label "
          htmlFor="movie__imdbId"
        >
          Add imdbId
          <input
            className="form-control"
            type="text"
            id="movie__imdbId"
            name="imdbId"
            placeholder="Movie imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
        </label>

        <button
          className="d-block btn btn-primary"
          type="submit"
        >
          Add Movie
        </button>
      </form>
    );
  }
}

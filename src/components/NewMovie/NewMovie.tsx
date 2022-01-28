import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

interface State {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

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

    this.setState({
      [name]: value,
    } as { [K in keyof State]: State[K] });
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

    const newMovie: Movie = {
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

  validate = () => {
    return !this.state.title || !this.state.description
    || !this.state.imgUrl || !this.state.imdbId || !this.state.imdbUrl;
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
        onSubmit={this.handleSubmit}
        className="NewMovie"
        action=""
      >
        <label htmlFor="title">
          <input
            onChange={this.handleChange}
            value={title}
            type="text"
            name="title"
            className="NewMovie__input"
            id="title"
            placeholder="title"
            required
          />
        </label>

        <label htmlFor="description">
          <input
            onChange={this.handleChange}
            value={description}
            type="text"
            name="description"
            className="NewMovie__input"
            id="description"
            placeholder="description"
            required
          />
        </label>

        <label htmlFor="imgUrl">
          <input
            onChange={this.handleChange}
            value={imgUrl}
            type="text"
            name="imgUrl"
            className="NewMovie__input"
            id="imgUrl"
            placeholder="imgUrl"
            required
          />
        </label>

        <label htmlFor="imdbUrl">
          <input
            onChange={this.handleChange}
            value={imdbUrl}
            type="text"
            name="imdbUrl"
            className="NewMovie__input"
            id="imdbUrl"
            placeholder="imdbUrl"
            required
          />
        </label>

        <label htmlFor="imdbId">
          <input
            onChange={this.handleChange}
            value={imdbId}
            type="text"
            name="imdbId"
            className="NewMovie__input"
            id="imdbId"
            placeholder="imdbId"
            required
          />
        </label>

        <button
          type="submit"
          name="add"
          className="NewMovie__button"
          disabled={this.validate()}
        >
          Add
        </button>
      </form>
    );
  }
}

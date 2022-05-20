import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void;
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

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onAdd(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
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
        className="movie__form"
        onSubmit={this.handleSubmit}
      >
        <h2
          className="movie__formTitle"
        >
          Add a new movie
        </h2>
        <input
          className="movie__input"
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={this.changeHandler}
          required
        />
        <input
          className="movie__input"
          name="description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={this.changeHandler}
        />
        <input
          className="movie__input"
          name="imgUrl"
          type="text"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.changeHandler}
          required
        />
        <input
          className="movie__input"
          name="imdbUrl"
          type="text"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.changeHandler}
          required
        />
        <input
          className="movie__input"
          name="imdbId"
          type="text"
          placeholder="imdbId"
          value={imdbId}
          onChange={this.changeHandler}
          required
        />
        <button
          type="submit"
          className="movie__button"
        >
          Add a movie
        </button>
      </form>
    );
  }
}

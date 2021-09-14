import React, { Component } from 'react';

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

  newMovie = () => {
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

    return newMovie;
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const key: keyof State = name as keyof State;

    this.setState((currentState) => ({
      ...currentState,
      [key]: value,
    }));
  };

  setClearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMovie = this.newMovie();

    this.props.addMovie(newMovie);
    this.setClearState();
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
      <>
        <h1>Add New Movie</h1>
        <form
          className="form"
          onSubmit={this.onSubmit}
        >
          <input
            className="input"
            type="text"
            name="title"
            placeholder="add Title"
            value={title}
            onChange={this.handleChange}
          />
          <input
            className="input"
            type="text"
            name="description"
            placeholder="add Description"
            value={description}
            onChange={this.handleChange}
          />
          <input
            className="input"
            type="text"
            name="imgUrl"
            placeholder="add ImgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
          <input
            className="input"
            type="text"
            name="imdbUrl"
            placeholder="add ImdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
          <input
            className="input"
            type="text"
            name="imdbId"
            placeholder="add ImdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
          <button
            className="button"
            type="submit"
          >
            Add New Film
          </button>
        </form>
      </>
    );
  }
}

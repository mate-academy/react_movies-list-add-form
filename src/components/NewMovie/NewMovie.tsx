import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addNewMovie: (newMovie: Movie) => void,
};

type State = {
  newMovie: Movie,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value.trimLeft(),
      },
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.addNewMovie(this.state.newMovie);
  };

  render() {
    const {
      title, description, imdbUrl, imgUrl, imdbId,
    } = this.state.newMovie;

    return (
      <div>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <input
            className="form__input"
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={this.changeHandler}
            required
          />

          <input
            className="form__input"
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={this.changeHandler}
          />

          <input
            className="form__input"
            type="text"
            name="imdbUrl"
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={this.changeHandler}
            required
          />

          <input
            className="form__input"
            type="text"
            name="imgUrl"
            placeholder="imgUrl"
            value={imgUrl}
            onChange={this.changeHandler}
            required
          />

          <input
            className="form__input"
            type="text"
            name="imdbId"
            placeholder="imdbId"
            value={imdbId}
            onChange={this.changeHandler}
            required
          />

          <button type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

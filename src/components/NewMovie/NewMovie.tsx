import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as Pick<State, keyof State>);
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

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

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form className="form" onSubmit={this.handleFormSubmit}>
        <h1 className="form__title">Add new film</h1>
        <input
          type="text"
          name="title"
          className="form__input"
          placeholder="Enter title of film"
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          className="form__input"
          placeholder="Enter description of film"
          value={description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          className="form__input"
          placeholder="Enter image's URL of film"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          className="form__input"
          placeholder="Enter IMDb's url"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbId"
          className="form__input"
          placeholder="Enter IMDb's id"
          value={imdbId}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="form__button"
        >
          Add new film
        </button>
      </form>
    );
  }
}

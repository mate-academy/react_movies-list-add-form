import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  title?: string,
  description?: string,
  imgUrl?: string,
  imdbUrl?: string,
  imdbId?: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  changeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  getNewMovie = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return ({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMovie = this.getNewMovie();

    this.props.addMovie(newMovie);
    this.clearForm();
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
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          name="title"
          className="form__input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={this.changeInfo}
        />
        <input
          name="description"
          className="form__input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={this.changeInfo}
        />
        <input
          name="imgUrl"
          className="form__input"
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={this.changeInfo}
        />
        <input
          name="imdbUrl"
          className="form__input"
          type="text"
          placeholder="IMDB URL"
          value={imdbUrl}
          onChange={this.changeInfo}
        />
        <input
          name="imdbId"
          className="form__input"
          type="text"
          placeholder="IMDB id"
          value={imdbId}
          onChange={this.changeInfo}
        />
        <button className="form__button" type="submit">Add</button>
      </form>
    );
  }
}

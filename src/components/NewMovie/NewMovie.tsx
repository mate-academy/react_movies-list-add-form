import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  getNewFilm = (): Movie => {
    const {
      title,
      description,
      imgUrl,
      imdbId,
    } = this.state;

    return ({
      title,
      description,
      imgUrl,
      imdbUrl: `https://www.imdb.com/title/${imdbId}`,
      imdbId,
    });
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbId: '',
    });
  };

  onAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFilm = this.getNewFilm();

    this.props.addMovie(newFilm);
    this.clearState();
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbId,
    } = this.state;

    return (

      <>
        <h1 className="title">Add film</h1>

        <form onSubmit={this.onAdd}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            className="input"
            onChange={this.handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={description}
            className="textarea"
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="imgUrl"
            placeholder="Image Url"
            value={imgUrl}
            className="input"
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="imdbId"
            placeholder="IMDB Id"
            value={imdbId}
            className="input"
            onChange={this.handleChange}
            required
          />

          <button
            type="submit"
            className="button is-warning"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

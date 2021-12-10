import { Component } from 'react';

import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

export class NewMovie extends Component<Props, Movie> {
  state: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  hundleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      imdbUrl,
      imgUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);

    this.resetForm();
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
        <h1 className="title">Add new Movie:</h1>
        <form onSubmit={this.hundleSubmit} className="form">
          <div className="field">
            <label htmlFor="title">
              <span> Title</span>
              <input
                className="input"
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={this.hundleChange}
              />
            </label>
          </div>

          <div className="field">
            <label htmlFor="description">
              Description
              <input
                className="input"
                id="description"
                type="text"
                name="description"
                value={description}
                onChange={this.hundleChange}
              />
            </label>
          </div>

          <div className="field">
            <label htmlFor="imgUrl">
              ImgUrl
              <input
                className="input"
                id="imgUrl"
                type="text"
                name="imgUrl"
                value={imgUrl}
                onChange={this.hundleChange}
              />
            </label>
          </div>

          <div className="field">
            <label htmlFor="imdbUrl">
              ImdbUrl
              <input
                className="input"
                id="imdbUrl"
                type="text"
                name="imdbUrl"
                value={imdbUrl}
                onChange={this.hundleChange}
              />
            </label>
          </div>

          <div className="field">
            <label htmlFor="imdbId">
              ImdbId
              <input
                className="input"
                id="imdbId"
                type="text"
                name="imdbId"
                value={imdbId}
                onChange={this.hundleChange}
              />
            </label>
          </div>

          <div className="button-block">
            <button
              type="submit"
              className="button"
            >
              Add movie
            </button>
          </div>
        </form>
      </>
    );
  }
}

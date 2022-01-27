import React, { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void,
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
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  createNewMovie = () => ({
    ...this.state,
  });

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = this.createNewMovie();

    this.props.addMovie(newMovie);

    this.clearState();
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
        <h3 className="title is-3">Add movie info</h3>

        <form
          onSubmit={this.onSubmit}
          className="control"
        >
          <input
            type="text"
            name="title"
            value={title}
            className="input"
            onChange={this.handleChange}
            placeholder="Title"
            required
          />
          <br />
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            className="input"
            onChange={this.handleChange}
            placeholder="imgUrl"
            required
          />
          <br />
          <input
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            className="input"
            onChange={this.handleChange}
            placeholder="imdbUrl"
            required
          />
          <br />
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            className="input"
            onChange={this.handleChange}
            placeholder="imdbId"
            required
          />
          <br />
          <input
            type="text"
            name="description"
            value={description}
            className="input"
            onChange={this.handleChange}
            placeholder="Description"
          />
          <br />
          <button
            type="submit"
            className="button is-warning is-light"
          >
            Add film
          </button>
        </form>
      </>
    );
  }
}

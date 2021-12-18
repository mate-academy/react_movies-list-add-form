import React, { Component } from 'react';
import './NewMovie.scss';

const movie = {
  title: '',
  description: '',
  imdbId: '',
  imdbUrl: '',
  imgUrl: '',
};

type Props = {
  onAdd: (newMovie: Movie) => void;
};

type State = {
  newMovie: Movie;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovie: movie,
  };

  handleCange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onAdd(this.state.newMovie);
    this.setState({ newMovie: movie });
  };

  render() {
    const {
      imdbId, imdbUrl, imgUrl, title, description,
    } = this.state.newMovie;

    return (
      <>
        <h2 className="Title">Add New Movie</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            className="Input"
            type="text"
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={this.handleCange}
          />
          <input
            className="Input"
            type="text"
            name="description"
            placeholder="Enter description"
            value={description}
            onChange={this.handleCange}
          />
          <input
            className="Input"
            type="text"
            name="imdbId"
            placeholder="Enter imdbId"
            value={imdbId}
            onChange={this.handleCange}
          />
          <input
            className="Input"
            type="text"
            name="imdbUrl"
            placeholder="Enter imdbUrl"
            value={imdbUrl}
            onChange={this.handleCange}
          />
          <input
            type="text"
            className="Input"
            name="imgUrl"
            placeholder="Enter imgUrl"
            value={imgUrl}
            onChange={this.handleCange}
          />
          <button
            type="submit"
            className="Button"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

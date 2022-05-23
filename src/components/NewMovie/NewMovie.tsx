import React, { Component } from 'react';
import './NewMovie.scss';

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

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.addMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    return (
      <form
        className="sidebar__form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter a title"
          value={this.state.title}
          onChange={this.onChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Enter a description"
          value={this.state.description}
          onChange={this.onChange}
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="Enter a imgUrl"
          value={this.state.imgUrl}
          onChange={this.onChange}
          required
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="Enter a imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.onChange}
          required
        />
        <input
          type="text"
          name="imdbId"
          placeholder="Enter a imdbId"
          value={this.state.imdbId}
          onChange={this.onChange}
          required
        />
        <button type="submit">
          Add Film
        </button>
      </form>
    );
  }
}

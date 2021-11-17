import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};
type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleMovieTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imgUrl: event.target.value,
    });
  };

  handleImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbUrl: event.target.value,
    });
  };

  handleImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbId: event.target.value,
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
    this.props.addMovie({
      ...this.state,
    });
    this.clearForm();
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="form__input"
          type="text"
          value={this.state.title}
          onChange={this.handleMovieTitle}
          placeholder="Enter the movie title"
        />
        <input
          className="form__input"
          type="text"
          value={this.state.description}
          onChange={this.handleDescription}
          placeholder="Movie Description"
        />
        <input
          className="form__input"
          type="text"
          value={this.state.imgUrl}
          onChange={this.handleImgUrl}
          placeholder="imgUrl"
        />
        <input
          className="form__input"
          type="text"
          value={this.state.imdbUrl}
          onChange={this.handleImdbUrl}
          placeholder="imdbUrl"
        />
        <input
          className="form__input"
          type="text"
          value={this.state.imdbId}
          onChange={this.handleImdbId}
          placeholder="imdbId"
        />
        <button type="submit" className="form__submit">
          Add New Movie
        </button>
      </form>
    );
  }
}

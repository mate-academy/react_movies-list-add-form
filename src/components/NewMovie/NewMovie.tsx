import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

type State = {
  newMovie: Movie;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imdbUrl: '',
      imgUrl: '',
      imdbId: '',
    },
  };

  clearForm = () => {
    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onAdd(this.state.newMovie);
    this.clearForm();
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  render() {
    return (
      <form className="addMovieForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="addMovieForm__input"
          name="title"
          value={this.state.newMovie.title}
          required
          placeholder="Enter movie title"
          onChange={this.handleChange}
        />

        <textarea
          className="addMovieForm__input"
          name="description"
          value={this.state.newMovie.description}
          placeholder="Add description"
          cols={30}
          rows={10}
          onChange={this.handleChange}
        />

        <input
          type="text"
          className="addMovieForm__input"
          name="imgUrl"
          value={this.state.newMovie.imgUrl}
          required
          placeholder="Enter URL for image"
          onChange={this.handleChange}
        />

        <input
          type="text"
          className="addMovieForm__input"
          name="imdbUrl"
          value={this.state.newMovie.imdbUrl}
          required
          placeholder="Add IMDB URL"
          onChange={this.handleChange}
        />

        <input
          type="text"
          className="addMovieForm__input"
          name="imdbId"
          value={this.state.newMovie.imdbId}
          required
          placeholder="Enter IMDB rate"
          onChange={this.handleChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addNew: (newMovie: Movie) => void;
};

type State = {
  newMovie: Movie;
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.addNew(this.state.newMovie);
    this.clearForm();
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

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    return (
      <form onSubmit={this.handleSubmit} className="NewMovie">
        Movie title
        <input
          type="text"
          name="title"
          placeholder="Add title"
          onChange={this.handleChange}
          value={title}
          className="NewMovie__input"
        />
        Movie description
        <textarea
          name="description"
          placeholder="Add description"
          onChange={this.handleChange}
          value={description}
          className="NewMovie__input NewMovie__textarea"
        />
        Movie imgUrl
        <input
          type="text"
          name="imgUrl"
          placeholder="Add imgUrl"
          onChange={this.handleChange}
          value={imgUrl}
          className="NewMovie__input"
        />
        Movie imdbUrl
        <input
          type="text"
          name="imdbUrl"
          placeholder="Add imdbUrl"
          onChange={this.handleChange}
          value={imdbUrl}
          className="NewMovie__input"
        />
        Movie imdbId
        <input
          type="text"
          name="imdbId"
          placeholder="Add imdbId"
          onChange={this.handleChange}
          value={imdbId}
          className="NewMovie__input"
        />
        <button type="submit" className="NewMovie__button">
          Add new movie
        </button>
      </form>
    );
  }
}

import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (NewMovie: Movie) => void;
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
    this.setState(prevState => ({
      newMovie: {
        ...prevState.newMovie,
        [event.target.name]: event.target.value,
      },
    }));
  };

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state.newMovie;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2 className="form__title">Add a new film</h2>

        <input
          type="text"
          className="form__input"
          name="title"
          value={title}
          placeholder="Enter new movie title"
          required
          onChange={this.handleChange}
        />

        <textarea
          className="form__input"
          name="description"
          value={description}
          placeholder="Add film description"
          required
          rows={10}
          onChange={this.handleChange}
        />

        <input
          type="text"
          className="form__input"
          name="imgUrl"
          value={imgUrl}
          placeholder="Add link to poster image"
          required
          onChange={this.handleChange}
        />

        <input
          type="text"
          className="form__input"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Add link to IMDB"
          required
          onChange={this.handleChange}
        />

        <input
          type="text"
          className="form__input"
          name="imdbId"
          value={imdbId}
          placeholder="Enter IMDB rate"
          required
          onChange={this.handleChange}
        />

        <button type="submit" className="form__button">
          Add
        </button>
      </form>
    );
  }
}

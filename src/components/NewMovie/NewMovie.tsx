import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

type EventType = React.ChangeEvent<HTMLInputElement>
| React.ChangeEvent<HTMLTextAreaElement>;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleSubmit = () => {
    this.props.addMovie(this.state);
    this.clearStates();
  };

  handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  handleChange = (event: EventType) => {
    const { name, value } = event.target;

    this.setState((state) => (
      {
        ...state,
        [name]: value,
      }
    ));
  };

  clearStates() {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmitForm}>

        Add new movie to list
        <div className="container">
          <input
            className="movie"
            type="text"
            name="title"
            value={title}
            placeholder="Movie Title"
            onChange={this.handleChange}
          />
          <textarea
            className="movie movie__description"
            name="description"
            value={description}
            placeholder="Description"
            onChange={this.handleChange}
          />
          <input
            className="movie"
            type="text"
            name="imgUrl"
            value={imgUrl}
            placeholder="imgUrl"
            onChange={this.handleChange}
          />
          <input
            className="movie"
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            placeholder="imdbUrl"
            onChange={this.handleChange}
          />
          <input
            className="movie"
            type="text"
            name="imdbId"
            value={imdbId}
            placeholder="imdbId"
            onChange={this.handleChange}
          />
          <button
            type="button"
            className="submit-button"
            onClick={this.handleSubmit}
          >
            Add movie
          </button>
        </div>
      </form>
    );
  }
}

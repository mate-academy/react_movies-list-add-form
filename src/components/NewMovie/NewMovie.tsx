import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
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

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    this.setState((state: State) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.onAdd(newMovie);
    this.clearForm();
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
      <form
        className="form"
        onSubmit={this.handleSubmitForm}
      >
        <input
          required
          className="form__input"
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={this.handleInput}
        />

        <textarea
          className="form__textarea"
          name="description"
          placeholder="description"
          value={description}
          onChange={this.handleInput}
        />

        <input
          required
          className="form__input"
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.handleInput}
        />

        <input
          required
          className="form__input"
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleInput}
        />

        <input
          required
          className="form__input"
          type="text"
          name="imdbId"
          placeholder="imdbId"
          value={imdbId}
          onChange={this.handleInput}
        />

        <button
          className="btn"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

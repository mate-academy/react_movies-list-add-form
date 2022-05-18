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
    return (
      <form
        className="form"
        onSubmit={this.handleSubmitForm}
      >
        <input
          className="form__input"
          type="text"
          name="title"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleInput}
        />

        <textarea
          className="form__textarea"
          name="description"
          placeholder="description"
          value={this.state.description}
          onChange={this.handleInput}
        />

        <input
          className="form__input"
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleInput}
        />

        <input
          className="form__input"
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleInput}
        />

        <input
          className="form__input"
          type="text"
          name="imdbId"
          placeholder="imdbId"
          value={this.state.imdbId}
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

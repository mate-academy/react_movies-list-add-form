import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
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

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  reset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    const { onAdd } = this.props;

    event.preventDefault();

    const newMovie = { ...this.state };

    onAdd(newMovie);
    this.reset();
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
        onSubmit={this.handleSubmit}
        className="NewMovie"
      >
        <input
          type="text"
          name="title"
          className="NewMovie__title forms"
          placeholder="write title"
          value={title}
          onChange={this.handleInput}
          required
        />
        <input
          type="text"
          name="description"
          className="NewMovie__description"
          placeholder="write description"
          value={description}
          onChange={this.handleInput}
          required
        />
        <input
          type="text"
          name="imgUrl"
          className="NewMovie__imgUrl forms"
          placeholder="write imgUrl"
          value={imgUrl}
          onChange={this.handleInput}
          required
        />
        <input
          type="text"
          name="imdbUrl"
          className="NewMovie__imdbUrl forms"
          placeholder="write imdbUrl"
          value={imdbUrl}
          onChange={this.handleInput}
          required
        />
        <input
          type="text"
          name="imdbId"
          className="NewMovie__imdbId forms"
          placeholder="write imdbId"
          value={imdbId}
          onChange={this.handleInput}
          required
        />
        <button
          type="submit"
          className="NewMovie__button"
        >
          Add
        </button>
      </form>
    );
  }
}

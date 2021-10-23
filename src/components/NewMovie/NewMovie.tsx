import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type NewMovieState = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends Component<Props, NewMovieState> {
  state: NewMovieState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onAdd({ ...this.state });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value,
    } as Pick<NewMovieState, keyof NewMovieState>));
  };

  render() {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          className="field"
          name="title"
          value={title}
          placeholder="Please enter title"
          onChange={this.handleChange}
        />

        <input
          type="text"
          className="field"
          name="description"
          value={description}
          placeholder="Please enter description"
          onChange={this.handleChange}
        />

        <input
          type="text"
          className="field"
          name="imgUrl"
          value={imgUrl}
          placeholder="Please enter imgUrl"
          onChange={this.handleChange}
        />

        <input
          type="text"
          className="field"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Please enter imdbUrl"
          onChange={this.handleChange}
        />

        <input
          type="text"
          className="field"
          name="imdbId"
          value={imdbId}
          placeholder="Please enter imdbId"
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="field"
        >
          Add
        </button>
      </form>
    );
  }
}

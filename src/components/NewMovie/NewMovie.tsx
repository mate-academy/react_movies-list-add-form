import React, { Component } from 'react';

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

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const {
      title, description, imgUrl, imdbId, imdbUrl,
    } = this.state;

    const { addMovie } = this.props;

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(newMovie);
    this.clearState();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const key: keyof State = name as keyof State;

    this.setState({
      [key]: value,
    } as Pick<State, keyof State>);
  };

  clearState() {
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
      title, description, imgUrl, imdbId, imdbUrl,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter you title"
          name="title"
          value={title}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Enter you description"
          value={description}
          onChange={this.handleChange}
        />

        <input
          type="text"
          placeholder="Enter you imgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />

        <input
          type="text"
          placeholder="Enter you imdUrl"
          value={imdbUrl}
          name="imdbUrl"
          onChange={this.handleChange}
        />

        <input
          type="text"
          placeholder="Enter you imdbld"
          value={imdbId}
          name="imdbId"
          onChange={this.handleChange}
        />

        <button type="submit">add</button>
      </form>
    );
  }
}

import React, { Component } from 'react';

type Props = {
  addMovie: (movies: Movie) => void
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    const {
      title, description, imdbUrl, imgUrl, imdbId,
    } = this.state;

    const newMovie = {
      title, description, imdbUrl, imgUrl, imdbId,
    };

    this.props.addMovie(newMovie);
  };

  render() {
    const {
      title, description, imdbUrl, imgUrl, imdbId,
    } = this.state;

    return (
      <div>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={this.changeHandler}
          />

          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={this.changeHandler}
          />

          <input
            type="text"
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={this.changeHandler}
          />

          <input
            type="text"
            placeholder="imgUrl"
            value={imgUrl}
            onChange={this.changeHandler}
          />

          <input
            type="text"
            placeholder="imdbId"
            value={imdbId}
            onChange={this.changeHandler}
          />

          <button type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (newMovie: Movie) => void
};
type State = {
  newMovie: {
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,
  }
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

  changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  addMovieHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.addMovie(this.state.newMovie);

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
      <form onSubmit={this.addMovieHandler}>
        <div>
          <label
            htmlFor="title"
            className="label"
          >
            Movie Title
            <input
              required
              id="title"
              name="title"
              value={title}
              type="text"
              onChange={this.changeHandler}
            />
          </label>
        </div>

        <label
          htmlFor="description"
          className="label"
        >
          Movie Description
          <textarea
            rows={5}
            required
            id="description"
            name="description"
            value={description}
            onChange={this.changeHandler}
          />
        </label>

        <label
          htmlFor="imgUrl"
          className="label"
        >
          URL
          <input
            required
            id="imgUrl"
            name="imgUrl"
            value={imgUrl}
            type="text"
            onChange={this.changeHandler}
          />
        </label>

        <label
          htmlFor="imdbUrl"
          className="label"
        >
          imdbUrl
          <input
            required
            id="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            type="text"
            onChange={this.changeHandler}
          />
        </label>

        <label
          htmlFor="imdbId"
          className="label"
        >
          imdbId
          <input
            required
            id="imdbId"
            name="imdbId"
            value={imdbId}
            type="text"
            onChange={this.changeHandler}
          />
        </label>

        <button
          type="submit"
        >
          Add Movie
        </button>
      </form>
    );
  }
}

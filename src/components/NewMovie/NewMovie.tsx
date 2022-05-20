import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (newMovie: Movie) => void
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  error: boolean,
  errorContent: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    error: false,
    errorContent: '',
  };

  clear = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleInput = (event: React.ChangeEvent<HTMLFormElement>) => {
    this.setState((state: State) => ({
      ...state,
      [event.target.name]: event.target.value.trim,
    }));
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    if (!this.state.title.trim()
      || this.state.description
      || this.state.imgUrl
      || this.state.imdbUrl
      || this.state.imdbId) {
      this.setState((state) => ({
        ...state,
        error: true,
        errorContent: 'Please, do not write only spaces',
      }));
    }

    this.clear();
    this.props.addMovie(newMovie);
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
        onSubmit={this.handleSubmit}
      >
        <p className="form__p">
          ADD A NEW FILM
        </p>
        {this.state.error && (
          <p>{this.state.errorContent}</p>
        )}
        <input
          required
          className="form__input"
          type="text"
          name="title"
          placeholder="write title"
          value={title}
          onChange={(event) => {
            this.setState({
              title: event.target.value,
            });
          }}
        />
        <input
          required
          className="form__input"
          type="text"
          name="description"
          placeholder="write description"
          value={description}
          onChange={(event) => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <input
          required
          className="form__input"
          type="text"
          name="imgUrl"
          placeholder="write imgUrl"
          value={imgUrl}
          onChange={(event) => {
            this.setState({
              imgUrl: event.target.value,
            });
          }}
        />
        <input
          required
          className="form__input"
          type="text"
          name="imdbUrl"
          placeholder="write imdbUrl"
          value={imdbUrl}
          onChange={(event) => {
            this.setState({
              imdbUrl: event.target.value,
            });
          }}
        />
        <input
          required
          className="form__input"
          type="text"
          name="imdbId"
          placeholder="write imdbId"
          value={imdbId}
          onChange={(event) => {
            this.setState({
              imdbId: event.target.value,
            });
          }}
        />
        <button
          type="submit"
          className="button"
        >
          ADD FILM
        </button>
      </form>
    );
  }
}

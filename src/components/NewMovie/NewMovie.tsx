import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  addMovie: (movie: Movie) => void;
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  titleError: string,
  imgUrlError: string,
  imdbUrlError: string,
  imdbIdError: string,
};

const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: '',
    imgUrlError: '',
    imdbUrlError: '',
    imdbIdError: '',
  };

  newMovie = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    return newMovie;
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const key: keyof State = name as keyof State;

    this.setState((currentState) => ({
      ...currentState,
      [key]: value,
    }));

    this.setClearErrors();
  };

  setClearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  setClearErrors = () => {
    this.setState({
      titleError: '',
      imgUrlError: '',
      imdbUrlError: '',
      imdbIdError: '',
    });
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.checkValidData();

    if (this.checkValidData()) {
      const newMovie = this.newMovie();

      this.props.addMovie(newMovie);
      this.setClearState();
    }
  };

  checkValidData = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title) {
      this.setState({
        titleError: 'Title is required',
      });

      return false;
    }

    if (!imgUrl) {
      this.setState({
        imgUrlError: 'Link for the poster is required',
      });

      return false;
    }

    if (!imdbUrl) {
      this.setState({
        imdbUrlError: 'Link to the IMDB is required',
      });

      return false;
    }

    if (!imdbId) {
      this.setState({
        imdbIdError: 'Id of the film on IMDB is required',
      });

      return false;
    }

    if (!regex.test(imgUrl)) {
      this.setState({
        imgUrlError: 'Link for the poster no valid',
      });

      return false;
    }

    if (!regex.test(imdbUrl)) {
      this.setState({
        imdbUrlError: 'Link to the IMDB no valid',
      });

      return false;
    }

    return true;
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    return (
      <>
        <h1>Add New Movie</h1>
        <form
          className="form"
          onSubmit={this.onSubmit}
        >
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Enter the title"
            value={title}
            onChange={this.handleChange}
          />
          <p>
            {titleError}
          </p>
          <input
            className="input"
            type="text"
            name="description"
            placeholder="Enter Description"
            value={description}
            onChange={this.handleChange}
          />
          <p>
            {}
          </p>
          <input
            className="input"
            type="text"
            name="imgUrl"
            placeholder="Enter link for the poster"
            value={imgUrl}
            onChange={this.handleChange}
          />
          <p>
            {imgUrlError}
          </p>
          <input
            className="input"
            type="text"
            name="imdbUrl"
            placeholder="Enter link to the IMDB"
            value={imdbUrl}
            onChange={this.handleChange}
          />
          <p>
            {imdbUrlError}
          </p>
          <input
            className="input"
            type="text"
            name="imdbId"
            placeholder="Enter id of the film on IMDB"
            value={imdbId}
            onChange={this.handleChange}
          />
          <p>
            {imdbIdError}
          </p>
          <button
            className="button"
            type="submit"
          >
            Add New Film
          </button>
        </form>
      </>
    );
  }
}

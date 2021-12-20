import React, { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  movie: Movie,

  isValid: {
    title: boolean,
    imdbUrl: boolean,
    imdbId: boolean,
    imgUrl: boolean,
  },
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    movie: {
      title: '',
      description: '',
      imdbUrl: '',
      imdbId: '',
      imgUrl: '',
    },
    isValid: {
      title: true,
      imdbUrl: true,
      imdbId: true,
      imgUrl: true,
    },
  };

  linkValidation = (link: string) => {
    const linkRegExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return linkRegExp.test(link);
  };

  clearForm = () => {
    this.setState({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onAdd({ ...this.state.movie });
    this.clearForm();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    this.setState((state) => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
      isValid: {
        ...state.isValid,
        [name]: true,
      },
    }));
  };

  handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    switch (name) {
      case ('title'):
      case ('imdbId'):
        this.setState(state => (
          {
            isValid: {
              ...state.isValid,
              [name]: !(value.trim() === ''),
            },
          }
        ));
        break;
      case ('imdbUrl'):
      case ('imgUrl'):
        this.setState(state => (
          {
            isValid: {
              ...state.isValid,
              [name]: this.linkValidation(value),
            },
          }
        ));
        break;
      default:
        break;
    }
  };

  render() {
    const { movie, isValid } = this.state;

    const isButtonDisabled = !movie.title
      || !movie.imdbId
      || !this.linkValidation(movie.imdbUrl)
      || !this.linkValidation(movie.imgUrl);

    return (
      <form
        onSubmit={this.handleSubmit}
        className="new-movie"
      >
        <legend className="new-movie__title">Add Movie</legend>

        <label htmlFor="title" className="new-movie__field">
          <h3>Title</h3>

          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            className={classNames('new-movie__input', { 'new-movie__input--invalid': !isValid.title })}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {isValid.title || <p className="new-movie__error">Add title</p>}
        </label>

        <label htmlFor="description" className="new-movie__field">
          <h3>Description</h3>

          <textarea
            id="description"
            name="description"
            value={movie.description}
            className="new-movie__input"
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imgUrl" className="new-movie__field">
          <h3>Image Link</h3>

          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={movie.imgUrl}
            className={classNames('new-movie__input', { 'new-movie__input--invalid': !isValid.imgUrl })}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {isValid.imgUrl || <p className="new-movie__error">Url is invalid</p>}
        </label>

        <label htmlFor="imdbUrl" className="new-movie__field">
          <h3>Imdb Link</h3>

          <input
            type="text"
            id="imdbUrl"
            name="imdbUrl"
            value={movie.imdbUrl}
            className={classNames('new-movie__input', { 'new-movie__input--invalid': !isValid.imdbUrl })}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {isValid.imdbUrl || <p className="new-movie__error">Url is invalid</p>}
        </label>

        <label htmlFor="imdbId" className="new-movie__field">
          <h3>IMDB Id</h3>

          <input
            type="text"
            id="imdbId"
            name="imdbId"
            value={movie.imdbId}
            className={classNames('new-movie__input', { 'new-movie__input--invalid': !isValid.imdbId })}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {isValid.imdbId || <p className="new-movie__error">Add IMDB Id</p>}
        </label>

        <button
          type="submit"
          className="new-movie__button"
          disabled={isButtonDisabled}
        >
          Add movie
        </button>
      </form>
    );
  }
}

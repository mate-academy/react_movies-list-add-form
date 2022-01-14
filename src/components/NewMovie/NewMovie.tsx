import React, { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  addMovie: (newFilm: Movie) => void;
};
type State = {
  newFilm: Movie,
  titleError: boolean,
  imgUrlError: boolean,
  imdbUrlError: boolean,
  imdbIdError: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newFilm: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    titleError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newFilm: {
        ...state.newFilm,
        [name]: value,
      },
    }));
  };

  titleInputCheck = () => {
    if (!this.state.newFilm.title.trim().length) {
      this.setState(state => ({
        titleError: !state.titleError,
      }));
    }
  };

  titleInputFocus = () => {
    if (this.state.titleError) {
      this.setState(state => ({
        titleError: !state.titleError,
      }));
    }
  };

  validateUrl = (url: string): boolean => {
    // eslint-disable-next-line
    const reg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return reg.test(url);
  };

  imgUrlInputCheck = () => {
    const checkImgUrl = this.validateUrl(this.state.newFilm.imgUrl);

    if (!checkImgUrl) {
      this.setState(state => ({
        imgUrlError: !state.imgUrlError,
      }));
    }
  };

  imgUrlInputFocus = () => {
    if (this.state.imgUrlError) {
      this.setState(state => ({
        imgUrlError: !state.imgUrlError,
      }));
    }
  };

  imdbUrlInputCheck = () => {
    const checkImdbUrl = this.validateUrl(this.state.newFilm.imdbUrl);

    if (!checkImdbUrl) {
      this.setState(state => ({
        imdbUrlError: !state.imdbUrlError,
      }));
    }
  };

  imdbUrlInputFocus = () => {
    if (this.state.imdbUrlError) {
      this.setState(state => ({
        imdbUrlError: !state.imdbUrlError,
      }));
    }
  };

  imdbIdInputCheck = () => {
    if (!this.state.newFilm.imdbId.trim()) {
      this.setState(state => ({
        imdbIdError: !state.imdbIdError,
      }));
    }
  };

  imdbIdInputFocus = () => {
    if (this.state.imdbIdError) {
      this.setState(state => ({
        imdbIdError: !state.imdbIdError,
      }));
    }
  };

  formAddNewFilm = () => {
    this.setState(state => ({
      newFilm: {
        title: state.newFilm.title,
        description: state.newFilm.description,
        imgUrl: state.newFilm.imgUrl,
        imdbUrl: state.newFilm.imdbUrl,
        imdbId: state.newFilm.imdbId,
      },
    }));

    this.props.addMovie(this.state.newFilm);
  };

  formClear = () => {
    this.setState({
      newFilm: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  submitFormButtonControl = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newFilm;

    const {
      imgUrlError,
      imdbUrlError,
    } = this.state;

    if (title.length < 1 || imgUrl.length < 1 || imdbUrl.length < 1 || imdbId.length < 1) {
      return true;
    }

    if (imdbUrlError === true || imgUrlError === true) {
      return true;
    }

    return false;
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.formAddNewFilm();
    this.formClear();
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newFilm;

    const {
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="new-movie-form"
      >
        <h2 className="new-movie-form__title">Add a new film</h2>
        <label htmlFor="title">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Add title"
            className={classNames({ error__border: titleError })}
            value={title}
            onChange={this.handleChange}
            onFocus={this.titleInputFocus}
            onBlur={this.titleInputCheck}
          />
          <span
            className={classNames('error', { error__show: titleError })}
          >
            Please, add film title - required field
          </span>
        </label>

        <label htmlFor="description">
          <textarea
            id="description"
            name="description"
            placeholder="Add description"
            value={description}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imgUrl">
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            placeholder="Add imgUrl"
            className={classNames({ error__border: imgUrlError })}
            value={imgUrl}
            onChange={this.handleChange}
            onFocus={this.imgUrlInputFocus}
            onBlur={this.imgUrlInputCheck}
          />
          <span
            className={classNames('error', { error__show: imgUrlError })}
          >
            Please, add a link (http://tra.la/la) - required field
          </span>
        </label>

        <label htmlFor="imdbUrl">
          <input
            type="text"
            id="imdbUrl"
            name="imdbUrl"
            placeholder="Add imdbUrl"
            className={classNames({ error__border: imdbUrlError })}
            value={imdbUrl}
            onChange={this.handleChange}
            onFocus={this.imdbUrlInputFocus}
            onBlur={this.imdbUrlInputCheck}
          />
          <span
            className={classNames('error', { error__show: imdbUrlError })}
          >
            Please, add a link (http://tra.la/la) - required field
          </span>
        </label>

        <label htmlFor="imdbId">
          <input
            type="text"
            id="imdbId"
            name="imdbId"
            placeholder="Add imdbId"
            className={classNames({ error__border: imdbIdError })}
            value={imdbId}
            onChange={this.handleChange}
            onFocus={this.imdbIdInputFocus}
            onBlur={this.imdbIdInputCheck}
          />
          <span
            className={classNames('error', { error__show: imdbIdError })}
          >
            Please, add film id - required field
          </span>
        </label>
        <button
          type="submit"
          disabled={this.submitFormButtonControl()}
        >
          Submit
        </button>
      </form>
    );
  }
}

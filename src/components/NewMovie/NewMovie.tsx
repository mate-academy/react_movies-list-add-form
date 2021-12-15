import React, { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  title: string,
  isTitleValid: boolean,
  description: string,
  imgUrl: string,
  isImgUrlValid: boolean,
  imdbUrl: string,
  isImdbUrlValid: boolean,
  imdbId: string,
  isImdbIdValid: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    isTitleValid: true,
    description: '',
    imgUrl: '',
    isImgUrlValid: true,
    imdbUrl: '',
    isImdbUrlValid: true,
    imdbId: '',
    isImdbIdValid: true,
  };

  linkValidation = (link: string) => {
    const linkRegExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return link.match(linkRegExp);
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

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    this.clearForm();
  };

  render() {
    const {
      title,
      isTitleValid,
      description,
      imgUrl,
      isImgUrlValid,
      imdbUrl,
      isImdbUrlValid,
      imdbId,
      isImdbIdValid,
    } = this.state;

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
            value={title}
            className={classNames('new-movie__input', { 'new-movie__input--invalid': !isTitleValid })}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
                isTitleValid: true,
              });
            }}
            onBlur={() => {
              if (!title) {
                this.setState({ isTitleValid: false });
              }
            }}
          />
          {isTitleValid || <p className="new-movie__error">Add title</p>}
        </label>

        <label htmlFor="description" className="new-movie__field">
          <h3>Description</h3>

          <textarea
            id="description"
            value={description}
            className="new-movie__input"
            onChange={(event) => {
              this.setState({ description: event.target.value });
            }}
          />
        </label>

        <label htmlFor="imgUrl" className="new-movie__field">
          <h3>Image Link</h3>

          <input
            type="text"
            id="imgUrl"
            value={imgUrl}
            className={classNames('new-movie__input', { 'new-movie__input--invalid': !isImgUrlValid })}
            onChange={(event) => {
              this.setState({
                isImgUrlValid: true,
                imgUrl: event.target.value,
              });
            }}
            onBlur={() => {
              if (!this.linkValidation(imgUrl)) {
                this.setState({ isImgUrlValid: false });
              }
            }}
          />
          {isImgUrlValid || <p className="new-movie__error">Url is invalid</p>}
        </label>

        <label htmlFor="imdbUrl" className="new-movie__field">
          <h3>Imdb Link</h3>

          <input
            type="text"
            id="imdbUrl"
            value={imdbUrl}
            className={classNames('new-movie__input', { 'new-movie__input--invalid': !isImdbUrlValid })}
            onChange={(event) => {
              this.setState({
                isImdbUrlValid: true,
                imdbUrl: event.target.value,
              });
            }}
            onBlur={() => {
              if (!this.linkValidation(imdbUrl)) {
                this.setState({ isImdbUrlValid: false });
              }
            }}
          />
          {isImdbUrlValid || <p className="new-movie__error">Url is invalid</p>}
        </label>

        <label htmlFor="imdbId" className="new-movie__field">
          <h3>IMDB Id</h3>

          <input
            type="text"
            id="imdbId"
            value={imdbId}
            className={classNames('new-movie__input', { 'new-movie__input--invalid': !isImdbIdValid })}
            onChange={(event) => {
              this.setState({
                isImdbIdValid: true,
                imdbId: event.target.value,
              });
            }}
            onBlur={() => {
              if (!imdbId) {
                this.setState({ isImdbIdValid: false });
              }
            }}
          />
          {isImdbIdValid || <p className="new-movie__error">Add IMDB Id</p>}
        </label>

        <button
          type="submit"
          className="new-movie__button"
          disabled={
            !title || !imdbId || !this.linkValidation(imdbUrl) || !this.linkValidation(imgUrl)
          }
        >
          Add movie
        </button>
      </form>
    );
  }
}

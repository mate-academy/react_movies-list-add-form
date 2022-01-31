import React, { Component } from 'react';
import classNames from 'classnames/bind';

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
  hasImgUrlError: boolean,
  hasImdbUrlError: boolean,
  isDisabledButton: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    hasImgUrlError: false,
    hasImdbUrlError: false,
    isDisabledButton: false,
  };

  handlerOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'imgUrl':
        this.setState((state) => ({
          ...state,
          hasImgUrlError: this.isValidationUrl(value),
          isDisabledButton: this.isValidationUrl(value),
          [name]: value,
        }));
        break;
      case 'imdbUrl':
        this.setState((state) => ({
          ...state,
          hasImdbUrlError: this.isValidationUrl(value),
          isDisabledButton: this.isValidationUrl(value),
          [name]: value,
        }));
        break;
      default:
        this.setState((state) => ({
          ...state,
          [name]: value,
        }));
    }
  };

  isValidationUrl = (value: string) => {
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return !regex.test(value);
  };

  handlerFormSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(movie);
    this.resetInputs();
  };

  resetInputs = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      hasImgUrlError: false,
      hasImdbUrlError: false,
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      hasImgUrlError,
      hasImdbUrlError,
      isDisabledButton,
    } = this.state;

    return (
      <form
        onSubmit={this.handlerFormSubmit}
        className="form"
      >
        <label
          htmlFor="title"
          className="form__input-label"
        >
          Title&nbsp;
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={this.handlerOnChange}
            required
            className="input form__input"
            placeholder="Title"
          />
        </label>
        <label
          htmlFor="description"
          className="form__input-label"
        >
          Description&nbsp;
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={this.handlerOnChange}
            className="textarea form__input"
            placeholder="Description"
          />
        </label>
        <label
          htmlFor="imgUrl"
          className={
            classNames('form__input-label',
              { 'form__input-label__error': hasImgUrlError })
          }
        >
          ImgUrl&nbsp;
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={imgUrl}
            onChange={this.handlerOnChange}
            className={
              classNames('input form__input',
                { 'is-danger': hasImgUrlError })
            }
            required
            placeholder="ImgUrl"
          />
          {
            hasImgUrlError
            && (
              <span className="has-text-danger form__error">
                Please enter correct image URL
              </span>
            )
          }
        </label>
        <label
          htmlFor="imdbUrl"
          className={
            classNames('form__input-label',
              { 'form__input-label__error': hasImdbUrlError })
          }
        >
          ImdbUrl&nbsp;
          <input
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            value={imdbUrl}
            onChange={this.handlerOnChange}
            className={
              classNames('input form__input',
                { 'is-danger': hasImdbUrlError })
            }
            required
            placeholder="ImdbUrl"
          />
          {
            hasImdbUrlError
            && (
              <span className="has-text-danger form__error">
                Please enter correct IMDd
              </span>
            )
          }
        </label>
        <label
          htmlFor="imdbId"
          className="form__input-label"
        >
          ImdbId&nbsp;
          <input
            type="text"
            name="imdbId"
            id="imdbId"
            value={imdbId}
            onChange={this.handlerOnChange}
            className="input form__input"
            required
            placeholder="ImdbId"
          />
        </label>
        <button
          type="submit"
          className="button"
          disabled={isDisabledButton}
        >
          Add Movie
        </button>
      </form>
    );
  }
}

import classNames from 'classnames';
import React, { Component } from 'react';
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
  noTitleError: string;
  noImageError: string;
  noImdbLinkError: string;
  noImdbIdError: string;
  invalidUrlError: string;
  wasAttempted: boolean;
};

const regEx = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    noTitleError: 'Title is required',
    noImageError: 'Image url is required',
    noImdbLinkError: 'IMDB url is required',
    noImdbIdError: 'IMDB id is required',
    invalidUrlError: 'Invalid url',
    wasAttempted: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  disableSubmit = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      wasAttempted,
    } = this.state;
    let shouldBeDisabled = false;

    if (wasAttempted && (!title
      || !imgUrl
      || !imdbUrl
      || !imdbId
      || !imgUrl.match(regEx)
      || !imdbUrl.match(regEx))) {
      shouldBeDisabled = true;
    }

    return shouldBeDisabled;
  };

  validate = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    let isValid = false;

    if (title.trim()
      && imgUrl.trim()
      && imdbUrl.trim()
      && imdbId.trim()
      && imdbUrl.match(regEx)
      && imgUrl.match(regEx)
    ) {
      isValid = true;
    }

    return isValid;
  };

  resetState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      wasAttempted: false,
    });
  };

  submitChanges = (event: React.FormEvent<HTMLFormElement>) => {
    const { onAdd } = this.props;

    event.preventDefault();
    this.setState({ wasAttempted: true });
    if (this.validate()) {
      onAdd(this.state);
      this.resetState();
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      noTitleError,
      noImageError,
      noImdbLinkError,
      noImdbIdError,
      invalidUrlError,
      wasAttempted,
    } = this.state;

    return (
      <form
        autoComplete="off"
        className="Form"
        onSubmit={this.submitChanges}
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={this.handleChange}
          className={classNames('Form__input', {
            'Form__input--invalid': wasAttempted && noTitleError && !title,
          })}
        />

        {!title && wasAttempted && (
          <p className="Form__error-message">
            {noTitleError}
          </p>
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
          className="Form__input"
        />

        <input
          type="text"
          placeholder="Image url"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          className={classNames('Form__input', {
            'Form__input--invalid': wasAttempted
            && (!imgUrl || !imgUrl.match(regEx)),
          })}
        />

        {!imgUrl && wasAttempted && (
          <p className="Form__error-message">
            {noImageError}
          </p>
        )}

        {imgUrl && !imgUrl.match(regEx) && (
          <p className="Form__error-message">
            {invalidUrlError}
          </p>
        )}

        <input
          type="text"
          placeholder="IMDB url"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          className={classNames('Form__input', {
            'Form__input--invalid': wasAttempted
            && (!imdbUrl || !imdbUrl.match(regEx)),
          })}
        />

        {!imdbUrl && wasAttempted && (
          <p className="Form__error-message">
            {noImdbLinkError}
          </p>
        )}

        {imdbUrl && !imdbUrl.match(regEx) && (
          <p className="Form__error-message">
            {invalidUrlError}
          </p>
        )}

        <input
          type="text"
          placeholder="IMDB id"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          className={classNames('Form__input', {
            'Form__input--invalid': wasAttempted && noImdbIdError && !imdbId,
          })}
        />

        {!imdbId && wasAttempted && (
          <p className="Form__error-message">
            {noImdbIdError}
          </p>
        )}

        <button
          type="submit"
          disabled={this.disableSubmit()}
          className="Form__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}

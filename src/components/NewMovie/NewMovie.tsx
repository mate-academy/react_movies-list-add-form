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
  submitDisabled: boolean;
};

const regEx = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    noTitleError: '',
    noImageError: '',
    noImdbLinkError: '',
    noImdbIdError: '',
    invalidUrlError: '',
    submitDisabled: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  validate = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    let isValid = true;

    if (!title.trim()) {
      this.setState({
        noTitleError: 'Title is required',
      });

      isValid = false;
    }

    if (!imgUrl.trim()) {
      this.setState({
        noImageError: 'Image url is required',
      });

      isValid = false;
    }

    if (!imdbUrl.trim()) {
      this.setState({
        noImdbLinkError: 'IMDB url is required',
      });

      isValid = false;
    }

    if (!imdbId.trim()) {
      this.setState({
        noImdbIdError: 'IMDB id is required',
      });

      isValid = false;
    }

    if (!imdbUrl.match(regEx) || !imgUrl.match(regEx)) {
      this.setState({
        invalidUrlError: 'Invalid url',
      });

      isValid = false;
    }

    if (!isValid) {
      this.setState({ submitDisabled: true });
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
      noTitleError: '',
      noImageError: '',
      noImdbLinkError: '',
      noImdbIdError: '',
      invalidUrlError: '',
      submitDisabled: false,
    });
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
      submitDisabled,
    } = this.state;
    const { onAdd } = this.props;

    return (
      <form
        className="Form"
        onSubmit={(event => {
          event.preventDefault();
          if (this.validate()) {
            onAdd(this.state);
            this.resetState();
          }
        }
        )}
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={this.handleChange}
          className={classNames('Form__input', {
            'Form__input--invalid': noTitleError && !title,
          })}
        />
        {!title && noTitleError && (
          <p className="Form__error-message">
            {noTitleError}
          </p>
        )}

        <textarea
          name="description"
          placeholder="Description"
          rows={5}
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
            'Form__input--invalid': (noImageError && !imgUrl) || (invalidUrlError && !imgUrl.match(regEx)),
          })}
        />
        {!imgUrl && noImageError && (
          <p className="Form__error-message">
            {noImageError}
          </p>
        )}

        {imgUrl && !imgUrl.match(regEx) && invalidUrlError && (
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
            'Form__input--invalid': (noImdbLinkError && !imdbUrl) || (invalidUrlError && !imdbUrl.match(regEx)),
          })}
        />

        {!imdbUrl && noImdbLinkError && (
          <p className="Form__error-message">
            {noImdbLinkError}
          </p>
        )}

        {imdbUrl && !imdbUrl.match(regEx) && invalidUrlError && (
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
            'Form__input--invalid': noImdbIdError && !imdbId,
          })}
        />

        {!imdbId && noImdbIdError && (
          <p className="Form__error-message">
            {noImdbIdError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitDisabled && (!imgUrl || !title || !imdbUrl || !imdbId)}
          className="Form__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}

import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newFilm: Movie) => void
};
type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  hasTitleError: boolean;
  hasImgUrlError: boolean;
  hasImdbUrlError: boolean;
  hasImdbIdError: boolean;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    hasTitleError: false,
    hasImgUrlError: false,
    hasImdbUrlError: false,
    hasImdbIdError: false,
  };

  validateUrl = (url: string) => {
    const validate = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return validate.test(url);
  };

  validateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
      case 'imdbId':
        return value.trim();
      case 'imgUrl':
      case 'imdbUrl':
        return this.validateUrl(value);
      default:
        return false;
    }
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isFormValid = this.validateForm();

    if (isFormValid) {
      this.props.onAdd(this.getNewFilm());
      this.clearState();
    }
  };

  getErrorName = (name: string) => {
    return `has${name[0].toUpperCase()}${name.slice(1)}Error`;
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newState = {
      [name]: value,
      [this.getErrorName(name)]: !this.validateInput(event),
    } as State;

    this.setState(newState);
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const hasErrorName = this.getErrorName(name);
    let newState;

    if (name !== 'description') {
      newState = { [hasErrorName]: !this.validateInput(event) } as
        OnBlurHasError;
      this.setState(newState);
    }
  };

  validateForm = () => {
    const {
      title,
      imdbUrl,
      imgUrl,
      imdbId,
    } = this.state;

    if (!title.trim() || !this.validateUrl(imdbUrl)
      || !imdbId.trim() || !this.validateUrl(imgUrl)) {
      this.setState({
        hasTitleError: !title.trim(),
        hasImdbUrlError: !this.validateUrl(imdbUrl),
        hasImgUrlError: !this.validateUrl(imgUrl),
        hasImdbIdError: !imdbId.trim(),
      });

      return false;
    }

    return true;
  };

  disabledButton = () => {
    const {
      hasTitleError,
      hasImdbIdError,
      hasImdbUrlError,
      hasImgUrlError,
    } = this.state;

    return hasTitleError || hasImdbIdError
      || hasImgUrlError || hasImdbUrlError;
  };

  getNewFilm = () => {
    const {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    } = this.state;

    return {
      title: title.trim(),
      description: description.trim(),
      imdbUrl: imdbUrl.trim(),
      imgUrl: imgUrl.trim(),
      imdbId: imdbId.trim(),
    };
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imdbUrl: '',
      imgUrl: '',
      imdbId: '',
      hasTitleError: false,
      hasImgUrlError: false,
      hasImdbUrlError: false,
      hasImdbIdError: false,
    });
  };

  render() {
    const {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
      hasTitleError,
      hasImdbIdError,
      hasImdbUrlError,
      hasImgUrlError,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="box mt-5">
        <input
          type="text"
          name="title"
          value={title}
          placeholder="title"
          className="input is-rounded"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {hasTitleError && <div className="has-text-danger">write a title</div>}
        <input
          type="text"
          name="description"
          value={description}
          placeholder="description"
          className="input is-rounded mt-3"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          placeholder="imgUrl"
          className="input is-rounded mt-3"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {hasImgUrlError && <div className="has-text-danger">write a imgUrl</div>}
        <input
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="imdbUrl"
          className="input is-rounded mt-3"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {hasImdbUrlError && <div className="has-text-danger">write a imdbUrl</div>}
        <input
          type="text"
          name="imdbId"
          value={imdbId}
          placeholder="imdbId"
          className="input is-rounded mt-3"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {hasImdbIdError && <div className="has-text-danger">write a imdbId</div>}
        <button
          type="submit"
          className="button is-dark mt-6"
          disabled={this.disabledButton()}
        >
          Submit
        </button>
      </form>
    );
  }
}

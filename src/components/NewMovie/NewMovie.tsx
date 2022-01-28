import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newFilm: Movie) => void
};
type State = {
  inputTitle: string;
  inputDescription: string;
  inputImgUrl: string;
  inputImdbUrl: string;
  inputImdbId: string;
  hasTitleError: boolean;
  hasImgUrlitleError: boolean;
  hasImdbUrlitleError: boolean;
  hasImbdIdError: boolean;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    inputTitle: '',
    inputDescription: '',
    inputImgUrl: '',
    inputImdbUrl: '',
    inputImdbId: '',
    hasTitleError: false,
    hasImgUrlitleError: false,
    hasImdbUrlitleError: false,
    hasImbdIdError: false,
  };

  validateUrl = (url: string) => {
    const validate = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&= +$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#? (?:[.!/\\\w]*))?)$/;

    return validate.test(url);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newState = { [name]: value } as Pick<ForHandleChange, keyof ForHandleChange>;

    this.setState(newState);
  };

  validateForm = () => {
    const {
      inputTitle,
      inputImdbUrl,
      inputImgUrl,
      inputImdbId,
    } = this.state;

    if (!inputTitle.trim() || !this.validateUrl(inputImdbUrl)
      || !inputImdbId.trim() || !this.validateUrl(inputImgUrl)) {
      this.setState({
        hasTitleError: !inputTitle.trim(),
        hasImdbUrlitleError: !this.validateUrl(inputImdbUrl),
        hasImgUrlitleError: !this.validateUrl(inputImgUrl),
        hasImbdIdError: !inputImdbId.trim(),
      });

      return false;
    }

    return true;
  };

  disabledButton = () => {
    const {
      hasTitleError,
      hasImbdIdError,
      hasImdbUrlitleError,
      hasImgUrlitleError,
    } = this.state;

    return hasTitleError || hasImbdIdError
      || hasImgUrlitleError || hasImdbUrlitleError;
  };

  getNewFilm = () => {
    const {
      inputTitle,
      inputDescription,
      inputImdbUrl,
      inputImgUrl,
      inputImdbId,
    } = this.state;

    return {
      title: inputTitle,
      description: inputDescription,
      imdbUrl: inputImdbUrl,
      imgUrl: inputImgUrl,
      imdbId: inputImdbId,
    };
  };

  clearState = () => {
    this.setState({
      inputTitle: '',
      inputDescription: '',
      inputImdbUrl: '',
      inputImgUrl: '',
      inputImdbId: '',
      hasTitleError: false,
      hasImgUrlitleError: false,
      hasImdbUrlitleError: false,
      hasImbdIdError: false,
    });
  };

  handleSubmitFilm = () => {
    const isFormValid = this.validateForm();

    if (isFormValid) {
      this.props.onAdd(this.getNewFilm());
      this.clearState();
    }
  };

  render() {
    const {
      inputTitle,
      inputDescription,
      inputImdbUrl,
      inputImgUrl,
      inputImdbId,
      hasTitleError,
      hasImbdIdError,
      hasImdbUrlitleError,
      hasImgUrlitleError,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="box mt-5">
        <input
          type="text"
          name="inputTitle"
          value={inputTitle}
          placeholder="title"
          className="input is-rounded"
          onChange={this.handleChange}
        />
        {hasTitleError && <div className="has-text-danger">write a title</div>}
        <input
          type="text"
          name="inputDescription"
          value={inputDescription}
          placeholder="description"
          className="input is-rounded mt-3"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="inputImgUrl"
          value={inputImgUrl}
          placeholder="imgUrl"
          className="input is-rounded mt-3"
          onChange={this.handleChange}
        />
        {hasImgUrlitleError && <div className="has-text-danger">write a imgUrl</div>}
        <input
          type="text"
          name="inputImdbUrl"
          value={inputImdbUrl}
          placeholder="imdbUrl"
          className="input is-rounded mt-3"
          onChange={this.handleChange}
        />
        {hasImdbUrlitleError && <div className="has-text-danger">write a imdbUrl</div>}
        <input
          type="text"
          name="inputImdbId"
          value={inputImdbId}
          placeholder="imdbId"
          className="input is-rounded mt-3"
          onChange={this.handleChange}
        />
        {hasImbdIdError && <div className="has-text-danger">write a imdbId</div>}
        <button
          type="button"
          className="button is-dark mt-6"
          onClick={this.handleSubmitFilm}
          disabled={this.disabledButton()}
        >
          Submit
        </button>
      </form>
    );
  }
}

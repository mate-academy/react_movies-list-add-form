/* eslint-disable no-console */
import { Component } from 'react';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void
};
type State = Movie & {
  isTitleErrorVisible: boolean;
  isImgUrlErrorVisible: boolean;
  isImdbUrlErrorVisible: boolean;
  isImdbIdErrorVisible: boolean;
  isImgUrlInvalid: boolean;
  isImdbUrlInvalid: boolean;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleErrorVisible: false,
    isImgUrlErrorVisible: false,
    isImdbUrlErrorVisible: false,
    isImdbIdErrorVisible: false,
    isImgUrlInvalid: false,
    isImdbUrlInvalid: false,
  };

  urlValidator = (str: string) => {
    // eslint-disable-next-line max-len
    const validUrlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return str.match(validUrlRegex) || false;
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const { onAdd } = this.props;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    event.preventDefault();

    onAdd(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleErrorVisible,
      isImgUrlErrorVisible,
      isImdbUrlErrorVisible,
      isImdbIdErrorVisible,
      isImdbUrlInvalid,
      isImgUrlInvalid,
    } = this.state;

    return (
      <form
        onSubmit={(event) => {
          this.handleSubmit(event);
        }}
        className="form"
      >
        <label className="form__label">
          Title:
          <input
            name="title"
            type="text"
            value={title}
            onChange={({ target }) => {
              this.setState({ title: target.value });
            }}
            onBlur={(event) => {
              if (!event.target.value) {
                this.setState({ isTitleErrorVisible: true });
              } else {
                this.setState({ isTitleErrorVisible: false });
              }
            }}
            className="form__input"
            style={isTitleErrorVisible
              ? { border: '1px solid red' }
              : {}}
          />
        </label>

        {isTitleErrorVisible && (
          <p className="form__error">
            * Title is required
          </p>
        )}

        <label className="form__label">
          Description:
          <input
            name="description"
            type="text"
            value={description}
            onChange={({ target }) => {
              this.setState({ description: target.value });
            }}
            className="form__input"
          />
        </label>

        <label className="form__label">
          Image URL:
          <input
            name="imgUrl"
            type="text"
            value={imgUrl}
            onChange={({ target }) => {
              this.setState({ imgUrl: target.value });
            }}
            onBlur={(event) => {
              if (!event.target.value) {
                this.setState({ isImgUrlErrorVisible: true });
              } else {
                this.setState({ isImgUrlErrorVisible: false });
              }

              if (this.urlValidator(event.target.value)) {
                this.setState({ isImgUrlInvalid: false });
              } else {
                this.setState({ isImgUrlInvalid: true });
              }
            }}
            className="form__input"
            style={isImgUrlErrorVisible || isImgUrlInvalid
              ? { border: '1px solid red' }
              : {}}
          />
        </label>

        {isImgUrlErrorVisible && (
          <p className="form__error">
            * Image URL is required
          </p>
        )}

        {isImgUrlInvalid && (
          <p className="form__error">
            * Image URL is not valid
          </p>
        )}

        <label className="form__label">
          IMDB URL:
          <input
            name="imdbUrl"
            type="text"
            value={imdbUrl}
            onChange={({ target }) => {
              this.setState({ imdbUrl: target.value });
            }}
            onBlur={(event) => {
              if (!event.target.value) {
                this.setState({ isImdbUrlErrorVisible: true });
              } else {
                this.setState({ isImdbUrlErrorVisible: false });
              }

              if (this.urlValidator(event.target.value)) {
                this.setState({ isImdbUrlInvalid: false });
              } else {
                this.setState({ isImdbUrlInvalid: true });
              }
            }}
            className="form__input"
            style={isImdbUrlErrorVisible || isImdbUrlInvalid
              ? { border: '1px solid red' }
              : {}}
          />
        </label>

        {isImdbUrlErrorVisible && (
          <p className="form__error">
            * IMDB URL is required
          </p>
        )}

        {isImdbUrlInvalid && (
          <p className="form__error">
            * IMDB URL is not valid
          </p>
        )}

        <label className="form__label">
          IMDB ID:
          <input
            name="imdbId"
            type="text"
            value={imdbId}
            onChange={({ target }) => {
              this.setState({ imdbId: target.value });
            }}
            onBlur={(event) => {
              if (!event.target.value) {
                this.setState({ isImdbIdErrorVisible: true });
              } else {
                this.setState({ isImdbIdErrorVisible: false });
              }
            }}
            className="form__input"
            style={isImdbIdErrorVisible
              ? { border: '1px solid red' }
              : {}}
          />
        </label>

        {isImdbIdErrorVisible && (
          <p className="form__error">
            * IMDB ID is required
          </p>
        )}

        <button
          type="submit"
          className="form__submit"
          disabled={
            (!title
              || !imgUrl
              || !imdbUrl
              || !imdbId
              || this.urlValidator(imdbUrl) === false
              || this.urlValidator(imgUrl) === false) || false
          }
        >
          Submit
        </button>

      </form>
    );
  }
}

import React from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.min.css';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  hasTitleError: boolean,
  hasImgUrlError: boolean,
  hasImdbUrlError: boolean,
  hasImdbIdError: boolean,
};

export class NewMovie extends React.Component<Props, State> {
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    this.setState(state => ({
      ...state,
      [name]: value,
      [`has${capitalizedName}Error`]: false,
    }));
  };

  handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      description: event.target.value,
    });
  };

  getNewMovie = () => {
    const movie: Movie = this.state;

    return movie;
  };

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  isValidTitle = () => {
    const { title } = this.state;

    if (!title) {
      this.setState({ hasTitleError: !title });

      return false;
    }

    return true;
  };

  isCorrectUrl = (url: string) => {
    return url.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);
  };

  isValidImgUrl = () => {
    const { imgUrl } = this.state;
    const correctImgUrl = imgUrl && this.isCorrectUrl(imgUrl);

    if (!correctImgUrl) {
      this.setState({ hasImgUrlError: !correctImgUrl });

      return false;
    }

    return true;
  };

  isValidImdbUrl = () => {
    const { imdbUrl } = this.state;
    const correctImdbUrl = imdbUrl && this.isCorrectUrl(imdbUrl);

    if (!correctImdbUrl) {
      this.setState({ hasImdbUrlError: !correctImdbUrl });

      return false;
    }

    return true;
  };

  isValidImdbId = () => {
    const { imdbId } = this.state;

    if (!imdbId) {
      this.setState({ hasImdbIdError: !imdbId });

      return false;
    }

    return true;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.isValidTitle()
      && this.isValidImgUrl()
      && this.isValidImdbUrl()
      && this.isValidImdbId()) {
      this.props.onAdd(this.getNewMovie());
      this.clearInputs();
    }
  };

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
      hasTitleError, hasImgUrlError, hasImdbUrlError, hasImdbIdError,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="is-flex is-flex-direction-column"
      >
        <label htmlFor="title" className="is-block">
          Title:
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={this.handleChange}
            onBlur={this.isValidTitle}
            className={classNames('input', {
              'is-danger': hasTitleError,
            })}
          />
        </label>
        {hasTitleError && (
          <span className="is-size-7 has-text-danger-dark">
            Please enter the title
          </span>
        )}

        <label htmlFor="imgUrl" className="is-block">
          imgUrl:
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            onBlur={this.isValidImgUrl}
            className={classNames('input', {
              'is-danger': hasImgUrlError,
            })}
          />
        </label>

        {hasImgUrlError && (
          <span className="is-size-7 has-text-danger-dark">
            Please enter correct URL
          </span>
        )}

        <label htmlFor="imdbUrl" className="is-block">
          imdbUrl:
          <input
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            onBlur={this.isValidImdbUrl}
            className={classNames('input', {
              'is-danger': hasImgUrlError,
            })}
          />
        </label>
        {hasImdbUrlError && (
          <span className="is-size-7 has-text-danger-dark">
            Please enter correct IMDB URL
          </span>
        )}

        <label htmlFor="imdbId" className="is-block">
          imdbId:
          <input
            type="text"
            name="imdbId"
            id="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            onBlur={this.isValidImdbId}
            className={classNames('input', {
              'is-danger': hasImdbIdError,
            })}
          />
        </label>
        {hasImdbIdError && (
          <span className="is-size-7 has-text-danger-dark">
            Please enter the IMDB id
          </span>
        )}

        <label htmlFor="description" className="is-block">
          Description:
          <textarea
            id="description"
            value={description}
            onChange={this.handleDescriptionChange}
            className="textarea"
          />
        </label>

        <button
          type="submit"
          className="button is-dark is-outlined mt-5"
          disabled={
            hasTitleError
            || hasImgUrlError
            || hasImdbUrlError
            || hasImdbIdError
          }
        >
          Add movie
        </button>
      </form>
    );
  }
}

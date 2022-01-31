import { Component } from 'react';
import classNames from 'classnames';

type Props = {
  onAdd: (movie: Movie) => void,
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  isValidLink: boolean,
  hasTitleError: boolean,
  hasImgUrlError: boolean,
  hasImdbUrlError: boolean,
  hasImdbIdError: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isValidLink: true,
    hasTitleError: false,
    hasImgUrlError: false,
    hasImdbUrlError: false,
    hasImdbIdError: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      hasTitleError: false,
    });
  };

  handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imgUrl: event.target.value,
      hasImgUrlError: false,
    });
  };

  handleImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbUrl: event.target.value,
      hasImdbUrlError: false,
    });
  };

  handleImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbId: event.target.value,
      hasImdbIdError: false,
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

  linkCheck = (url: string) => {
    return url.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);
  };

  isValidImgUrl = () => {
    const { imgUrl } = this.state;
    const correctImgUrl = imgUrl && this.linkCheck(imgUrl);

    if (!correctImgUrl) {
      this.setState({ hasImgUrlError: !correctImgUrl });

      return false;
    }

    return true;
  };

  isValidImdbUrl = () => {
    const { imdbUrl } = this.state;
    const correctImdbUrl = imdbUrl && this.linkCheck(imdbUrl);

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

  validateForm = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      this.setState({
        hasTitleError: !title,
        hasImgUrlError: !imgUrl,
        hasImdbUrlError: !imdbUrl,
        hasImdbIdError: !imdbId,
      });

      return false;
    }

    return true;
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      hasTitleError: false,
      hasImgUrlError: false,
      hasImdbUrlError: false,
      hasImdbIdError: false,
    });
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = this.validateForm();

    if (isFormValid) {
      const newMovie = {
        title: this.state.title,
        description: this.state.description,
        imgUrl: this.state.imgUrl,
        imdbId: this.state.imdbId,
        imdbUrl: this.state.imdbUrl,
      };

      this.props.onAdd(newMovie);
      this.clearState();
    }
  };

  render() {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
      isValidLink,
      hasTitleError,
      hasImgUrlError,
      hasImdbUrlError,
      hasImdbIdError,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="title"
          value={title}
          className="input"
          onChange={this.handleTitleChange}
          onBlur={this.isValidTitle}
        />

        {hasTitleError && (
          <span className="error">Please, enter a title</span>
        )}

        <textarea
          name="description"
          value={description}
          className="textarea"
          placeholder="description"
          onChange={this.handleDescriptionChange}
        />

        <input
          name="imgUrl"
          type="text"
          className={classNames('input', { invalid: !isValidLink })}
          value={imgUrl}
          placeholder="imgUrl"
          onChange={this.handleImgUrlChange}
          onBlur={this.isValidImgUrl}
        />

        {hasImgUrlError && (
          <span className="error">Please, enter a valid imgUrl</span>
        )}

        <input
          name="imdbUrl"
          type="text"
          className="input"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleImdbUrlChange}
          onBlur={this.isValidImdbUrl}
        />

        {hasImdbUrlError && (
          <span className="error">Please, enter a valid imdbUrl</span>
        )}

        <input
          name="imdbId"
          type="text"
          placeholder="imdbId"
          className="input"
          value={imdbId}
          onChange={this.handleImdbIdChange}
          onBlur={this.isValidImdbId}
        />

        {hasImdbIdError && (
          <span className="error">Please, enter a valid imdbId</span>
        )}

        <button
          name="button"
          type="submit"
          className="button is-success"
          disabled={
            hasTitleError
            || hasImgUrlError
            || hasImdbUrlError
            || hasImdbIdError
          }
        >
          Add
        </button>
      </form>
    );
  }
}

import { Component } from 'react';

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

  getErrorName = (name: string) => {
    const errorName = name[0].toUpperCase() + name.slice(1);

    return `has${errorName}Error`;
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const errorName = this.getErrorName(name);

    this.setState(state => ({
      ...state,
      [name]: value,
      [errorName]: false,
    }));
  };

  validateForm = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
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
          onChange={this.handleChange}
        />

        {hasTitleError && (
          <span className="error">Please, enter a title</span>
        )}

        <textarea
          name="description"
          value={description}
          className="textarea"
          placeholder="description"
          onChange={this.handleChange}
        />

        <input
          name="imgUrl"
          type="text"
          className="input"
          value={imgUrl}
          placeholder="imgUrl"
          onChange={this.handleChange}
        />

        {hasImgUrlError && (
          <span className="error">Please, enter a imgUrl</span>
        )}

        <input
          name="imdbUrl"
          type="text"
          className="input"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />

        {hasImdbUrlError && (
          <span className="error">Please, enter a imdbUrl</span>
        )}

        <input
          name="imdbId"
          type="text"
          placeholder="imdbId"
          className="input"
          value={imdbId}
          onChange={this.handleChange}
        />

        {hasImdbIdError && (
          <span className="error">Please, enter a imdbId</span>
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

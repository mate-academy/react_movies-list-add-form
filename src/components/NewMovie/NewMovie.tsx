import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (obj: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  isTitleError: boolean,
  isImgUrlError: boolean,
  isImdbUrlError: boolean,
  isImdbIdError: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleError: false,
    isImgUrlError: false,
    isImdbUrlError: false,
    isImdbIdError: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const newKey = name.charAt(0).toUpperCase() + name.slice(1);
    const setProp = `is${[newKey]}Error`;

    if ((name === 'imgUrl' || name === 'imdbUrl')
      && !this.controlValidUrl(value)) {
      this.setState({ [setProp]: true } as unknown as State);
    } else {
      this.setState({ [setProp]: false } as unknown as State);
    }

    this.setState({ [name]: value } as Pick<Movie, keyof Movie>);
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = event.target;
    const newKey = name.charAt(0).toUpperCase() + name.slice(1);
    const setProp = `is${[newKey]}Error`;

    if (!value) {
      this.setState({ [setProp]: true } as unknown as State);
    } else {
      event.preventDefault();
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.addMovie(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  controlValidUrl = (url: string) => {
    const re = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return re.test(url);
  };

  controlButtonDisabled = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (!title || !imgUrl || !imdbUrl || !imdbId
    || !this.controlValidUrl(imgUrl) || !this.controlValidUrl(imdbUrl));
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleError,
      isImgUrlError,
      isImdbUrlError,
      isImdbIdError,
    } = this.state;

    return (
      <form
        className="NewMovie"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor={title}>
          {'Title* '}

          <span className="NewMovie__label-error">
            {isTitleError && 'This field is required'}
          </span>

          <input
            className={`NewMovie__input ${isTitleError ? 'NewMovie__input--error' : ''}`}
            id={title}
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </label>

        <label
          htmlFor={description}
        >
          {'Description '}
          <textarea
            className="NewMovie__input"
            id={description}
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor={imgUrl}>
          {'ImgUrl* '}
          <span className="NewMovie__label-error">
            {isImgUrlError && 'Url is not correct'}
          </span>

          <input
            className={`NewMovie__input ${isImgUrlError ? 'NewMovie__input--error' : ''}`}
            id={imgUrl}
            type="text"
            name="imgUrl"
            placeholder="ImgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </label>

        <label htmlFor={imdbUrl}>
          {'ImdbUrl* '}
          <span className="NewMovie__label-error">
            {isImdbUrlError && 'Url is not correct'}
          </span>

          <input
            className={`NewMovie__input ${isImdbUrlError ? 'NewMovie__input--error' : ''}`}
            id={imdbUrl}
            type="text"
            name="imdbUrl"
            placeholder="ImdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </label>

        <label htmlFor={imdbId}>
          {'ImdbId* '}
          <span className="NewMovie__label-error">
            {isImdbIdError && 'This field is required'}
          </span>

          <input
            className={`NewMovie__input ${isImdbIdError ? 'NewMovie__input--error' : ''}`}
            id={imdbId}
            type="text"
            name="imdbId"
            placeholder="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </label>

        <button
          className="NewMovie__button"
          type="submit"
          disabled={this.controlButtonDisabled()}
        >
          Add
        </button>
      </form>
    );
  }
}

import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  validImgUrl: boolean,
  imdbUrl:string,
  validImdbUrl: boolean,
  urlError: string,
  imdbId: string,
  disabled: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    validImgUrl: true,
    imdbUrl: '',
    validImdbUrl: true,
    imdbId: '',
    disabled: false,
    urlError: '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line max-len
    const validUrl = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    const { name, value } = event.target;

    switch (name) {
      case 'title':
        this.setState({
          title: value,
        });
        break;

      case 'description':
        this.setState({
          description: value,
        });
        break;

      case 'imgUrl':
        this.setState({
          imgUrl: value,
          validImgUrl: validUrl.test(value),
        });
        break;

      case 'imdbUrl':
        this.setState({
          imdbUrl: value,
          validImdbUrl: validUrl.test(value),
        });
        break;

      case 'imdbId':
        this.setState({
          imdbId: value,
        });
        break;

      default:
    }

    this.setState({ disabled: false });
  };

  isValidDate = () => {
    const { validImdbUrl, validImgUrl } = this.state;

    if (!validImdbUrl || !validImgUrl) {
      this.setState({
        urlError: 'Invalid input!',
        disabled: true,
      });

      return false;
    }

    return true;
  };

  reset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      disabled: false,
    });
  };

  setBorder = (isValid: boolean) => {
    return isValid ? { border: '' } : { border: '2px solid #DC143C' };
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.isValidDate()) {
      const movie = {
        title: this.state.title,
        description: this.state.description,
        imgUrl: this.state.imgUrl,
        imdbUrl: this.state.imdbUrl,
        imdbId: this.state.imdbId,
      };

      this.props.onAdd(movie);
      this.reset();
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      validImgUrl,
      imdbUrl,
      validImdbUrl,
      imdbId,
      disabled,
      urlError,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="NewMovie"
      >
        <label htmlFor="title">
          <input
            type="text"
            name="title"
            className="NewMovie__input"
            value={title}
            placeholder="Title"
            onChange={this.handleInputChange}
            required
          />
        </label>

        <label htmlFor="description">
          <input
            type="text"
            name="description"
            className="NewMovie__input"
            value={description}
            placeholder="Description"
            onChange={this.handleInputChange}
          />
        </label>

        <label htmlFor="imgUrl">
          <input
            type="text"
            name="imgUrl"
            className="NewMovie__input"
            value={imgUrl}
            placeholder="Image link"
            onChange={this.handleInputChange}
            style={this.setBorder(validImgUrl)}
            required
          />
          {!validImgUrl
              && (
                <p>{urlError}</p>
              )}
        </label>

        <label htmlFor="imdbUrl">
          <input
            type="text"
            name="imdbUrl"
            className="NewMovie__input"
            value={imdbUrl}
            placeholder="IMDB link"
            onChange={this.handleInputChange}
            style={this.setBorder(validImdbUrl)}
            required
          />
          {!validImdbUrl
              && (
                <p>{urlError}</p>
              )}
        </label>

        <label htmlFor="imdbId">
          <input
            type="text"
            name="imdbId"
            className="NewMovie__input"
            value={imdbId}
            placeholder="IMDB Id"
            onChange={this.handleInputChange}
            required
          />
        </label>

        <button
          type="submit"
          disabled={disabled}
          className="NewMovie__button"
        >
          Add
        </button>
      </form>
    );
  }
}

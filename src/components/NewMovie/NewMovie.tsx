import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movies: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  errorImg: string,
  errorImdb: string,
  validImdb: boolean,
  validImg: boolean,
  disabled: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errorImdb: '',
    errorImg: '',
    validImdb: true,
    validImg: true,
    disabled: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line max-len
    const validUrl = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as unknown as Pick<State, keyof State>);

    if (name === 'imgUrl') {
      this.setState({
        validImg: validUrl.test(value),
      });
    }

    if (name === 'imdbUrl') {
      this.setState({
        validImdb: validUrl.test(value),
      });
    }

    this.setState({
      disabled: false,
    });
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

  validation = () => {
    const {
      validImdb,
      validImg,
    } = this.state;

    if (!validImdb || !validImg) {
      this.setState({
        errorImdb: "Your imdbUrl isn't validation",
        errorImg: "Your imgUrl isn't validation",
        disabled: (!validImdb || !validImg),
      });

      return false;
    }

    return true;
  };

  onAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.validation()) {
      const newMovie = {
        title: this.state.title,
        description: this.state.description,
        imgUrl: this.state.imgUrl,
        imdbUrl: this.state.imdbUrl,
        imdbId: this.state.imdbId,
      };

      this.props.addMovie(newMovie);
      this.reset();
    }
  };

  borderStyle = (valid: boolean) => {
    return !valid ? { border: '1px solid red' }
      : { border: '' };
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errorImg,
      errorImdb,
      validImdb,
      validImg,
      disabled,
    } = this.state;

    return (
      <form onSubmit={this.onAdd}>
        <div className="input-field">
          <label
            htmlFor="first_name"
          >
            First Name
          </label>
          <input
            className="input-field__input"
            value={title}
            type="text"
            name="title"
            placeholder="First name"
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="input-field">
          <label
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="input-field__input"
            value={description}
            type="text"
            placeholder="Description"
            name="description"
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field">
          <label
            htmlFor="imgUrl"
          >
            imgUrl
          </label>
          <input
            className="input-field__input"
            value={imgUrl}
            type="text"
            name="imgUrl"
            placeholder="url"
            style={this.borderStyle(validImg)}
            onChange={this.handleChange}
            required
          />
          {!validImg
            && (
              <p className="form__error">
                {errorImg}
              </p>
            )}
        </div>
        <div className="input-field">
          <label
            htmlFor="imdbUrl"
          >
            imdbUrl
          </label>
          <input
            className="input-field__input"
            value={imdbUrl}
            type="text"
            name="imdbUrl"
            placeholder="url"
            style={this.borderStyle(validImdb)}
            required
            onChange={this.handleChange}
          />
          {!validImdb
            && (
              <p className="form__error">
                {errorImdb}
              </p>
            )}
        </div>
        <div className="input-field">
          <label
            htmlFor="imdbId"
          >
            ImdbId
          </label>
          <input
            className="input-field__input"
            value={imdbId}
            type="text"
            name="imdbId"
            placeholder="urlId"
            required
            onChange={this.handleChange}
          />
        </div>
        <button
          type="submit"
          className="button-form"
          disabled={disabled}
        >
          Add
        </button>
      </form>
    );
  }
}

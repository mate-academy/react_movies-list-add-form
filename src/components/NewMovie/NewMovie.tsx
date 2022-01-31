import React, { Component } from 'react';
import './NewMovie.scss';
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
  isValidImg: boolean,
  isValidImdb: boolean,
  abledButton: boolean
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isValidImg: true,
    isValidImdb: true,
    abledButton: true,
  };

  handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  blurHandlerImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (value && !regex.test(value)) {
      return this.setState((state) => ({
        ...state,
        isValidImg: false,
      }));
    }

    return this.setState(state => ({
      ...state,
      isValidImg: true,
      abledButton: true,
    }));
  };

  blurHandlerImdb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (value && !regex.test(value)) {
      return this.setState((state) => ({
        ...state,
        isValidImdb: false,
      }));
    }

    return this.setState(state => ({
      ...state,
      isValidImdb: true,
      abledButton: true,
    }));
  };

  blockButton = () => {
    if (!this.state.isValidImdb || !this.state.isValidImg) {
      this.setState((state) => ({
        ...state,
        abledButton: false,
      }));
    }
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbId: this.state.imdbId,
      imdbUrl: this.state.imdbUrl,
    };

    this.props.onAdd(newMovie);
    this.setState(state => ({
      ...state,
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));
  };

  render() {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
      isValidImg,
      isValidImdb,
      abledButton,
    } = this.state;

    return (
      <>
        <h1 className="title">Form of new Movie</h1>

        <form onSubmit={this.handleSubmit} className="form">
          <input
            type="text"
            name="title"
            className="input"
            placeholder="title"
            value={title}
            onChange={this.handleInputChange}
            required
          />
          <textarea
            name="description"
            value={description}
            className="input"
            placeholder="description"
            onChange={this.handleTextAreaChange}
          />
          <input
            type="text"
            name="imgUrl"
            className={classNames('input', { invalid: !isValidImg })}
            value={imgUrl}
            placeholder="imgUrl"
            onChange={this.handleInputChange}
            onBlur={this.blurHandlerImg}
            required
          />

          {!isValidImg && (
            <span>Please type a valid url</span>
          )}

          <input
            type="text"
            name="imdbUrl"
            className={classNames('input', { invalid: !isValidImdb })}
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={this.handleInputChange}
            onBlur={this.blurHandlerImdb}
            required
          />

          {!isValidImdb && (
            <span>Please type a valid url</span>
          )}

          <input
            type="text"
            name="imdbId"
            placeholder="imdbId"
            className="input"
            value={imdbId}
            onChange={this.handleInputChange}
            required
          />

          <button
            type="submit"
            className="button is-info"
            disabled={!abledButton}
            onClick={this.blockButton}
          >
            Add
          </button>
        </form>
      </>

    );
  }
}

import React from 'react';
import classNames from 'classnames';

import './NewMovie.scss';
import { ErrorMessage } from '../ErrorMessage';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  titleError: boolean,
  imgUrlError: boolean,
  imdbUrlError: boolean,
  imdbIdError: boolean,
  disableButton: boolean,
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,
    disableButton: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));

    this.handlValid(name, value);
  };

  handlValid = (name: string, value: string) => {
    /* eslint max-len: ["error", { "ignoreRegExpLiterals": true }] */
    const validUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (value === '') {
      if (name === 'title') {
        this.setState({
          titleError: true,
          disableButton: true,
        });
      }

      if (name === 'imdbId') {
        this.setState({
          imdbIdError: true,
          disableButton: true,
        });
      }
    } else {
      this.setState({
        titleError: false,
        imdbIdError: false,
        disableButton: false,
      });
    }

    if (!validUrl.test(value)) {
      if (name === 'imgUrl') {
        this.setState({
          imgUrlError: true,
          disableButton: true,
        });
      }

      if (name === 'imdbUrl') {
        this.setState({
          imdbUrlError: true,
          disableButton: true,
        });
      }
    } else {
      this.setState({
        imgUrlError: false,
        imdbUrlError: false,
        disableButton: false,
      });
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    event.preventDefault();

    const movie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    if (title.length > 0
      && imgUrl.length > 0
      && imdbUrl.length > 0
      && imdbId.length > 0
    ) {
      this.props.onAdd(movie);

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        titleError: false,
        imgUrlError: false,
        imdbUrlError: false,
        imdbIdError: false,
        disableButton: false,
      });
    } else {
      this.setState({
        disableButton: true,
      });
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
      disableButton,
    } = this.state;

    return (
      <>
        <h2>Add a new film!</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            className={classNames('input', { input__error: titleError })}
            type="text"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              this.handleChange(event);
            }}
          />
          {titleError && <ErrorMessage />}
          <input
            className="input"
            type="text"
            name="description"
            placeholder="Enter a description"
            value={description}
            onChange={this.handleChange}
          />
          <input
            className={classNames('input', { input__error: imgUrlError })}
            type="text"
            name="imgUrl"
            placeholder="Enter a image's url"
            value={imgUrl}
            onChange={this.handleChange}
          />
          {imgUrlError && <ErrorMessage />}
          <input
            className={classNames('input', { input__error: imdbUrlError })}
            type="text"
            name="imdbUrl"
            placeholder="Enter imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
          {imdbUrlError && <ErrorMessage />}
          <input
            className={classNames('input', { input__error: imdbIdError })}
            type="text"
            name="imdbId"
            placeholder="Enter imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
          {imdbIdError && <ErrorMessage />}
          <button type="submit" className="button" disabled={disableButton}>
            Add
          </button>
        </form>
      </>
    );
  }
}

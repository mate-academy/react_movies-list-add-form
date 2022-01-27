import { Component } from 'react';
import classNames from 'classnames';

import './NewMovie.scss';

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

const getErrorNameHelper = (name: string): string => `has${name[0].toUpperCase()}${name.slice(1)}Error`;

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

  validateTextField = (name: string): boolean => {
    const validName = name as 'title' | 'imdbId';

    if (this.state[validName].trim() === '') {
      this.setState({
        [getErrorNameHelper(name)]: true,
      } as Pick<State, 'hasTitleError' | 'hasImdbIdError'>);

      return false;
    }

    return true;
  };

  validateUrlField = (name: string): boolean => {
    const validName = name as 'imgUrl' | 'imdbUrl';

    if (
      !/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
        .test(this.state[validName])
    ) {
      this.setState({
        [getErrorNameHelper(name)]: true,
      } as Pick<State, 'hasImgUrlError' | 'hasImdbUrlError'>);

      return false;
    }

    return true;
  };

  validateForm = (): boolean => {
    const validTitle = this.validateTextField('title');
    const validImdbId = this.validateTextField('imdbId');
    const validImgUrl = this.validateUrlField('imgUrl');
    const validImdbUrl = this.validateUrlField('imdbUrl');

    return validTitle
      && validImdbId
      && validImgUrl
      && validImdbUrl;
  };

  isButtonDisabled = (): boolean => {
    const {
      hasTitleError,
      hasImdbIdError,
      hasImgUrlError,
      hasImdbUrlError,
    } = this.state;

    return hasTitleError || hasImdbIdError || hasImgUrlError || hasImdbUrlError;
  };

  createNewMovie = (): Movie => ({ ...this.state });

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [getErrorNameHelper(name)]: false,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (this.validateForm()) {
      const newMovie = this.createNewMovie();

      this.props.onAdd(newMovie);
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      hasTitleError,
      hasImgUrlError,
      hasImdbUrlError,
      hasImdbIdError,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        <div className="field">
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
            placeholder="Enter a title"
            className={classNames('input is-warning', { 'is-danger': hasTitleError })}
            onBlur={(event) => this.validateTextField(event.target.name)}
          />
          {hasTitleError && (<p className="help is-danger">Please, enter a valid title</p>)}
        </div>

        <div className="field">
          <input
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
            placeholder="Enter a description"
            className="input is-warning"
          />
        </div>

        <div className="field">
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            placeholder="Enter a imgUrl"
            className={classNames('input is-warning', { 'is-danger': hasImgUrlError })}
            onBlur={(event) => this.validateUrlField(event.target.name)}
          />
          {hasImgUrlError && (<p className="help is-danger">Please, enter a valid imgUrl</p>)}
        </div>

        <div className="field">
          <input
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            placeholder="Enter a imdbUrl"
            className={classNames('input is-warning', { 'is-danger': hasImdbUrlError })}
            onBlur={(event) => this.validateUrlField(event.target.name)}
          />
          {hasImdbUrlError && (<p className="help is-danger">Please, enter a valid imdbUrl</p>)}
        </div>

        <div className="field">
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            placeholder="Enter a imdbId"
            className={classNames('input is-warning', { 'is-danger': hasImdbIdError })}
            onBlur={(event) => this.validateTextField(event.target.name)}
          />
          {hasImdbIdError && (<p className="help is-danger">Please, enter a valid imdbId</p>)}
        </div>

        <button
          type="submit"
          className="button is-warning"
          disabled={this.isButtonDisabled()}
        >
          Add
        </button>
      </form>
    );
  }
}

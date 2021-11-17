import React, { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  isImgUrlValid: boolean,
  isImdbUrlValid: boolean,
  isTitleEntered: boolean,
  isImdbIdEntered: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isImgUrlValid: false,
    isImdbUrlValid: false,
    isTitleEntered: false,
    isImdbIdEntered: false,
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    });
    this.clearState();
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isImgUrlValid: false,
      isImdbUrlValid: false,
      isTitleEntered: false,
      isImdbIdEntered: false,
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as unknown as Pick<State, keyof State>);
  };

  canSubmit = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      isImgUrlValid,
      isImdbUrlValid,
      isTitleEntered,
      isImdbIdEntered,
    } = this.state;

    return title && imdbUrl && imdbUrl && imgUrl
      && imdbId && !isImdbIdEntered
      && !isImgUrlValid && !isImdbUrlValid && !isTitleEntered;
  };

  handleUrlOnBlurr = (event:React.FocusEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const expression = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const regExp = new RegExp(expression);

    switch (name) {
      case 'imgUrl':
        if (value.match(regExp)) {
          this.setState({
            isImgUrlValid: false,
          } as Pick<State, keyof State>);
        } else {
          this.setState({
            isImgUrlValid: true,
          } as Pick<State, keyof State>);
        }

        break;
      case 'imdbUrl':
        if (value.match(regExp)) {
          this.setState({
            isImdbUrlValid: false,
          } as Pick<State, keyof State>);
        } else {
          this.setState({
            isImdbUrlValid: true,
          } as Pick<State, keyof State>);
        }

        break;
      case 'title':
        if (this.state.title) {
          this.setState({
            isTitleEntered: false,
          } as Pick<State, keyof State>);
        } else {
          this.setState({
            isTitleEntered: true,
          } as Pick<State, keyof State>);
        }

        break;
      case 'imdbId':
        if (this.state.imdbId) {
          this.setState({
            isImdbIdEntered: false,
          } as Pick<State, keyof State>);
        } else {
          this.setState({
            isImdbIdEntered: true,
          } as Pick<State, keyof State>);
        }

        break;

      default:
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isImgUrlValid,
      isImdbUrlValid,
      isTitleEntered,
      isImdbIdEntered,
    } = this.state;
    const isDesabled = this.canSubmit();

    return (
      <form
        className="from"
        name="form"
        action="POST"
        onSubmit={this.handleSubmit}
      >
        <div className="form__item">
          <label htmlFor="title">
            Title:
            {' '}
            <input
              required
              className={classNames('input',
                { 'input error': isTitleEntered })}
              name="title"
              placeholder="Enter title here"
              value={title}
              type="text"
              onChange={this.handleInputChange}
              onBlur={this.handleUrlOnBlurr}
            />
          </label>
          <div className="error-message">
            {isTitleEntered && (<span>Please enter the title</span>)}
          </div>
        </div>

        <div className="form__item">
          <label htmlFor="imgUrl">
            Image url:
            {' '}
            <input
              required
              className={classNames('input',
                { 'input error': isImgUrlValid })}
              name="imgUrl"
              type="text"
              value={imgUrl}
              placeholder="Enter image url"
              onChange={this.handleInputChange}
              onBlur={this.handleUrlOnBlurr}
            />
          </label>
          <div className="error-message">
            {isImgUrlValid && (<span>Url is invalid</span>)}
          </div>
        </div>

        <div className="form__item">
          <label htmlFor="imdbUrl">
            Imdb Url:
            {' '}
            <input
              required
              className={classNames('input',
                { 'input error': isImdbUrlValid })}
              name="imdbUrl"
              type="text"
              value={imdbUrl}
              placeholder="Enter imdb url"
              onChange={this.handleInputChange}
              onBlur={this.handleUrlOnBlurr}
            />
          </label>
          <div className="error-message">
            {isImdbUrlValid && (<span>Url is invalid</span>)}
          </div>
        </div>

        <div className="form__item">
          <label htmlFor="imdbId">
            Imdb Id:
            {' '}
            <input
              required
              className={classNames('input',
                { 'input error': isImdbIdEntered })}
              name="imdbId"
              type="text"
              value={imdbId}
              placeholder="Enter imdb Id"
              onChange={this.handleInputChange}
              onBlur={this.handleUrlOnBlurr}
            />
          </label>
          <div className="error-message">
            {isImdbIdEntered && (<span>Enter valid Id</span>)}
          </div>
        </div>
        <div className="form__item">
          <textarea
            className="textarea"
            placeholder="Enter a movie description"
            name="desctiption"
            value={description}
            onChange={(event) => {
              this.setState({ description: event.target.value });
            }}
          />
        </div>
        <button
          className="button"
          disabled={!isDesabled}
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

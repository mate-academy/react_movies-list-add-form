import React, { Component } from 'react';
import classnames from 'classnames';

import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  isTitleEmpty: boolean,
  isDescriptionEmpty: boolean,
  isimgUrlEmpty: boolean,
  isimdbUrlEmpty: boolean,
  isimdbIdEmpty: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleEmpty: false,
    isDescriptionEmpty: false,
    isimgUrlEmpty: false,
    isimdbUrlEmpty: false,
    isimdbIdEmpty: false,
  };

  clickOnTextarea = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.name === 'title') {
      return this.setState({ isTitleEmpty: false });
    }

    if (event.currentTarget.name === 'description') {
      return this.setState({ isDescriptionEmpty: false });
    }

    if (event.currentTarget.name === 'imgUrl') {
      return this.setState({ isimgUrlEmpty: false });
    }

    if (event.currentTarget.name === 'imdbUrl') {
      return this.setState({ isimdbUrlEmpty: false });
    }

    if (event.currentTarget.name === 'imdbId') {
      return this.setState({ isimdbIdEmpty: false });
    }

    return '';
  };

  addMovieInfo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.name === 'title') {
      return this.setState({ [event.target.name]: event.target.value });
    }

    if (event.currentTarget.name === 'description') {
      return this.setState({ description: event.currentTarget.value });
    }

    if (event.currentTarget.name === 'imgUrl') {
      return this.setState({ imgUrl: event.currentTarget.value });
    }

    if (event.currentTarget.name === 'imdbUrl') {
      return this.setState({ imdbUrl: event.currentTarget.value });
    }

    if (event.currentTarget.name === 'imdbId') {
      return this.setState({ imdbId: event.currentTarget.value });
    }

    return '';
  };

  onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      if (!title) {
        this.setState({ isTitleEmpty: true });
      }

      if (!description) {
        this.setState({ isDescriptionEmpty: true });
      }

      if (!imgUrl) {
        this.setState({ isimgUrlEmpty: true });
      }

      if (!imdbUrl) {
        this.setState({ isimdbUrlEmpty: true });
      }

      if (!imdbId) {
        this.setState({ isimdbIdEmpty: true });
      }

      return;
    }

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);

    this.setState(
      {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        isTitleEmpty: false,
        isDescriptionEmpty: false,
        isimgUrlEmpty: false,
        isimdbUrlEmpty: false,
        isimdbIdEmpty: false,
      },
    );
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleEmpty,
      isDescriptionEmpty,
      isimgUrlEmpty,
      isimdbUrlEmpty,
      isimdbIdEmpty,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.onSubmit}
      >
        <div className="form__item">
          <textarea
            onChange={this.addMovieInfo}
            onClick={this.clickOnTextarea}
            className={classnames('form__input', { 'form--error': isTitleEmpty })}
            name="title"
            id="title"
            value={!isTitleEmpty ? title : 'Enter movie title'}
            placeholder="Enter movie title"
          />
          <span className="form__item--title">
            Title
          </span>
        </div>

        <div className="form__item">
          <textarea
            onChange={this.addMovieInfo}
            onClick={this.clickOnTextarea}
            className={
              classnames(
                'form__input form__input--descr',
                { 'form--error': isDescriptionEmpty },
              )
            }
            name="description"
            id="description"
            value={!isDescriptionEmpty ? description : 'Enter movie description'}
            placeholder="Enter movie description"
          />
          <span className="form__item--title">
            Description
          </span>
        </div>

        <div className="form__item">
          <textarea
            onChange={this.addMovieInfo}
            onClick={this.clickOnTextarea}
            className={classnames('form__input', { 'form--error': isimgUrlEmpty })}
            name="imgUrl"
            id="imgUrl"
            value={!isimgUrlEmpty ? imgUrl : 'Enter movie imgUrl'}
            placeholder="Enter movie imgUrl"
          />
          <span className="form__item--title">
            imgUrl
          </span>
        </div>

        <div className="form__item">
          <textarea
            onChange={this.addMovieInfo}
            onClick={this.clickOnTextarea}
            className={classnames('form__input', { 'form--error': isimdbUrlEmpty })}
            name="imdbUrl"
            id="imdbUrl"
            value={!isimdbUrlEmpty ? imdbUrl : 'Enter movie imdbUrl'}
            placeholder="Enter movie imdbUrl"
          />
          <span className="form__item--title">
            imdbUrl
          </span>
        </div>

        <div className="form__item">
          <textarea
            onChange={this.addMovieInfo}
            onClick={this.clickOnTextarea}
            className={classnames('form__input', { 'form--error': isimdbIdEmpty })}
            name="imdbId"
            id="imdbId"
            value={!isimdbIdEmpty ? imdbId : 'Enter movie imdbId'}
            placeholder="Enter movie imdbId"
          />
          <span className="form__item--title">
            imdbId
          </span>
        </div>

        <button
          className="form__button"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

import React, { Component } from 'react';
import classnames from 'classnames';

import {
  Props,
  State,
  MovieAtribut,
  MovieAtributState,
} from './Types';

import './NewMovie.scss';

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    istitleEmpty: false,
    isdescriptionEmpty: false,
    isimgUrlEmpty: false,
    isimdbUrlEmpty: false,
    isimdbIdEmpty: false,
  };

  clickOnTextarea = (event: React.MouseEvent<HTMLTextAreaElement>) => (
    this.setState({ [`is${event.currentTarget.name}Empty`]: false } as MovieAtributState)
  );

  addMovieInfo = (event: React.ChangeEvent<HTMLTextAreaElement>) => (
    this.setState({ [event.target.name]: event.target.value } as MovieAtribut)
  );

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
        this.setState({ istitleEmpty: true });
      }

      if (!description) {
        this.setState({ isdescriptionEmpty: true });
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
        istitleEmpty: false,
        isdescriptionEmpty: false,
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
      istitleEmpty,
      isdescriptionEmpty,
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
            className={classnames('form__input', { 'form--error': istitleEmpty })}
            name="title"
            id="title"
            value={!istitleEmpty ? title : 'Enter movie title'}
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
                { 'form--error': isdescriptionEmpty },
              )
            }
            name="description"
            id="description"
            value={!isdescriptionEmpty ? description : 'Enter movie description'}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isErrorImgUrl: false,
    isErrorImdbUrl: false,
  };

  changeHandler = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      isErrorImgUrl: false,
      isErrorImdbUrl: false,
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    let isError = false;

    if (!pattern.test(imgUrl)) {
      isError = true;

      this.setState({
        isErrorImgUrl: true,
      });
    }

    if (!pattern.test(imdbUrl)) {
      isError = true;

      this.setState({
        isErrorImdbUrl: true,
      });
    }

    if (!isError) {
      this.props.addMovie({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
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
      isErrorImgUrl,
      isErrorImdbUrl,
    } = this.state;

    return (
      <>
        <h1 className="movie__header">Add Your Movie</h1>
        <form onSubmit={this.submitHandler} className="form">
          <label htmlFor="title">
            Title:
            <input
              name="title"
              onChange={this.changeHandler}
              value={title}
              className="form__input"
              id="title"
              type="text"
              placeholder="movie title"
              required
            />
          </label>
          <label htmlFor="description">
            Description:
            <textarea
              name="description"
              onChange={this.changeHandler}
              value={description}
              rows="5"
              cols="40"
              className="form__input"
              id="description"
              type="text"
              placeholder="describe your movie"
            />
          </label>
          <label htmlFor="imgUrl">
            Image Url:
            <input
              name="imgUrl"
              onChange={this.changeHandler}
              value={imgUrl}
              className="form__input form__input--url"
              id="imgUrl"
              type="text"
              placeholder="put movie image url"
              required
            />
          </label>
          {isErrorImgUrl
              && (
                <div className="form__error">
                  Put correct URL
                </div>
              )}
          <label htmlFor="imdbUrl">
            IMDB Url:
            <input
              name="imdbUrl"
              onChange={this.changeHandler}
              value={imdbUrl}
              className="form__input form__input--url"
              id="imdbUrl"
              type="text"
              placeholder="put imdb id url"
              required
            />
          </label>
          {isErrorImdbUrl
              && (
                <div className="form__error">
                  Put correct URL
                </div>
              )}
          <label htmlFor="imdbId">
            IMDB Id:
            <input
              name="imdbId"
              onChange={this.changeHandler}
              value={imdbId}
              className="form__input"
              id="imdbId"
              type="text"
              placeholder="put imdb id"
              required
            />
          </label>
          <button className="form__button" type="submit">Add Movie</button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

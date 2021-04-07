import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NewMovie.scss';

// eslint-disable-next-line
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    titleValue: '',
    descriptionValue: '',
    imgUrlValue: '',
    imdbUrlValue: '',
    imdbIdValue: '',
    isValidImgUrl: true,
    isValidImdbUrl: true,
  };

  checkValidImgUrl = () => {
    this.setState(state => ({
      isValidImgUrl: regex.test(state.imgUrlValue),
    }));
  }

  checkValidIMDB = () => {
    this.setState(state => ({
      isValidImdbUrl: regex.test(state.imdbUrlValue),
    }));
  }

  createNewMoviePost = () => {
    const {
      titleValue,
      descriptionValue,
      imgUrlValue,
      imdbUrlValue,
      imdbIdValue,
    } = this.state;
    const newMovie = {
      title: titleValue,
      description: descriptionValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdValue,
    };

    this.props.addMovie(newMovie);
    this.setState({
      titleValue: '',
      descriptionValue: '',
      imgUrlValue: '',
      imdbUrlValue: '',
      imdbIdValue: '',
      isValidImgUrl: false,
      isValidImdbUrl: false,
    });
  }

  render() {
    const {
      titleValue,
      descriptionValue,
      imgUrlValue,
      imdbUrlValue,
      imdbIdValue,
      isValidImgUrl,
      isValidImdbUrl,
    } = this.state;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.createNewMoviePost();
        }}
        className="form"
        autoComplete="off"
      >

        <label className="label" htmlFor="title">Title</label>
        <input
          onChange={(event) => {
            this.setState({
              titleValue: event.target.value,
            });
          }}
          value={titleValue}
          className="input"
          id="title"
          required
        />

        <label className="label" htmlFor="description">Description</label>
        <input
          onChange={(event) => {
            this.setState({
              descriptionValue: event.target.value,
            });
          }}
          value={descriptionValue}
          className="input"
          id="description"
        />

        <label className="label" htmlFor="img-url">Image URL</label>
        <input
          onChange={(event) => {
            this.setState({
              imgUrlValue: event.target.value,
            });
            this.checkValidImgUrl();
          }}
          value={imgUrlValue}
          className={
            classNames('input', { input__invalid: !isValidImgUrl })
          }
          id="img-url"
          required
        />
        {
          !isValidImgUrl
          && <span className="tag is-warning">Input valid image url</span>
        }

        <label className="label" htmlFor="imdb-url">IMDB URL</label>
        <input
          onChange={(event) => {
            this.setState({
              imdbUrlValue: event.target.value,
            });
            this.checkValidIMDB();
          }}
          value={imdbUrlValue}
          className={
            classNames('input', { input__invalid: !isValidImdbUrl })
          }
          id="imdb-url"
          required
        />
        {
          !isValidImdbUrl
          && <span className="tag is-warning">Input valid IMDB url</span>
        }

        <label className="label" htmlFor="imdb-id">IMDB id</label>
        <input
          onChange={(event) => {
            this.setState({
              imdbIdValue: event.target.value,
            });
          }}
          value={imdbIdValue}
          className="input"
          id="imdb-id"
          required
        />

        <button
          disabled={!isValidImgUrl || !isValidImdbUrl}
          type="submit"
          className="button is-link"
        >
          Submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

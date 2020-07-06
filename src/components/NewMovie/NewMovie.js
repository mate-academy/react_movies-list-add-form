import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imdbUrl: '',
    imdbId: '',
    imgUrl: '',
    error: {
      title: '',
      imdbUrl: '',
      imdbId: '',
      imgUrl: '',
    },
  };

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      [name]: value,
      error: {
        ...prevState.error,
        [name]: false,
      },
    }));
  };

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    const {
      addMovie,
    } = this.props;

    // eslint-disable-next-line max-len
    const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (
      title
      && description
      && (imgUrl && urlPattern.test(imgUrl))
      && (imdbUrl && urlPattern.test(imdbUrl))
      && imdbId
    ) {
      addMovie({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
      this.clearForm();
    }

    this.setState({
      error: {
        title: !title,
        imdbId: !imdbId,
        imdbUrl: !(imdbUrl === '') || !urlPattern.test(imdbUrl),
        imgUrl: !(imgUrl === '') || !urlPattern.test(imgUrl),
      },
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      error,
    } = this.state;

    return (
      <form className="NewMovie" onSubmit={this.onSubmit}>
        <div className="NewMovie__field">
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.onChange}
            placeholder="Movie title"
            className={error.title
              ? 'NewMovie__input NewMovie__input--invalid'
              : 'NewMovie__input'}
          />
          {error.title && (
            <span className="NewMovie__error">
              Please add movie title.
            </span>
          )}
        </div>
        <div className="NewMovie__field">
          <input
            type="text"
            name="description"
            value={description}
            onChange={this.onChange}
            placeholder="Movie description"
            className="NewMovie__input"
          />
        </div>
        <div className="NewMovie__field">
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.onChange}
            placeholder="Image link"
            className={error.imgUrl
              ? 'NewMovie__input NewMovie__input--invalid'
              : 'NewMovie__input'}
          />
          {error.imgUrl && (
            <span className="NewMovie__error">
              Please add correct link to image.
            </span>
          )}
        </div>
        <div className="NewMovie__field">
          <input
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.onChange}
            placeholder="IMDB link"
            className={error.imdbUrl
              ? 'NewMovie__input NewMovie__input--invalid'
              : 'NewMovie__input'}
          />
          {error.imdbUrl && (
            <span className="NewMovie__error">
              Please add correct link to IMDB.
            </span>
          )}
        </div>
        <div className="NewMovie__field">
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.onChange}
            placeholder="IMDB ID"
            className={error.imdbId
              ? 'NewMovie__input NewMovie__input--invalid'
              : 'NewMovie__input'}
          />
          {error.imdbId && (
            <span className="NewMovie__error">
              Please add IMDB Id.
            </span>
          )}
        </div>
        <button
          type="submit"
          className="NewMovie__button"
          disabled={!title
            || (!imgUrl || error.imgUrl)
            || (!imdbUrl || error.imdbUrl)
            || !imdbId}
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

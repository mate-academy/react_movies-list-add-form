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
    isInvalidImgUrl: false,
    isInvalidImdbUrl: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      isInvalidImgUrl: false,
      isInvalidImdbUrl: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    /* eslint-disable-next-line max-len */
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    let newMovie = {};

    if (!pattern.test(imgUrl)) {
      this.setState({
        isInvalidImgUrl: true,
      });
    } else if (!pattern.test(imdbUrl)) {
      this.setState({
        isInvalidImdbUrl: true,
      });
    } else {
      newMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      this.props.onAdd(newMovie);

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isInvalidImgUrl,
      isInvalidImdbUrl } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label
          className="newmovie__label"
          htmlFor="title"
        >
          Title
        </label>
        <input
          onChange={this.handleChange}
          className="input newmovie__input"
          id="title"
          name="title"
          value={title}
          required
        />
        <label
          className="newmovie__label"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          onChange={this.handleChange}
          className="textarea newmovie__input"
          id="description"
          name="description"
          value={description}
        />
        <label
          className="newmovie__label"
          htmlFor="imgUrl"
        >
          Img Url
        </label>
        <input
          onChange={this.handleChange}
          className="input newmovie__input"
          id="imgUrl"
          name="imgUrl"
          value={imgUrl}
          required
        />
        {isInvalidImgUrl
          && (
            <p className="newmovie__error-url">
              Please, enter a valid URL
            </p>
          )}
        <label
          className="newmovie__label"
          htmlFor="imdbUrl"
        >
          Imdb Url
        </label>
        <input
          onChange={this.handleChange}
          className="input newmovie__input"
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          required
        />
        {isInvalidImdbUrl
          && (
            <p className="newmovie__error-url">
              Please, enter a valid URL
            </p>
          )}
        <label
          className="newmovie__label"
          htmlFor="imdbId"
        >
          Imdb Id
        </label>
        <input
          onChange={this.handleChange}
          className="input newmovie__input"
          id="imdbId"
          name="imdbId"
          value={imdbId}
          required
        />
        <button
          className="button newmovie__button"
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

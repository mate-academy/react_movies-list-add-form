import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    checkTitle: false,
    checkImgUrl: false,
    checkImdbUrl: false,
    checkImdbId: false,
    isButtonDisabled: true,
  };

  setTitle = (e) => {
    this.setState({
      title: e.target.value,
      checkTitle: false,
    });
  };

  setDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  setImgUrl = (e) => {
    this.setState({
      imgUrl: e.target.value,
    });
  };

  setImdbUrl = (e) => {
    this.setState({
      imdbUrl: e.target.value,

    });
  };

  setImdbId = (e) => {
    this.setState({
      imdbId: e.target.value,
    });
  };

  handleActiveButton = () => {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    if (title.trim().length > 0
      && description.trim().length > 0
      && imgUrl.trim().length > 0
      && imdbUrl.trim().length > 0
      && imdbId.trim().length > 0
    ) {
      this.setState({ isButtonDisabled: false });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState((state) => {
      const {
        title, description, imgUrl, imdbUrl, imdbId,
      } = state;
      const { addMovie, validation } = this.props;

      if (title.length === 0 || title.trim() === '') {
        return { checkTitle: true };
      }

      if (!validation.test(imgUrl)) {
        return { checkImgUrl: true };
      }

      if (!validation.test(imdbUrl)) {
        return { checkImdbUrl: true };
      }

      if (imdbId.length === 0 || imdbId.trim() === '') {
        return { checkImdbId: true };
      }

      addMovie({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      return {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        checkTitle: false,
        checkImgUrl: false,
        checkImdbUrl: false,
        checkImdbId: false,
      };
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId, checkTitle,
      checkImgUrl, checkImdbUrl, checkImdbId, isButtonDisabled } = this.state;

    return (
      <>
        <form
          className="form"
          onSubmit={this.handleSubmit}
          onChange={this.handleActiveButton}
        >
          <h2 className="form__heading">Add Movie Form</h2>
          <label>
            <input
              type="text"
              className={checkTitle
                ? 'form__item form__error'
                : 'form__item'}
              placeholder="Enter a title..."
              onChange={this.setTitle}
              value={title}
              required
            />
          </label>
          <label>
            <textarea
              className="form__item form__description"
              placeholder="Write description here..."
              onChange={this.setDescription}
              value={description}
            />
          </label>
          <label>
            <input
              type="text"
              className={checkImgUrl
                ? 'form__item form__error'
                : 'form__item'}
              placeholder="Enter a Image URL..."
              onChange={this.setImgUrl}
              value={imgUrl}
            />
          </label>
          {checkImgUrl
          && (
            <span className="form__error-span">
              Please, enter a valid URL
            </span>
          )}
          <label>
            <input
              type="text"
              className={checkImdbUrl
                ? 'form__item form__error'
                : 'form__item'}
              placeholder="Enter a Imdb URL..."
              onChange={this.setImdbUrl}
              value={imdbUrl}
            />
          </label>
          {checkImdbUrl
          && (
            <span className="form__error-span">
              Please, enter a valid URL
            </span>
          )}
          <label>
            <input
              type="text"
              className={checkImdbId
                ? 'form__item form__error'
                : 'form__item'}
              placeholder="Enter a Imdb ID..."
              onChange={this.setImdbId}
              value={imdbId}
            />
          </label>
          <button
            type="submit"
            className="form__button"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
  validation: PropTypes.instanceOf(RegExp).isRequired,
};

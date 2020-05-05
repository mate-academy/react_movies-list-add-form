import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

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
      const { addMovie } = this.props;

      addMovie({
        title, description, imgUrl, imdbUrl, imdbId,
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

  onBlur = ({ target }) => {
    const {
      title, imgUrl, imdbUrl, imdbId,
    } = this.state;

    const { validation } = this.props;

    if (target.id === 'title') {
      if (title.length === 0 || title.trim() === '') {
        this.setState({ checkTitle: true });
      }
    }

    if (target.id === 'imgUrl') {
      if (!validation.test(imgUrl)) {
        this.setState({ checkImgUrl: true });
      }
    }

    if (target.id === 'imdbUrl') {
      if (!validation.test(imdbUrl)) {
        this.setState({ checkImdbUrl: true });
      }
    }

    if (target.id === 'imdbId') {
      if (imdbId.length === 0 || imdbId.trim() === '') {
        this.setState({ checkImdbId: true });
      }
    }

    // target.style.backgroundColor = 'rgba(246, 71, 71, 0.4)';
  };

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      checkTitle,
      checkImgUrl,
      checkImdbUrl,
      checkImdbId,
      isButtonDisabled } = this.state;

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
              id="title"
              type="text"
              className={classNames({
                form__item: true,
                form__error: checkTitle,
              })}
              placeholder="Enter a title..."
              onChange={this.handleInputChange}
              onBlur={this.onBlur}
              name="title"
              value={title}
              required
            />
          </label>
          {checkTitle
          && (
            <span className="form__error-span">
              Please, enter a title
            </span>
          )}
          <label>
            <textarea
              id="description"
              className="form__item form__description"
              placeholder="Write description here..."
              onChange={this.handleInputChange}
              onBlur={this.onBlur}
              name="description"
              value={description}
            />
          </label>
          <label>
            <input
              id="imgUrl"
              type="text"
              className={classNames({
                form__item: true,
                form__error: checkImgUrl,
              })}
              placeholder="Enter a Image URL..."
              onChange={this.handleInputChange}
              onBlur={this.onBlur}
              name="imgUrl"
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
              id="imdbUrl"
              type="text"
              className={classNames({
                form__item: true,
                form__error: checkImdbUrl,
              })}
              placeholder="Enter a Imdb URL..."
              onChange={this.handleInputChange}
              onBlur={this.onBlur}
              name="imdbUrl"
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
              id="imdbId"
              type="text"
              className={classNames({
                form__item: true,
                form__error: checkImdbId,
              })}
              placeholder="Enter a Imdb ID..."
              onChange={this.handleInputChange}
              onBlur={this.onBlur}
              name="imdbId"
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

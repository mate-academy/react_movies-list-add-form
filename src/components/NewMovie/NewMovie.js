import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },

    isValid: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },

    wasClicked: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },

    errorMessageRequiredIsHidden: {
      title: true,
      imgUrl: true,
      imdbUrl: true,
      imdbId: true,
    },

    errorMessageUnvalidIsHidden: {
      imgUrl: true,
      imdbUrl: true,
    },

    /* eslint-disable */
    validUrl: /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/,
    /* eslint-enable */
    unvalidInputsCount: 4,
  };

  onAddMovie = (event) => {
    event.preventDefault();
    this.props.addMovie(this.state.newMovie);
    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      wasClicked: {
        title: false,
        description: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      },
      isValid: {
        title: false,
        description: true,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      },
      unvalidInputsCount: 4,
    });
  }

  clicked = (event) => {
    const { name } = event.target;

    this.setState(state => ({
      wasClicked: {
        ...state.wasClicked,
        [name]: true,
      },
    }));
  }

  validation = (event) => {
    const { isValid } = this.state;
    const { name, value } = event.target;

    if (name !== 'description') {
      if (value.length > 0) {
        if (name === 'title' || name === 'imdbId') {
          if (isValid[name] !== true) {
            this.setState(state => ({
              unvalidInputsCount: state.unvalidInputsCount - 1,
            }));
          }
        }

        this.setState(state => ({
          isValid: {
            ...state.isValid,
            [name]: true,
          },
          errorMessageRequiredIsHidden: {
            ...state.errorMessageRequiredIsHidden,
            [name]: true,
          },
        }));
      } else {
        if (isValid[name] !== false) {
          this.setState(state => ({
            unvalidInputsCount: state.unvalidInputsCount + 1,
          }));
        }

        this.setState(state => ({
          isValid: {
            ...state.isValid,
            [name]: false,
          },
          errorMessageRequiredIsHidden: {
            ...state.errorMessageRequiredIsHidden,
            [name]: false,
          },
        }));
      }
    }

    if (name === 'imdbUrl' || name === 'imgUrl') {
      if (!this.state.validUrl.test(value) && value.length > 0) {
        if (isValid[name] !== false) {
          this.setState(state => ({
            unvalidInputsCount: state.unvalidInputsCount + 1,
          }));
        }

        this.setState(state => ({
          isValid: {
            ...state.isValid,
            [name]: false,
          },
          errorMessageUnvalidIsHidden: {
            ...state.errorMessageUnvalidIsHidden,
            [name]: false,
          },
        }));
      } else if (this.state.validUrl.test(value)) {
        if (isValid[name] !== true) {
          this.setState(state => ({
            unvalidInputsCount: state.unvalidInputsCount - 1,
          }));
        }

        this.setState(state => ({
          isValid: {
            ...state.isValid,
            [name]: true,
          },
          errorMessageUnvalidIsHidden: {
            ...state.errorMessageUnvalidIsHidden,
            [name]: true,
          },
        }));
      }
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
      errorMessageRequiredIsHidden: {
        ...state.errorMessageRequiredIsHidden,
        [name]: true,
      },
      errorMessageUnvalidIsHidden: {
        ...state.errorMessageUnvalidIsHidden,
        [name]: true,
      },
    }));
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    const {
      isValid,
      wasClicked,
      errorMessageRequiredIsHidden,
      errorMessageUnvalidIsHidden,
      unvalidInputsCount,
    } = this.state;

    return (
      <form
        className="new-movie-form"
        onSubmit={
          this.onAddMovie
        }
      >
        <div
          className="new-movie-form__part-of-form
            part-of-form part-of-form--title"
        >
          Title:
          <input
            className={
              `part-of-form__input ${(!isValid.title
                  && wasClicked.title)
                    && 'unvalid'}
                ${(isValid.title
                  && wasClicked.title)
                    && 'valid'}`
            }
            value={title}
            type="text"
            name="title"
            onChange={
              this.handleChange
            }
            onClick={
              this.clicked
            }
            onBlur={
              this.validation
            }
          />
          <p
            className={`error-message--required
              ${(errorMessageRequiredIsHidden.title
                || !wasClicked.title)
                  && 'hidden'}`}
          >
            Title is required
          </p>
        </div>

        <div
          className="new-movie-form__part-of-form part-of-form
          part-of-form--description"
        >
          Description:
          <textarea
            className={
              `part-of-form__textarea
                ${wasClicked.description
                  && 'valid'}`
            }
            value={description}
            name="description"
            onChange={this.handleChange}
            onClick={
              this.clicked
            }
          />
        </div>

        <div
          className="new-movie-form__part-of-form
            part-of-form part-of-form--imgUrl"
        >
          imgUrl:
          <input
            className={
              `part-of-form__input ${(!isValid.imgUrl
                && wasClicked.imgUrl)
                  && 'unvalid'}
              ${(isValid.imgUrl
                && wasClicked.imgUrl)
                  && 'valid'}`
            }
            value={imgUrl}
            type="text"
            name="imgUrl"
            onChange={
              this.handleChange
            }
            onClick={
              this.clicked
            }
            onBlur={
              this.validation
            }
          />
          <p
            className={`error-message--required
              ${(errorMessageRequiredIsHidden.imgUrl
                || !wasClicked.imgUrl)
                  && 'hidden'}`}
          >
            imgUrl is required
          </p>
          <p
            className={`error-message--required
              ${(errorMessageUnvalidIsHidden.imgUrl
                || !wasClicked.imgUrl)
                  && 'hidden'}`}
          >
            imgUrl is unvalid
          </p>
        </div>

        <div
          className="new-movie-form__part-of-form
            part-of-form part-of-form--imdbUrl"
        >
          imdbUrl:
          <input
            className={
              `part-of-form__input ${(!isValid.imdbUrl
                  && wasClicked.imdbUrl)
                    && 'unvalid'}
                ${(isValid.imdbUrl
                  && wasClicked.imdbUrl)
                    && 'valid'}`
            }
            value={imdbUrl}
            type="text"
            name="imdbUrl"
            onChange={
              this.handleChange
            }
            onClick={
              this.clicked
            }
            onBlur={
              this.validation
            }
          />
          <p
            className={`error-message--required
              ${(errorMessageRequiredIsHidden.imdbUrl
                || !wasClicked.imdbUrl)
                  && 'hidden'}`}
          >
            imdbUrl is required
          </p>
          <p
            className={`error-message--required
              ${(errorMessageUnvalidIsHidden.imdbUrl
                || !wasClicked.imdbUrl)
                  && 'hidden'}`}
          >
            imdbUrl is unvalid
          </p>
        </div>

        <div
          className="new-movie-form__part-of-form
            part-of-form part-of-form--imdbId"
        >
          imdbId:
          <input
            className={
              `part-of-form__input ${(!isValid.imdbId
                && wasClicked.imdbId)
                  && 'unvalid'}
              ${(isValid.imdbId
                && wasClicked.imdbId)
                  && 'valid'}`
            }
            value={imdbId}
            type="text"
            name="imdbId"
            onChange={
              this.handleChange
            }
            onClick={
              this.clicked
            }
            onBlur={
              this.validation
            }
          />
          <p className={`error-message--required
            ${(errorMessageRequiredIsHidden.imdbId
              || !wasClicked.imdbId)
                && 'hidden'}`}
          >
            imdbId is required
          </p>
        </div>

        <button
          disabled={unvalidInputsCount}
          className="new-movie-form__add-button"
          type="submit"
        >
          Add a film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

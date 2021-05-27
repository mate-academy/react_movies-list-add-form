import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NewMovie.scss';

// eslint-disable-next-line
const urlChecking = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends PureComponent {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    validation: {
      titleError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbIdError: false,
    },
    urlValidation: {
      imgUrlError: false,
      imdbUrlError: false,
    },
  };

  handleValue = (event) => {
    const { name, value } = event.target;

    if ((name === 'imgUrl' || name === 'imdbUrl') && value === '') {
      return this.setState(state => ({
        [name]: value,
        validation: {
          ...state.validation,
          [`${name}Error`]: false,
        },
        urlValidation: {
          ...state.urlValidation,
          [`${name}Error`]: false,
        },
      }));
    }

    if (name === 'imgUrl' || name === 'imdbUrl') {
      return this.setState(state => ({
        [name]: value,
        validation: {
          ...state.validation,
          [`${name}Error`]: false,
        },
        urlValidation: {
          ...state.urlValidation,
          [`${name}Error`]: !value.match(urlChecking),
        },
      }));
    }

    return this.setState(state => ({
      [name]: value,
      validation: {
        ...state.validation,
        [`${name}Error`]: false,
      },
    }));
  };

  handleSubmit = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return this.setState({
        validation: {
          titleError: !title,
          imgUrlError: !imgUrl,
          imdbUrlError: !imdbUrl,
          imdbIdError: !imdbId,
        },
      });
    }

    const isImgUrlValid = !!imgUrl.match(urlChecking);
    const isImdbUrl = !!imdbUrl.match(urlChecking);

    if (!isImgUrlValid || !isImdbUrl) {
      return this.setState({
        urlValidation: {
          imgUrlError: !isImgUrlValid,
          imdbUrlError: !isImdbUrl,
        },
      });
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);

    return this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      validation: {
        titleError: false,
        imgUrlError: false,
        imdbUrlError: false,
        imdbIdError: false,
      },
      urlValidation: {
        imgUrlError: false,
        imdbUrlError: false,
      },
    });
  }

  checkingError = parameter => this.state.validation[`${parameter}Error`];

  checkingUrlError = parameter => this.state.urlValidation[`${parameter}Error`];

  findSomeError = () => (
    Object.values(this.state.validation).some(error => error)
  );

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.handleSubmit();
        }}
      >
        <div className="form__input-wrapper">
          <input
            className={classNames(
              'form__input',
              { form__input_invalid: this.checkingError('title') },
            )}
            type="text"
            name="title"
            placeholder="Title of Movie"
            value={title}
            onChange={(event) => {
              this.handleValue(event);
            }}
          />
          {this.checkingError('title') && (
            <span className="form__error">
              Enter a title
            </span>
          )}
        </div>

        <div className="form__input-wrapper">
          <input
            className={classNames(
              'form__input',
              { form__input_invalid:
                  this.checkingError('imgUrl')
                  || this.checkingUrlError('imgUrl') },
            )}
            type="text"
            name="imgUrl"
            placeholder="Image URL"
            value={imgUrl}
            onChange={(event) => {
              this.handleValue(event);
            }}
          />
          {this.checkingError('imgUrl') && (
            <span className="form__error">
              Enter an image URL
            </span>
          )}
          {this.checkingUrlError('imgUrl') && (
            <span className="form__error">
              Enter a valid image URL
            </span>
          )}
        </div>

        <div className="form__input-wrapper">
          <input
            className={classNames(
              'form__input',
              { form__input_invalid:
                  this.checkingError('imdbUrl')
                  || this.checkingUrlError('imdbUrl') },
            )}
            type="text"
            name="imdbUrl"
            placeholder="IMDb URL"
            value={imdbUrl}
            onChange={(event) => {
              this.handleValue(event);
            }}
          />
          {this.checkingError('imdbUrl') && (
            <span className="form__error">
              Enter an IMDb URL
            </span>
          )}
          {this.checkingUrlError('imdbUrl') && (
            <span className="form__error">
              Enter a valid IMDb URL
            </span>
          )}
        </div>

        <div className="form__input-wrapper">
          <input
            className={classNames(
              'form__input',
              { form__input_invalid: this.checkingError('imdbId') },
            )}
            type="text"
            name="imdbId"
            placeholder="IMDb ID"
            value={imdbId}
            onChange={(event) => {
              this.handleValue(event);
            }}
          />
          {this.checkingError('imdbId') && (
            <span className="form__error">
              Enter an IMDb ID
            </span>
          )}
        </div>

        <textarea
          className="form__input form__input_textarea"
          rows="6"
          type="text"
          name="description"
          placeholder="Description of movie"
          value={description}
          onChange={(event) => {
            this.handleValue(event);
          }}
        />

        <button
          className="form__button"
          type="submit"
          disabled={this.findSomeError()}
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

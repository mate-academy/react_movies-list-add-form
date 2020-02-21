import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    inputValid: {
      titleInput: false,
      imgUrlInput: false,
      imdbUrlInput: false,
      imdbIdInput: false,
    },
    urlValid: {
      imgUrlValid: false,
      imdbUrlValid: false,
    },
    submitUrlValid: {
      imgUrlSubmit: false,
      imdbUrlSubmit: false,
    },
  };

  validateForm = (event) => {
    const { id } = event.target;
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      inputValid,
      urlValid,
      submitUrlValid,
    } = this.state;
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/g;
    const matches = event.target.value.match(pattern);

    switch (id) {
      case 'title':
        if (!title) {
          this.setState({
            inputValid: {
              titleInput: true,
              imgUrlInput: inputValid.imgUrlInput,
              imdbUrlInput: inputValid.imdbUrlInput,
              imdbIdInput: inputValid.imdbIdInput,
            },
          });
        }

        break;

      case 'imgUrl':
        if (!imgUrl) {
          this.setState({
            inputValid: {
              titleInput: inputValid.titleInput,
              imgUrlInput: true,
              imdbUrlInput: inputValid.imdbUrlInput,
              imdbIdInput: inputValid.imdbIdInput,
            },
          });
        }

        if (!matches && imgUrl) {
          this.setState({
            urlValid: {
              imgUrlValid: true,
              imdbUrlValid: urlValid.imdbUrlValid,
            },
          });
        }

        if (matches) {
          this.setState({
            submitUrlValid: {
              imgUrlSubmit: true,
              imdbUrlSubmit: submitUrlValid.imdbUrlSubmit,
            },
          });
        } else {
          this.setState({
            submitUrlValid: {
              imgUrlSubmit: false,
              imdbUrlSubmit: submitUrlValid.imdbUrlSubmit,
            },
          });
        }

        break;

      case 'imdbUrl':
        if (!imdbUrl) {
          this.setState({
            inputValid: {
              titleInput: inputValid.titleInput,
              imgUrlInput: inputValid.imgUrlInput,
              imdbUrlInput: true,
              imdbIdInput: inputValid.imdbIdInput,
            },
          });
        }

        if (!matches && imdbUrl) {
          this.setState({
            urlValid: {
              imgUrlValid: urlValid.imgUrlValid,
              imdbUrlValid: true,
            },
          });
        }

        if (matches) {
          this.setState({
            submitUrlValid: {
              imgUrlSubmit: submitUrlValid.imgUrlSubmit,
              imdbUrlSubmit: true,
            },
          });
        } else {
          this.setState({
            submitUrlValid: {
              imgUrlSubmit: submitUrlValid.imgUrlSubmit,
              imdbUrlSubmit: false,
            },
          });
        }

        break;

      case 'imdbId':
        if (!imdbId) {
          this.setState({
            inputValid: {
              titleInput: inputValid.titleInput,
              imgUrlInput: inputValid.imgUrlInput,
              imdbUrlInput: inputValid.imdbUrlInput,
              imdbIdInput: true,
            },
          });
        }

        break;

      default:
        break;
    }
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    const { inputValid, urlValid } = this.state;

    switch (id) {
      case 'title':
        this.setState({
          title: value,
          inputValid: {
            titleInput: false,
            imgUrlInput: inputValid.imgUrlInput,
            imdbUrlInput: inputValid.imdbUrlInput,
            imdbIdInput: inputValid.imdbIdInput,
          },
        });
        break;

      case 'description':
        this.setState({
          description: value,
        });
        break;

      case 'imgUrl':
        this.setState({
          imgUrl: value,
          inputValid: {
            titleInput: inputValid.titleInput,
            imgUrlInput: false,
            imdbUrlInput: inputValid.imdbUrlInput,
            imdbIdInput: inputValid.imdbIdInput,
          },
          urlValid: {
            imgUrlValid: false,
            imdbUrlValid: urlValid.imdbUrlValid,
          },
        });
        break;

      case 'imdbUrl':
        this.setState({
          imdbUrl: value,
          inputValid: {
            titleInput: inputValid.titleInput,
            imgUrlInput: inputValid.imgUrlInput,
            imdbUrlInput: false,
            imdbIdInput: inputValid.imdbIdInput,
          },
          urlValid: {
            imgUrlValid: urlValid.imgUrlValid,
            imdbUrlValid: false,
          },
        });
        break;

      case 'imdbId':
        this.setState({
          imdbId: value,
          inputValid: {
            titleInput: inputValid.titleInput,
            imgUrlInput: inputValid.imgUrlInput,
            imdbUrlInput: inputValid.imdbUrlInput,
            imdbIdInput: false,
          },
        });
        break;

      default:
        break;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newMovie = { ...this.state };
    const { addMovie } = this.props;

    addMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl, imdbUrl,
      imdbId,
      urlValid,
      inputValid,
      submitUrlValid,
    } = this.state;
    const urlDisable = Object.values(submitUrlValid).includes(false);
    const disable = title && imdbId && !urlDisable;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label className={cx({
          form__label: true, 'form__not-valid': inputValid.titleInput,
        })}
        >
          <p>Title:</p>
          <input
            className="form__input"
            value={title}
            id="title"
            onChange={this.handleChange}
            onBlur={this.validateForm}
            autoComplete="off"
          />
        </label>
        <label className="form__label">
          <p>Description:</p>
          <textarea
            className="form__textarea"
            value={description}
            id="description"
            onChange={this.handleChange}
            autoComplete="off"
          />
        </label>
        <label className={cx({
          form__label: true,
          'form__not-valid': inputValid.imgUrlInput,
          'form__url-not-valid': urlValid.imgUrlValid,
        })}
        >
          <p>Image Url:</p>
          <input
            className="form__input"
            value={imgUrl}
            id="imgUrl"
            onChange={this.handleChange}
            onBlur={this.validateForm}
            autoComplete="off"
          />
        </label>
        <label className={cx({
          form__label: true,
          'form__not-valid': inputValid.imdbUrlInput,
          'form__url-not-valid': urlValid.imdbUrlValid,
        })}
        >
          <p>IMDb Url:</p>
          <input
            className="form__input"
            value={imdbUrl}
            id="imdbUrl"
            onChange={this.handleChange}
            onBlur={this.validateForm}
            autoComplete="off"
          />
        </label>
        <label className={cx({
          form__label: true, 'form__not-valid': inputValid.imdbIdInput,
        })}
        >
          <p>IMDb id:</p>
          <input
            className="form__input"
            value={imdbId}
            id="imdbId"
            onChange={this.handleChange}
            onBlur={this.validateForm}
            autoComplete="off"
          />
        </label>
        <button disabled={!disable} type="submit" className="form__button">
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

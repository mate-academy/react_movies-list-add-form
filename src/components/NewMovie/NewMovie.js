import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: false,
    descriptionError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value.trim(),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.onAdd({
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
      titleError: false,
      descriptionError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbIdError: false,
    });
  };

  validateField = (e) => {
    const { name, value } = e.target;

    // eslint-disable-next-line max-len
    const linkRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    switch (name) {
      case 'title':
      case 'description':
      case 'imdbId':

        this.setState({
          [`${name}Error`]: !value,
        });
        break;

      case 'imgUrl':
      case 'imdbUrl':
        this.setState({
          [`${name}Error`]: !value.match(linkRegex),
        });
        break;
      default:
        break;
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      descriptionError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    const formInvalid = !title
      || !description
      || !imdbId
      || !imdbUrl
      || !imgUrl;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >

        <div className="field">
          <label
            htmlFor="title"
            className="label"
          >
             Title:
          </label>

          <input
            type="text"
            className={ClassNames('input is-link', {
              'input is-danger': titleError,
            })}
            name="title"
            value={title}
            onChange={this.handleChange}
            onBlur={this.validateField}
          />

          {titleError && (
            <article className="message is-danger">
              <div className="message-header">
                <p>
                  The title must be more than 1 character
                </p>
              </div>
            </article>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="description"
            className="label"
          >
            Description:
          </label>

          <input
            className={ClassNames('input is-link', {
              'input is-danger': descriptionError,
            })}
            name="description"
            value={description}
            onChange={this.handleChange}
            onBlur={this.validateField}
          />
          {descriptionError && (
            <article className="message is-danger">
              <div className="message-header">
                <p className="help is-danger">
                  The description must be more than 1 character
                </p>
              </div>
            </article>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="imgUrl"
            className="label"
          >
            Image url:
          </label>

          <input
            type="text"
            className={ClassNames('input is-link', {
              'input is-danger': imgUrlError,
            })}
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            onBlur={this.validateField}
          />

          {imgUrlError && (
            <article className="message is-danger">
              <div className="message-header">
                <p className="help is-danger">
                  Image url is not valid
                </p>
              </div>
            </article>
          )}
        </div>

        <div className="wrap">
          <label
            htmlFor="imdbUrl"
            className="label"
          >
            IMDb url:
          </label>

          <input
            type="text"
            className={ClassNames('input is-link', {
              'input is-danger': imdbUrlError,
            })}
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            onBlur={this.validateField}
          />

          {imdbUrlError && (
            <article className="message is-danger">
              <div className="message-header">
                <p className="help is-danger">
                  IMDb url is not valid
                </p>
              </div>
            </article>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="imdbId"
            className="label"
          >
            IMDb id:
          </label>

          <input
            type="text"
            className={ClassNames('input is-link', {
              'input is-danger': imdbIdError,
            })}
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            onBlur={this.validateField}
          />

          {imdbIdError && (
            <article className="message is-danger">
              <div className="message-header">
                <p>
                  IMDb id is not valid
                </p>
              </div>
            </article>
          )}
        </div>
        <div className="buttons">
          <button
            type="submit"
            className="button is-link"
            title="Disabled button"
            disabled={formInvalid}
          >
            Add new movie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

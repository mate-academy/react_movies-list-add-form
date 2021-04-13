import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css';

// eslint-disable-next-line max-len
const validUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    hasValidImgUrl: true,
    hasValidImdbUrl: true,
  };

  checkValidityOfImgURl = () => {
    this.setState(state => ({
      hasValidImgUrl: validUrl.test(state.imgUrl),
    }));
  }

  checkValidityOfImdbURl = () => {
    this.setState(state => ({
      hasValidImdbUrl: validUrl.test(state.imdbUrl),
    }));
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);

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
      imgUrl,
      imdbUrl,
      imdbId,
      hasValidImgUrl,
      hasValidImdbUrl,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title" className="label">
          Movie Title
        </label>
        <div className="field">
          <input
            className="input"
            id="title"
            name="title"
            type="text"
            value={title}
            placeholder="Title"
            onChange={this.handleChange}
            required
          />
        </div>

        <label htmlFor="description" className="label">
          Movie Description
        </label>
        <div className="field">
          <textarea
            className="textarea"
            id="description"
            name="description"
            value={description}
            placeholder="Description"
            onChange={this.handleChange}
          />
        </div>

        <label htmlFor="image-url" className="label">
          Image URL
        </label>
        <div className="field">
          <input
            className={classNames('input', {
              'is-danger': !hasValidImgUrl,
            })}
            id="image-url"
            type="text"
            name="imgUrl"
            value={imgUrl}
            placeholder="URL"
            onChange={(event) => {
              this.handleChange(event);
              this.checkValidityOfImgURl();
            }}
            required
          />
        </div>
        <p className={classNames('has-text-danger', {
          'is-invisible': hasValidImgUrl,
        })}
        >
          Enter a valid link
        </p>

        <label htmlFor="imdb-url" className="label">
          IMDB URL
        </label>
        <div className="field">
          <input
            className={classNames('input', {
              'is-danger': !hasValidImdbUrl,
            })}
            id="imdb-url"
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            placeholder="URL"
            onChange={(event) => {
              this.handleChange(event);
              this.checkValidityOfImdbURl();
            }}
            required
          />
        </div>
        <p className={classNames('has-text-danger', {
          'is-invisible': hasValidImdbUrl,
        })}
        >
          Enter a valid link
        </p>

        <label htmlFor="imdb-id" className="label">
          IMDB ID
        </label>
        <div className="field">
          <input
            className="input"
            id="imdb-id"
            type="text"
            name="imdbId"
            value={imdbId}
            placeholder="ID"
            onChange={this.handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="button is-medium"
        >
          Add
        </button>

      </form>
    );
  }
}

NewMovie.propTypes = PropTypes.func.isRequired;

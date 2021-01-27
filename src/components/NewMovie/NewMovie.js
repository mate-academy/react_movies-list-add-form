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
    isValidatedImgUrl: false,
    isValidatedImdbUrl: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleBlur = (event) => {
    const { name, value } = event.target;

    if (name === 'imgUrl') {
      // eslint-disable-next-line max-len
      if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(value)) {
        this.setState({ isValidatedImgUrl: true });

        return;
      }

      this.setState({ isValidatedImgUrl: false });
    }

    if (name === 'imdbUrl') {
      // eslint-disable-next-line max-len
      if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(value)) {
        this.setState({ isValidatedImdbUrl: true });

        return;
      }

      this.setState({ isValidatedImdbUrl: false });
    }

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isValidatedImgUrl,
      isValidatedImdbUrl,
    } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };
    const { onAdd } = this.props;

    event.preventDefault();

    if (!isValidatedImdbUrl && !isValidatedImgUrl) {
      onAdd(newMovie);
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        isValidatedImgUrl: false,
        isValidatedImdbUrl: false,
      });
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isValidatedImgUrl,
      isValidatedImdbUrl,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
        method="POST"
      >
        <div className="form__container">
          <label htmlFor="title">
            Input title
          </label>

          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form__container">
          <label htmlFor="description">
            Input description
          </label>

          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.handleChange}
          />
        </div>

        <div className="form__container">
          <label htmlFor="imgUrl">
            Input imgUrl
          </label>

          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            required
          />
        </div>

        {isValidatedImgUrl && (
          <div className="form__alert">Not correct value</div>
        )}

        <div className="form__container">
          <label htmlFor="imdbUrl">
            Input imdbUrl
          </label>

          <input
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            required
          />
        </div>

        {isValidatedImdbUrl && (
          <div className="form__alert">Not correct value</div>
        )}

        <div className="form__container">
          <label htmlFor="imdbId">
            Input imdbId
          </label>

          <input
            type="text"
            name="imdbId"
            id="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">
            Add movie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

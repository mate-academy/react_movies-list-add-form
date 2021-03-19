import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
    showErrorUrl: false,
  };

  handlerUniversal = (event) => {
    const { name, value } = event.target;
    let isCorrectUrl = true;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      this.setState({ showErrorUrl: false });
      isCorrectUrl = this.test(value);
    }

    if (!isCorrectUrl) {
      this.setState({ showErrorUrl: true });
    }

    this.setState({ [name]: value });
  }

  test = (currentUrl) => {
    // eslint-disable-next-line
    const regularExample = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return regularExample.test(currentUrl);
  }

  handlerSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
    } = this.state;

    const newFilm = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(newFilm);

    this.resetForm();
  }

  resetForm = () => {
    this.setState({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
      showErrorUrl: false,
    });
  }

  render() {
    const {
      title,
      imgUrl,
      newImdbUrl,
      imdbId,
      description,
      showErrorUrl,
    } = this.state;

    return (
      <>
        <h1
          className="form__title"
        >
          Add new film
        </h1>

        {showErrorUrl
        && (
          <div
            className="form__error"
          >
            <h1>Invalid URL!</h1>
            <p>Please write another One.</p>
          </div>
        )
        }

        <form
          className="form"
          onSubmit={this.handlerSubmit}
        >
          <label>
            Title:
            <input
              name="title"
              required
              placeholder="Title"
              value={title}
              onChange={this.handlerUniversal}
            />
          </label>

          <label>
            imgUrl:
            <input
              name="imgUrl"
              placeholder="imgUrl"
              value={imgUrl}
              onChange={this.handlerUniversal}
            />
          </label>

          <label>
            imdbUrl:
            <input
              name="imdbUrl"
              placeholder="imdbUrl"
              value={newImdbUrl}
              onChange={this.handlerUniversal}
            />
          </label>

          <label>
            imdbId:
            <input
              name="imdbId"
              required
              placeholder="imdbId"
              value={imdbId}
              onChange={this.handlerUniversal}
            />
          </label>
          <textarea
            name="description"
            placeholder="Description"
            className="form__text-area"
            value={description}
            onChange={this.handlerUniversal}
          />
          <button
            type="submit"
            className="form__button"
          >
            ADD
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

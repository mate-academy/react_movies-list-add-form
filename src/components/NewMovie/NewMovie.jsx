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

  ChangeUniversalHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  testUrl = (currentUrl) => {
    // eslint-disable-next-line
    const regularForUrlTest = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return regularForUrlTest.test(currentUrl);
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

    let isCorrectUrls = true;

    const isImgUrlTrue = this.testUrl(imgUrl);
    const isimdbUrlTrue = this.testUrl(imdbUrl);

    isCorrectUrls = isImgUrlTrue && isimdbUrlTrue;

    if (!isCorrectUrls) {
      this.setState({ showErrorUrl: true });

      return;
    }

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
              onChange={this.ChangeUniversalHandler}
            />
          </label>

          <label>
            imgUrl:
            <input
              name="imgUrl"
              placeholder="imgUrl"
              value={imgUrl}
              onChange={this.ChangeUniversalHandler}
            />
          </label>

          <label>
            imdbUrl:
            <input
              name="imdbUrl"
              placeholder="imdbUrl"
              value={newImdbUrl}
              onChange={this.ChangeUniversalHandler}
            />
          </label>

          <label>
            imdbId:
            <input
              name="imdbId"
              required
              placeholder="imdbId"
              value={imdbId}
              onChange={this.ChangeUniversalHandler}
            />
          </label>
          <textarea
            name="description"
            placeholder="Description"
            className="form__text-area"
            value={description}
            onChange={this.ChangeUniversalHandler}
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

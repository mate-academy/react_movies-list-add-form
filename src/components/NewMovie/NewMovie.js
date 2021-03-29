import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import classNames from 'classnames';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    showImdbUrlError: false,
    showImgUrlError: false,
  };

  validationUrl = (url) => {
    // eslint-disable-next-line max-len
    const pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._s+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

    return pattern.test(url);
  }

  createNewMovie = () => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { onAdd } = this.props;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    const isCorrectImgUrl = this.validationUrl(imgUrl);
    const isCorrectImdbUrl = this.validationUrl(imdbUrl);

    if (!isCorrectImdbUrl && !isCorrectImgUrl) {
      this.setState({
        showImdbUrlError: true,
        showImgUrlError: true,
      });

      return;
    }

    if (!isCorrectImdbUrl) {
      this.setState({
        showImdbUrlError: true,
      });

      return;
    }

    if (!isCorrectImgUrl) {
      this.setState({
        showImgUrlError: true,
      });

      return;
    }

    onAdd(newMovie);

    this.setState({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
      showImdbUrlError: false,
      showImgUrlError: false,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      showImdbUrlError,
      showImgUrlError,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.createNewMovie();
        }}
      >

        <div className="title">Add new movie</div>
        <label htmlFor="title">
          <div>Title:</div>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="form__input"
            value={title}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="description">
          <div>Description:</div>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            className="form__input"
            value={description}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imgUrl">
          ImgUrl:&nbsp;
          {showImgUrlError && (
            <span className="error">
              Enter correct img url
            </span>
          )}
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            placeholder="ImgUrl"
            className={classNames(
              'form__input',
              { form__input__error: showImgUrlError },
            )}
            value={imgUrl}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imdbUrl">
          ImdbUrl:&nbsp;
          {showImdbUrlError && (
            <span className="error">
              Enter correct imdb url
            </span>
          )}
          <input
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            placeholder="ImdbUrl"
            className={classNames(
              'form__input',
              { form__input__error: showImdbUrlError },
            )}
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imdbId">
          <div>ImdbId:</div>
          <input
            type="text"
            name="imdbId"
            id="imdbId"
            placeholder="ImdbId"
            className="form__input"
            value={imdbId}
            onChange={this.handleChange}
          />
        </label>

        <div>
          <button
            type="submit"
            className="button"
          >
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

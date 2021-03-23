import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isErrorValidation: false,
  };

  checkValidationUrl = (url) => {
    // eslint-disable-next-line
    const regExp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._s+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

    return regExp.test(url);
  }

  createMovie = () => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { onAdd } = this.props;

    let isCorrectUrl = true;

    const isCorrectImgUrl = this.checkValidationUrl(imgUrl);
    const isCorrectImbdUrl = this.checkValidationUrl(imdbUrl);

    isCorrectUrl = isCorrectImbdUrl && isCorrectImgUrl;

    if (!isCorrectUrl) {
      this.setState({ isErrorValidation: true });

      return;
    }

    const newMovie = {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    };

    onAdd(newMovie);
    this.clearMovie();
  }

  clearMovie = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl, imdbUrl,
      imdbId,
      isErrorValidation,
    } = this.state;

    return (
      <>
        <h1 className="title">
          Add new movie
        </h1>
        {isErrorValidation && (
          <div className="is-error">
            <h1>Please enter corect url</h1>
          </div>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.createMovie();
          }}
        >
          <input
            type="text"
            className="input"
            required
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={this.changeHandler}
          />
          <textarea
            type="text"
            name="description"
            required
            placeholder="Enter description"
            className="input"
            value={description}
            onChange={this.changeHandler}

          />
          <input
            type="text"
            name="imgUrl"
            required
            className="input"
            placeholder="Enter img url"
            value={imgUrl}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="imdbUrl"
            required
            className="input"
            placeholder="Enter imdbUrl"
            value={imdbUrl}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="imdbId"
            required
            className="input"
            placeholder="Enter imdbId"
            value={imdbId}
            onChange={this.changeHandler}
          />
          <button
            className="button"
            type="submit"
          >
            Add film
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

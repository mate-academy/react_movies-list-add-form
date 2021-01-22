import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

// eslint-disable-next-line max-len
const validation = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgUrlError: false,
    imdbUrlError: false,
  };

  textChange = ((event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  })

  handleChange = ((event) => {
    const { name, value } = event.target;

    if (value.search(validation) !== -1) {
      this.setState({
        [name]: value,
        [`${name}Error`]: false,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  })

  hadleSubmit = (event) => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const imageValid = imgUrl.search(validation);
    const imdbValid = imdbUrl.search(validation);

    if (imageValid === -1) {
      this.setState({ imgUrlError: true });
    }

    if (imdbValid === -1) {
      this.setState({ imdbUrlError: true });
    }

    const newMovie = {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    };

    event.preventDefault();

    if (imageValid !== -1 && imdbValid !== -1) {
      this.props.onAdd(newMovie);
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbUrlError,
      imgUrlError } = this.state;

    return (
      <>
        <form
          className="addMovieForm"
          onSubmit={this.hadleSubmit}
        >
          <div className="inputs">
            <input
              type="text"
              placeholder="Enter a title"
              value={title}
              name="title"
              required
              onChange={this.textChange}
            />
            <textarea
              placeholder="Enter a description"
              value={description}
              name="description"
              onChange={this.textChange}
            />

            { imgUrlError
            && (
              <div className="error-message">
                Please enter valid image url
              </div>
            ) }

            <input
              type="text"
              placeholder="Enter a imgUrl"
              required
              value={imgUrl}
              name="imgUrl"
              className={`${imgUrlError && 'error'}`}
              onChange={this.handleChange}
            />

            { imdbUrlError
            && (
              <div className="error-message">
                Please enter valid imdb url
              </div>
            ) }

            <input
              type="text"
              required
              className={`${imdbUrlError && 'error'}`}
              placeholder="Enter a imdbUrl"
              name="imdbUrl"
              value={imdbUrl}
              onChange={this.handleChange}
            />
          </div>
          <button
            className="button"
            type="submit"
            disabled={imgUrlError || imdbUrlError}
          >
            Add
          </button>
        </form>
      </>

    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

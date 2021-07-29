import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: '',
    imgUrlError: '',
    imdbUrlError: '',
    imdbIdError: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      titleError: '',
      imgUrlError: '',
      imdbUrlError: '',
      imdbIdError: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    // eslint-disable-next-line max-len
    const validationInput = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    switch (true) {
      case !title:
        this.setState({
          titleError: 'Please enter correct title',
        });

        return;

      case !validationInput.test(imgUrl):
        this.setState({
          imgUrlError: 'Please enter correct imgUrl',
        });

        return;

      case !validationInput.test(imdbUrl):
        this.setState({
          imdbUrlError: 'Please enter correct imdbUrl',
        });

        return;

      case !validationInput.test(imdbId):
        this.setState({
          imdbIdError: 'Please enter correct imdbId',
        });

        return;
      default:
        break;
    }

    const addNewMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(addNewMovie);

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
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    return (
      <>
        <h1>Add a movie to your collection</h1>
        <form
          onSubmit={this.handleSubmit}
        >
          <div>Title</div>
          <input
            value={title}
            type="text"
            name="title"
            onChange={this.handleChange}
            placeholder="write a title"
          />
          <span>{titleError}</span>

          <div>Description</div>
          <textarea
            value={description}
            name="description"
            onChange={this.handleChange}
            placeholder="write a description"
          />
          <div>imgUrl</div>
          <input
            type="text"
            value={imgUrl}
            name="imgUrl"
            onChange={this.handleChange}
            placeholder="write a imgUrl"
          />

          <span>{imgUrlError}</span>
          <div>imdbUrl</div>
          <input
            value={imdbUrl}
            type="text"
            name="imdbUrl"
            onChange={this.handleChange}
            placeholder="write a imdbUrl"
          />
          <span>{imdbUrlError}</span>
          <div>imdbId</div>
          <input
            value={imdbId}
            type="text"
            name="imdbId"
            onChange={this.handleChange}
            placeholder="write a imdbId"
          />
          <span>{imdbIdError}</span>
          <div />
          <button
            type="submit"
          >
            Add movie
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

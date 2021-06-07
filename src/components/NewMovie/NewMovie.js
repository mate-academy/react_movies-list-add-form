import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    titleError: false,

    description: '',

    imgUrl: '',
    imgUrlError: false,

    imdbUrl: '',
    imdbUrlError: false,

    imdbId: '',
    imdbIdError: false,
  };

  // eslint-disable-next-line
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });

    const {
      title,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return this.setState({
        titleError: !title,
        imgUrlError: !imgUrl,
        imdbUrlError: !imdbUrl,
        imdbIdError: !imdbId,
      });
    }
  };

  movieSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);

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
      titleError,
      description,
      imdbId,
      imdbIdError,
      imdbUrl,
      imdbUrlError,
      imgUrl,
      imgUrlError,
    } = this.state;

    return (
      <form
        className="App__form"
        onSubmit={this.addMovie}
      >
        <input
          type="text"
          placeholder="Enter a title"
          name="title"
          className="App__text"
          value={title}
          onChange={event => this.handleChange(event)}
        />

        {titleError
        && <span className="App__error">Pls enter a title</span>}

        <input
          type="text"
          rows="4"
          placeholder="Enter a description"
          name="description"
          className="App__text"
          value={description}
          onChange={event => this.handleChange(event)}
        />

        {/* {!description
        && <span className="App__error">Pls enter a description</span>} */}

        <input
          type="url"
          placeholder="Enter a imgUrl"
          className="App__text"
          name="imgUrl"
          value={imgUrl}
          onChange={event => this.handleChange(event)}
        />

        {imgUrlError
        && (<span className="App__error">Pls enter a imgUrl</span>)}

        <input
          type="url"
          placeholder="Enter a imdbUrl"
          name="imdbUrl"
          className="App__text"
          value={imdbUrl}
          onChange={event => this.handleChange(event)}
        />

        {imdbUrlError
        && (<span className="App__error">Pls enter a imdbUrl</span>)}

        <input
          type="text"
          placeholder="Enter a imdbId"
          name="imdbId"
          className="App__text"
          value={imdbId}
          onChange={event => this.handleChange(event)}
        />

        {imdbIdError
        && <span className="App__error">Pls enter a imdbId</span>}

        <button
          type="button"
          onClick={this.movieSubmit}
          className="App__button"
        >
          Add a new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

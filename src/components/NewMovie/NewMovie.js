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
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  movieSubmit = (event) => {
    event.preventDefault();

    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;
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
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;

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

        {!title
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

        {!description
        && <span className="App__error">Pls enter a description</span>}

        <input
          type="url"
          placeholder="Enter a imgUrl"
          className="App__text"
          name="imgUrl"
          value={imgUrl}
          onChange={event => this.handleChange(event)}
        />

        {!imgUrl
        && (<span className="App__error">Pls enter a imgUrl</span>)}

        <input
          type="url"
          placeholder="Enter a imdbUrl"
          name="imdbUrl"
          className="App__text"
          value={imdbUrl}
          onChange={event => this.handleChange(event)}
        />

        {!imdbUrl
        && <span className="App__error">Pls enter a imdbUrl</span>}

        <input
          type="text"
          placeholder="Enter a imdbId"
          name="imdbId"
          className="App__text"
          value={imdbId}
          onChange={event => this.handleChange(event)}
        />

        {!imdbId
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

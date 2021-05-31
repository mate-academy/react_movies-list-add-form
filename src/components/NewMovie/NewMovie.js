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

  addEvent = (event, name) => this.setState({ [name]: event.target.value });

  movieSubmit = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state);

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
          onChange={event => this.addEvent(event, 'title')}
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
          onChange={event => this.addEvent(event, 'description')}
        />

        {!description
        && <span className="App__error">Pls enter a description</span>}

        <input
          type="text"
          placeholder="Enter a imgUrl"
          className="App__text"
          name="imgUrl"
          value={imgUrl}
          onChange={event => this.addEvent(event, 'imgUrl')}
        />

        {!imgUrl
        && (<span className="App__error">Pls enter a imgUrl</span>)}

        <input
          type="text"
          placeholder="Enter a imdbUrl"
          name="imdbUrl"
          className="App__text"
          value={imdbUrl}
          onChange={event => this.addEvent(event, 'imdbUrl')}
        />

        {!imdbUrl
        && <span className="App__error">Pls enter a imdbUrl</span>}

        <input
          type="text"
          placeholder="Enter a imdbId"
          name="imdbId"
          className="App__text"
          value={imdbId}
          onChange={event => this.addEvent(event, 'imdbId')}
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

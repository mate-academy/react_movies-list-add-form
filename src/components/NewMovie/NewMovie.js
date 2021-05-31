import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  inputHandler = (event) => {
    const { name, value } = event.target;

    this.setState(state => (
      {
        newMovie: {
          ...state.newMovie, [name]: value,
        },
      }
    ));
  }

  addHandler = (event) => {
    event.preventDefault();
    this.props.addMovie(this.state.newMovie);
    this.setState({ newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    } });
  }

  render() {
    const { inputHandler, addHandler } = this;
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state.newMovie;

    return (
      <form>
        <div>
          <label>
            <input
              placeholder="Movie title"
              name="title"
              value={title}
              onChange={inputHandler}
            />
            Title
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Movie description"
              name="description"
              value={description}
              onChange={inputHandler}
            />
            Description
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Movie image link"
              name="imgUrl"
              value={imgUrl}
              onChange={inputHandler}
            />
            Image
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Movie imdb link"
              name="imdbUrl"
              value={imdbUrl}
              onChange={inputHandler}
            />
            IMDB
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Movie imdb id"
              name="imdbId"
              value={imdbId}
              onChange={inputHandler}
            />
            IMDB ID
          </label>
        </div>
        <button
          type="submit"
          onClick={event => addHandler(event)}
          onChange={inputHandler}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

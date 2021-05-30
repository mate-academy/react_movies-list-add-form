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
    return (
      <form>
        <div>
          <label>
            <input
              name="title"
              value={this.state.newMovie.title}
              onChange={this.inputHandler}
            />
            Title
          </label>
        </div>
        <div>
          <label>
            <input
              name="description"
              value={this.state.newMovie.description}
              onChange={this.inputHandler}
            />
            Description
          </label>
        </div>
        <div>
          <label>
            <input
              name="imgUrl"
              value={this.state.newMovie.imgUrl}
              onChange={this.inputHandler}
            />
            Image
          </label>
        </div>
        <div>
          <label>
            <input
              name="imdbUrl"
              value={this.state.newMovie.imdbUrl}
              onChange={this.inputHandler}
            />
            IMDB
          </label>
        </div>
        <div>
          <label>
            <input
              name="imdbId"
              value={this.state.newMovie.imdbId}
              onChange={this.inputHandler}
            />
            IMDB ID
          </label>
        </div>
        <button
          type="submit"
          onClick={event => this.addHandler(event)}
          onChange={this.inputHandler}
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

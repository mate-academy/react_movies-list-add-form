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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => (
      {
        newMovie: {
          ...state.newMovie,
          [name]: value,
        },
      }
    ));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addMovie(this.state.newMovie);

    this.setState({
      newMovie: {
        title: '',
        description: '',
        imdbId: '',
        imdbUrl: '',
        imgUrl: '',
      },
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state.newMovie;

    return (
      <form
        onSubmit={event => this.handleSubmit(event)}
      >
        <div>
          <input
            placeholder="Movie title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <textarea
            placeholder="Movie description"
            cols="23"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input
            placeholder="Movie image link"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input
            placeholder="Movie imabd link"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input
            placeholder="Movie imdb id"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <button
            type="submit"
          >
            Add movie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

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

  submitHandler = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    this.props.addMovie(newMovie);
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form onSubmit={this.submitHandler}>
        <input
          type="text"
          value={title}
          id="title"
          className="movie-title"
          placeholder="Enter the title"
          required
          onChange={(event) => {
            this.setState({
              title: event.target.value.trimLeft(),
            });
          }}
        />
        <textarea
          id="description"
          value={description}
          className="movie-description"
          placeholder="Enter the description"
          onChange={(event) => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <input
          id="imgUrl"
          value={imgUrl}
          className="movie-imgUrl"
          type="url"
          placeholder="Enter the imgUrl"
          required
          onChange={(event) => {
            this.setState({
              imgUrl: event.target.value,
            });
          }}
        />
        <input
          type="text"
          id="imdbUrl"
          value={imdbUrl}
          className="movie-imdbUrl"
          placeholder="Enter the imdbUrl"
          required
          onChange={(event) => {
            this.setState({
              imdbUrl: event.target.value,
            });
          }}
        />
        <input
          type="text"
          id="imdbId"
          value={imdbId}
          className="movie-imdbId"
          placeholder="Enter the imdbId"
          required
          onChange={(event) => {
            this.setState({
              imdbId: event.target.value,
            });
          }}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

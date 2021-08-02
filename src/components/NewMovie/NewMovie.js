import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    movieTitle: '',
    movieDescription: '',
    movieImgUrl: '',
    movieImdbUrl: '',
    movieImdbId: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      movieTitle,
      movieDescription,
      movieImgUrl,
      movieImdbUrl,
      movieImdbId,
    } = this.state;

    const { onAdd, onCreate } = this.props;

    const newMovie = onCreate(
      movieTitle, movieDescription, movieImgUrl, movieImdbUrl, movieImdbId,
    );

    onAdd(newMovie);

    this.clearForm();
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  clearForm = () => {
    this.setState({
      movieTitle: '',
      movieDescription: '',
      movieImgUrl: '',
      movieImdbUrl: '',
      movieImdbId: '',
    });
  }

  render() {
    const {
      movieTitle,
      movieDescription,
      movieImgUrl,
      movieImdbUrl,
      movieImdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        Title:
        <input
          type="text"
          className="d-block form-control w-50"
          name="movieTitle"
          value={movieTitle}
          onChange={this.handleChange}
        />
        Description:
        <input
          type="text"
          className="d-block form-control w-50"
          name="movieDescription"
          value={movieDescription}
          onChange={this.handleChange}
        />
        imgUrl:
        <input
          type="text"
          className="d-block form-control w-50"
          name="movieImgUrl"
          value={movieImgUrl}
          onChange={this.handleChange}
        />
        imdbUrl:
        <input
          type="text"
          className="d-block form-control w-50"
          name="movieImdbUrl"
          value={movieImdbUrl}
          onChange={this.handleChange}
        />
        imdbId:
        <input
          type="text"
          className="d-block form-control w-50"
          name="movieImdbId"
          value={movieImdbId}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="btn btn-outline-primary mt-2"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

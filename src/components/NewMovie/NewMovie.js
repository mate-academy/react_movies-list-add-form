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

  handleFormSubmit = (event) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    event.preventDefault();

    if (!title) {
      return;
    }

    if (!description) {
      return;
    }

    if (!imgUrl) {
      return;
    }

    if (!imdbUrl) {
      return;
    }

    if (!imdbId) {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAddMovie(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  inputChange = (event) => {
    const { name } = event.target;

    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    return (
      <form
        className="addNewMovieForm"
        onSubmit={this.handleFormSubmit}
      >
        <input
          name="imgUrl"
          className="formImgUrl formDefaultInput"
          placeholder="Poster image url"
          value={this.state.imgUrl}
          onChange={this.inputChange}
        />
        <input
          name="imdbUrl"
          className="formImdbUrl formDefaultInput"
          placeholder="IMDb url"
          value={this.state.imdbUrl}
          onChange={this.inputChange}
        />
        <input
          name="imdbId"
          className="formImdbId formDefaultInput"
          placeholder="IMDb id"
          value={this.state.imdbId}
          onChange={this.inputChange}
        />
        <input
          name="title"
          className="formTitle formDefaultInput"
          placeholder="Enter title"
          value={this.state.title}
          onChange={this.inputChange}
        />
        <input
          name="description"
          className="formDescription"
          placeholder="Enter description"
          value={this.state.description}
          onChange={this.inputChange}
        />
        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
};

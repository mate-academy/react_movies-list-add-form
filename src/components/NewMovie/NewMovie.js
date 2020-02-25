import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';
import { TextField } from '../TextField/TextField';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: '',
    descriptionError: '',
    imgUrlError: '',
    imdbUrlError: '',
    imdbIdError: '',
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
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

    if (title.trim() === '') {
      this.setState({
        titleError: 'Title is required',
      });

      return;
    }

    if (description.trim() === '') {
      this.setState({
        descriptionError: 'Description is required',
      });

      return;
    }

    if (imgUrl.trim() === '') {
      this.setState({
        imgUrlError: 'imgUrl is required',
      });

      return;
    }

    if (imdbUrl.trim() === '') {
      this.setState({
        imdbUrlError: 'imdbUrl is required',
      });

      return;
    }

    if (imdbId.trim() === '') {
      this.setState({
        imdbIdError: 'imdbId is required',
      });

      return;
    }

    this.props.addMovie({
      title, description, imgUrl, imdbUrl, imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      titleError: '',
      descriptionError: '',
      imgUrlError: '',
      imdbUrlError: '',
      imdbIdError: '',
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
      descriptionError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <h1 className="form__heading">Add your movie</h1>
        <TextField
          name="title"
          label="Movie title"
          placeholder="Add new movie title"
          value={title}
          onChange={this.handleInputChange}
          error={titleError}
        />
        <TextField
          name="description"
          label="Movie description"
          placeholder="Add new movie description"
          value={description}
          onChange={this.handleInputChange}
          error={descriptionError}
        />
        <TextField
          name="imgUrl"
          label="Movie imgUrl"
          placeholder="Add new movie imgUrl"
          value={imgUrl}
          onChange={this.handleInputChange}
          error={imgUrlError}
        />
        <TextField
          name="imdbUrl"
          label="Movie imdbUrl"
          placeholder="Add new movie imdbUrl"
          value={imdbUrl}
          onChange={this.handleInputChange}
          error={imdbUrlError}
        />
        <TextField
          name="imdbId"
          label="Movie imdbId"
          placeholder="Add new movie imdbId"
          value={imdbId}
          onChange={this.handleInputChange}
          error={imdbIdError}
        />
        <button
          type="submit"
          className="button is-link"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

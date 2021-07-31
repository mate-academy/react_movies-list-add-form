import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';
import { NewMovieControl } from '../NewMovieControl/NewMovieControl';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleValid: true,
    isImgUrlValid: true,
    isImdbUrlValid: true,
    isImdbIdValid: true,
  };

  handleChange = (event, isValid) => {
    event.preventDefault();

    const { name, value } = event.target;

    if (name === 'description') {
      this.setState({
        [name]: value,
      });

      return;
    }

    this.setState({
      [name]: value,
      [isValid]: true,
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
    const newMovie = {
      title,
      description: description || 'No description',
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  inputValidation = (name, isValid) => {
    // eslint-disable-next-line
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (name === 'description') {
      return;
    }

    if (this.state[name].length === 0) {
      this.setState({ [isValid]: false });

      return;
    }

    if (name === 'imgUrl' || name === 'imdbUrl') {
      if (!pattern.test(this.state[name])) {
        this.setState({ [isValid]: false });
      }
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleValid,
      isImgUrlValid,
      isImdbUrlValid,
      isImdbIdValid,
    } = this.state;

    const {
      handleChange,
      inputValidation,
      handleSubmit,
    } = this;

    return (
      <>
        <form id="addMovie" onSubmit={handleSubmit}>
          <h1 className="form-title">
            Add movie to list
          </h1>
          <NewMovieControl
            value={title}
            name="title"
            title="Title"
            handleChange={handleChange}
            inputValidation={inputValidation}
            validationKey="isTitleValid"
            isValid={isTitleValid}
          />
          <NewMovieControl
            value={description}
            name="description"
            title="Description"
            handleChange={handleChange}
            inputValidation={inputValidation}
            validationKey=""
          />
          <NewMovieControl
            value={imgUrl}
            name="imgUrl"
            title="Image link"
            handleChange={handleChange}
            inputValidation={inputValidation}
            validationKey="isImgUrlValid"
            isValid={isImgUrlValid}
          />
          <NewMovieControl
            value={imdbUrl}
            name="imdbUrl"
            title="IMDB link"
            handleChange={handleChange}
            inputValidation={inputValidation}
            validationKey="isImdbUrlValid"
            isValid={isImdbUrlValid}
          />
          <NewMovieControl
            value={imdbId}
            name="imdbId"
            title="IMDB id"
            handleChange={handleChange}
            inputValidation={inputValidation}
            validationKey="isImdbIdValid"
            isValid={isImdbIdValid}
          />
        </form>
        {title
          && imgUrl
          && imdbUrl
          && imdbId
          && (
          <button
            className="btn btn-primary"
            type="submit"
            form="addMovie"
          >
            Add movie
          </button>
          )
        }
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

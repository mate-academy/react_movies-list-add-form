import React, { Component } from 'react';
import './NewMovie.scss';
import { TextField } from '../TextField/TextField';
import { NewMovieShape } from '../Shape';

export class NewMovie extends Component {
  state = {
    title: [],
    description: [],
    imgUrl: [],
    imdbUrl: [],
    imdbId: [],
    validation: true,
    errors: {
      titleError: false,
      descriptionError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbIdError: false,
    },
  };

  handleInput = (event) => {
    const text = event.target.value;
    const { name } = event.target;

    this.setState(prevState => ({
      [name]: text,
    }));
  }

  handleValidation = (event) => {
    const { value, name } = event.target;
    const errorName = `${name}Error`;
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    let isValid;

    switch (name) {
      case 'title':
        isValid = value.length < 3;
        break;
      case 'description':
        isValid = value.length < 10;
        break;
      case 'imgUrl':
        isValid = !pattern.test(value);
        break;
      case 'imdbUrl':
        isValid = !pattern.test(value);
        break;
      case 'imdbId':
        isValid = !Number(this.state.imdbId);
        break;
      default: isValid = false;
    }

    this.setState(prevState => ({
      validation: Object.values(prevState.errors)
        .every(input => input === false),
    }));

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [errorName]: isValid,
      },
    }));
  }

  handleNewMovie = (event) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.addMovie(newMovie);

    this.setState({
      title: [],
      description: [],
      imgUrl: [],
      imdbUrl: [],
      imdbId: [],
    });

    event.target.reset();
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const {
      titleError,
      imgUrlError,
      descriptionError,
      imdbUrlError,
      imdbIdError,
    } = this.state.errors;

    return (
      <form
        name="newMovie"
        onSubmit={this.handleNewMovie}
      >
        <TextField
          name="title"
          value={title}
          error={titleError}
          onChange={this.handleInput}
          onBlur={this.handleValidation}
        />
        <TextField
          name="description"
          value={description}
          error={descriptionError}
          onChange={this.handleInput}
          onBlur={this.handleValidation}
        />
        <TextField
          name="imgUrl"
          value={imgUrl}
          error={imgUrlError}
          onChange={this.handleInput}
          onBlur={this.handleValidation}
        />
        <TextField
          name="imdbUrl"
          value={imdbUrl}
          error={imdbUrlError}
          onChange={this.handleInput}
          onBlur={this.handleValidation}
        />
        <TextField
          name="imdbId"
          value={imdbId}
          error={imdbIdError}
          onChange={this.handleInput}
          onBlur={this.handleValidation}
        />
        <button
          name="submitButton"
          type="submit"
          disabled={!this.state.validation}
        >
          ADD MOVIE
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = NewMovieShape;

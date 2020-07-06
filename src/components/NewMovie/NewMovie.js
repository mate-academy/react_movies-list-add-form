import React, { Component } from 'react';
import '../InputForm/InputForm.scss';
import './NewMovie.scss';
import { NewMovieTypes } from '../Shapes/Shapes';

import { InputForm } from '../InputForm/InputForm';

export class NewMovie extends Component {
  state = {
    inputs: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      titleError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbIdError: false,
    },
    isValid: true,
  };

  handleInput = (event) => {
    const newTitle = event.target.value;
    const { name } = event.target;

    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: newTitle,
      },
    }));
  }

  handleValidation = (event) => {
    const { value, name } = event.target;
    const errorName = `${name}Error`;

    // eslint-disable-next-line max-len
    const patternUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    let isCorrect;

    switch (name) {
      case 'title':
        isCorrect = value.length < 3;
        break;
      case 'imgUrl':
        isCorrect = !patternUrl.test(value);
        break;
      case 'imdbUrl':
        isCorrect = !patternUrl.test(value);
        break;
      case 'imdbId':
        isCorrect = !Number(this.state.inputs.imdbId);
        break;
      default: isCorrect = false;
    }

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [errorName]: isCorrect,
      },
    }));

    this.setState(prevState => ({
      isValid: Object.values(prevState.errors)
        .every(input => input === false),
    }));
  }

  handleNewMovie = (event) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.inputs.title,
      description: this.state.inputs.description,
      imgUrl: this.state.inputs.imgUrl,
      imdbUrl: this.state.inputs.imdbUrl,
      imdbId: this.state.inputs.imdbId,
    };

    this.props.onAaddMovie(newMovie);

    this.setState({
      inputs: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
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
    } = this.state.inputs;

    const {
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state.errors;

    return (
      <form
        className="form"
        name="newMovie"
        onSubmit={this.handleNewMovie}
      >
        <InputForm
          text="Title"
          name="title"
          value={title}
          error={titleError}
          onChange={this.handleInput}
          onBlur={this.handleValidation}
        />
        <label className="label">
          Description
          <textarea
            className="input textarea"
            name="description"
            value={description}
            onChange={this.handleInput}
            onBlur={this.handleValidation}
            required
          />
        </label>
        <InputForm
          name="imgUrl"
          text="img Url"
          value={imgUrl}
          error={imgUrlError}
          onChange={this.handleInput}
          onBlur={this.handleValidation}
        />
        <InputForm
          text="imdb Url"
          name="imdbUrl"
          value={imdbUrl}
          error={imdbUrlError}
          onChange={this.handleInput}
          onBlur={this.handleValidation}
        />
        <InputForm
          name="imdbId"
          text="imdb Id"
          value={imdbId}
          error={imdbIdError}
          onChange={this.handleInput}
          onBlur={this.handleValidation}
        />
        <button
          name="addNewMovie"
          type="submit"
          disabled={!this.state.isValid}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = NewMovieTypes;

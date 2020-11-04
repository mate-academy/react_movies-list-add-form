import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';

const fields = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const errors = {
  titleError: false,
  descriptionError: false,
  imgUrlError: false,
  imdbUrlError: false,
  imdbIdError: false,
};

export class NewMovie extends Component {
  state = {
    ...fields,
    ...errors,
  };

  addNewMovie = (event) => {
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
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    // eslint-disable-next-line array-callback-return
    Object.entries(newMovie).map((item) => {
      if (item[1] === '') {
        this.setState({
          [`${item[0]}Error`]: true,
        });
      }
    });

    const error = Object.entries(newMovie).some(item => item[1] === '');

    if (error) {
      return;
    }

    this.props.addMovie(newMovie);

    this.setState({
      ...fields,
    });
  }

  inputValue = (event) => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
      [`${event.target.name}Error`]: false,
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
      <form className="ui form" onSubmit={this.addNewMovie}>
        <Input
          inputValue={title}
          inputName="title"
          error={titleError}
          addChange={this.inputValue}
        />

        <Input
          inputValue={description}
          inputName="description"
          error={descriptionError}
          addChange={this.inputValue}
        />

        <Input
          inputValue={imgUrl}
          inputName="imgUrl"
          error={imgUrlError}
          addChange={this.inputValue}
        />

        <Input
          inputValue={imdbUrl}
          inputName="imdbUrl"
          error={imdbUrlError}
          addChange={this.inputValue}
        />

        <Input
          inputValue={imdbId}
          inputName="imdbId"
          error={imdbIdError}
          addChange={this.inputValue}
        />

        <button
          className="ui secondary button"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
}.isRequired;

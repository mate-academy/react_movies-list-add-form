import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';

export class NewMovie extends Component {
  state = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    field: {
      title: {
        isValid: true,
      },
      imgUrl: {
        isValid: true,
      },
      imdbUrl: {
        isValid: true,
      },
      imdbId: {
        isValid: true,
      },
    },
    isButtonDisabled: false,
  };

  onChangeFields = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      movie: {
        ...prevState.movie,
        [name]: value,
      },
    }));
  }

  onAdd = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state.movie);

    event.target.reset();
  };

  fieldValidation = (event) => {
    const { name, value } = event.target;

    // eslint-disable-next-line max-len
    const patternUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    const isValid = (name === 'title' || name === 'imdbId')
      ? Boolean(value)
      : patternUrl.test(value);

    this.setState(prevState => ({
      field: {
        ...prevState.field,
        [name]: {
          isValid,
        },
      },
    }));

    this.setState(prevState => ({
      isButtonDisabled: !Object.values(prevState.field)
        .every(field => field.isValid),
    }));
  }

  render() {
    return (
      <form
        className="form"
        name="movie"
        onSubmit={this.onAdd}
      >
        <Input
          name="title"
          onChange={this.onChangeFields}
          onBlur={this.fieldValidation}
          valid={this.state.field.title.isValid}
        />
        <TextArea
          name="description"
          onChange={this.onChangeFields}
        />
        <Input
          name="imgUrl"
          onChange={this.onChangeFields}
          onBlur={this.fieldValidation}
          valid={this.state.field.imgUrl.isValid}
        />
        <Input
          name="imdbUrl"
          onChange={this.onChangeFields}
          onBlur={this.fieldValidation}
          valid={this.state.field.imdbUrl.isValid}
        />
        <Input
          name="imdbId"
          onChange={this.onChangeFields}
          onBlur={this.fieldValidation}
          valid={this.state.field.imdbId.isValid}
        />
        <button
          disabled={this.state.isButtonDisabled}
          className="btn"
          type="submit"
        >
          AddMovie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

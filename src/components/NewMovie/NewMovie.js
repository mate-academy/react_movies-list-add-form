import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NewMovieInput } from '../NewMovieInput/NewMovieInput';
import { NewMovieTextArea } from '../NewMovieTextArea/NewMovieTextArea';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  titleError: false,
  imgUrlError: false,
  imdbUrlError: false,
  imdbIdError: false,
  isValid: false,
};

// eslint-disable-next-line max-len
const urlValidationRegExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends PureComponent {
  state = initialState

  validateText = (event) => {
    const { name } = event.target;
    const errorKey = `${name}Error`;

    this.setState((state) => {
      if (!state[name].trim()) {
        return ({
          [errorKey]: true,
        });
      }

      return ({
        [errorKey]: false,
      });
    });
  }

  validateUrl = (event) => {
    const { name } = event.target;

    this.setState((state) => {
      if (!state[name].match(urlValidationRegExp)) {
        return ({
          [`${name}Error`]: true,
        });
      }

      return ({
        [`${name}Error`]: false,
      });
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
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
    const { addMovie } = this.props;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(movie);

    this.setState(initialState);
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    const disabled = titleError || imgUrlError || imdbUrlError || imdbIdError
      || !title || !imdbUrl || !imgUrl || !imdbId;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <NewMovieInput
          description="Title"
          title="title"
          isError={titleError}
          value={title}
          handleChange={this.handleChange}
          handleBlur={this.validateText}
        />

        <NewMovieTextArea
          description="Description"
          title="description"
          value={description}
          handleChange={this.handleChange}
        />

        <NewMovieInput
          description="Image link"
          placeholder="Type valid link"
          title="imgUrl"
          isError={imgUrlError}
          value={imgUrl}
          handleChange={this.handleChange}
          handleBlur={this.validateUrl}
        />

        <NewMovieInput
          description="Imdb link"
          placeholder="Type valid link"
          title="imdbUrl"
          isError={imdbUrlError}
          value={imdbUrl}
          handleChange={this.handleChange}
          handleBlur={this.validateUrl}
        />

        <NewMovieInput
          description="Imdb id"
          title="imdbId"
          isError={imdbIdError}
          value={imdbId}
          handleChange={this.handleChange}
          handleBlur={this.validateText}
        />
        <button
          type="submit"
          className="button is-success normal"
          title="Fill all fields"
          disabled={disabled}
        >
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from './TextInput';

export class NewMovie extends PureComponent {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,
  };

  onInputChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  validateTextInput = (e) => {
    const { name } = e.target;

    if (this.state[name]) {
      this.setState({
        [`${name}Error`]: false,
      });
    } else {
      this.setState({
        [`${name}Error`]: true,
      });
    }
  }

  validateUrlInput = (e) => {
    const { name } = e.target;
    // eslint-disable-next-line max-len
    const validUrlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (this.state[name].match(validUrlRegex)) {
      this.setState({
        [`${name}Error`]: false,
      });
    } else {
      this.setState({
        [`${name}Error`]: true,
      });
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { addMovie } = this.props;
    const {
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    if (titleError || imgUrlError || imdbUrlError || imdbIdError) {
      return;
    }

    addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      titleError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbIdError: false,
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
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;
    const {
      onInputChange,
      onFormSubmit,
      validateTextInput,
      validateUrlInput,
    } = this;

    return (
      <form onSubmit={onFormSubmit}>
        <h2 className="h2 text-center mb-5">Add New Movie</h2>

        <TextInput
          name="title"
          value={title}
          label="Movie title"
          placeholder="Title"
          hasError={titleError}
          errorText="Please enter movie Title"
          onChange={onInputChange}
          onBlur={validateTextInput}
        />

        <TextInput
          name="description"
          value={description}
          label="Write short description for movie"
          placeholder="Description"
          onChange={onInputChange}
        />

        <TextInput
          name="imgUrl"
          value={imgUrl}
          label="Add image for movie"
          placeholder="imgUrl"
          hasError={imgUrlError}
          errorText="Please enter valid image Url"
          onChange={onInputChange}
          onBlur={validateUrlInput}
        />

        <TextInput
          name="imdbUrl"
          value={imdbUrl}
          label="Add link of movie page on IMDB"
          placeholder="imdbUrl"
          hasError={imdbUrlError}
          errorText="Please enter valid IMDB link"
          onChange={onInputChange}
          onBlur={validateUrlInput}
        />

        <TextInput
          name="imdbId"
          value={imdbId}
          label="Add movie id on IMDB"
          placeholder="imdbId"
          hasError={imdbIdError}
          errorText="Please enter IMDB id of movie"
          onChange={onInputChange}
          onBlur={validateTextInput}
        />

        <button
          type="submit"
          className="btn btn-success mt-3 float-right"
          disabled={!title || !imgUrl || !imdbUrl || !imdbId}
        >
          Add New Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

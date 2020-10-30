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

function checkUrl(url) {
  // eslint-disable-next-line max-len
  return url.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);
}

function checkValid(input) {
  return Boolean(input.trim());
}

export class NewMovie extends PureComponent {
  state = initialState

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { addMovie } = this.props;
    const titleError = !checkValid(title);
    const imgUrlError = !checkUrl(imgUrl);
    const imdbUrlError = !checkUrl(imdbUrl);
    const imdbIdError = !checkValid(imdbId);

    if (titleError || imgUrlError || imdbUrlError || imdbIdError) {
      this.setState({
        titleError,
        imgUrlError,
        imdbUrlError,
        imdbIdError,
      });

      return;
    }

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
        />

        <NewMovieInput
          description="Imdb link"
          placeholder="Type valid link"
          title="imdbUrl"
          isError={imdbUrlError}
          value={imdbUrl}
          handleChange={this.handleChange}
        />

        <NewMovieInput
          description="Imdb id"
          title="imdbId"
          isError={imdbIdError}
          value={imdbId}
          handleChange={this.handleChange}
        />
        <button
          type="submit"
          className="button is-info"
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

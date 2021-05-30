import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputField } from '../FormComponents/InputField';
import { TextareaField } from '../FormComponents/TextareaField';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',

    titleError: false,
    descriptionError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,
  };

  addInfo = (event) => {
    const name = event.target.getAttribute('name');
    const errorName = `${name}Error`;

    this.setState({
      [name]: event.target.value,
      [errorName]: false,
    });
  };

  formSubmit = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.setState({
      titleError: !title.replace(/\s/g, ''),
      descriptionError: !description.replace(/\s/g, ''),
      imgUrlError: !imgUrl.replace(/\s/g, ''),
      imdbUrlError: !imdbUrl.replace(/\s/g, ''),
      imdbIdError: !imdbId.replace(/\s/g, ''),
    });

    if (!title.replace(/\s/g, '')) {
      return;
    }

    if (!description.replace(/\s/g, '')) {
      return;
    }

    if (!imgUrl.replace(/\s/g, '')) {
      return;
    }

    if (!imdbUrl.replace(/\s/g, '')) {
      return;
    }

    if (!imdbId.replace(/\s/g, '')) {
      return;
    }

    this.props.addMovie(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      titleError,
      descriptionError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form onSubmit={this.formSubmit}>
        <InputField
          value={title}
          placeholder="Enter movie title"
          name="title"
          addInfo={this.addInfo}
          error={titleError}
          errorText="Please enter title"
        />

        <TextareaField
          value={description}
          placeholder="Enter movie description"
          name="description"
          addInfo={this.addInfo}
          error={descriptionError}
          errorText="Please enter description"
        />

        <InputField
          value={imgUrl}
          placeholder="Add movie image link"
          name="imgUrl"
          addInfo={this.addInfo}
          error={imgUrlError}
          errorText="Please add movie image link"
        />

        <InputField
          value={imdbUrl}
          placeholder="Add link to movie"
          name="imdbUrl"
          addInfo={this.addInfo}
          error={imdbUrlError}
          errorText="Please add link to the movie"
        />

        <InputField
          value={imdbId}
          placeholder="Add movie IMDb Id"
          name="imdbId"
          addInfo={this.addInfo}
          error={imdbIdError}
          errorText="Please add movie IMDb Id"
        />

        <button
          type="submit"
          className="button"
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { InputForm } from '../InputForm/InputForm';

export class NewMovie extends Component {
  state = {
    title: null,
    description: null,
    imgUrl: null,
    imdbUrl: null,
    imdbId: null,
  };

  handleTitle = (e) => {
    const newTitle = e.target.value;

    this.setState({
      title: newTitle,
    });
  }

  handleDescription = (e) => {
    const newDescription = e.target.value;

    this.setState({
      description: newDescription,
    });
  }

  handleImgUrl = (e) => {
    const newImgUrl = e.target.value;

    this.setState({
      imgUrl: newImgUrl,
    });
  }

  handleImdbUrl = (e) => {
    const newImdbUrl = e.target.value;

    this.setState({
      imdbUrl: newImdbUrl,
    });
  }

  handleImdbId = (e) => {
    const newImdbId = e.target.value;

    this.setState({
      imdbId: newImdbId,
    });
  }

  handleNewMovie = (e) => {
    e.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.onAaddMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    e.target.reset();
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        onSubmit={this.handleNewMovie}
      >
        <InputForm
          onChange={this.handleTitle}
          value={title}
          text="Title"
        />
        <InputForm
          onChange={this.handleDescription}
          value={description}
          text="Description"
        />
        <InputForm
          onChange={this.handleImgUrl}
          value={imgUrl}
          text="img Url"
        />
        <InputForm
          onChange={this.handleImdbUrl}
          value={imdbUrl}
          text="imdb Url"
        />
        <InputForm
          onChange={this.handleImdbId}
          value={imdbId}
          text="imdb Id"
        />
        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAaddMovie: PropTypes.func.isRequired,
};

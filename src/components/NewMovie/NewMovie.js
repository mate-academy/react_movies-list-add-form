import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormElement } from '../FormElement/FormElement';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onTitleChange = (title) => {
    this.setState({
      title,
    });
  }

  onDescriptionChange = (description) => {
    this.setState({
      description,
    });
  }

  onImdbIdChange = (imdbId) => {
    this.setState({
      imdbId,
    });
  }

  onImdbUrlChange = (imdbUrl) => {
    this.setState({
      imdbUrl,
    });
  }

  onImgUrlChange = (imgUrl) => {
    this.setState({
      imgUrl,
    });
  }

  reset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const movie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imgdbId: this.state.imdbId,
    };

    onAdd(movie);
    this.reset();
  }

  render() {
    return (
      <form
        className="addMovieForm"
        onSubmit={(event) => {
          this.onSubmit(event);
        }}
      >
        <FormElement
          type="text"
          id="title"
          name="title"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <FormElement
          type="textarea"
          id="description"
          name="description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <FormElement
          type="text"
          id="imgUrl"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.onImgUrlChange}
        />
        <FormElement
          type="text"
          id="imdbUrl"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.onImdbUrlChange}
        />
        <FormElement
          type="text"
          id="imdbId"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.onImdbIdChange}
        />
        <button
          type="submit"
          className="addMovieForm__submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: false,
    descriptionError: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.setState({
      titleError: !title,
      descriptionError: !description,
    });

    if (!title) {
      return;
    }

    if (!description) {
      return;
    }

    this.props.addMovie(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="submitForm">
        <input
          type="text"
          placeholder="title"
          value={this.state.title}
          onChange={(event) => {
            this.setState({
              title: event.target.value,
              titleError: false,
            });
          }}
        />

        {this.state.titleError && (
          <span className="error">Please add a title</span>
        )}

        <input
          type="text"
          placeholder="description"
          value={this.state.description}
          onChange={(event) => {
            this.setState({
              description: event.target.value,
              descriptionError: false,
            });
          }}
        />

        {this.state.descriptionError && (
          <span className="error">Please add a description</span>
        )}

        <input
          type="url"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={(event) => {
            this.setState({
              imgUrl: event.target.value,
            });
          }}
        />
        <input
          type="url"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={(event) => {
            this.setState({
              imdbUrl: event.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="imdbId"
          value={this.state.imdbId}
          onChange={(event) => {
            this.setState({
              imdbId: event.target.value,
            });
          }}
        />
        <button type="submit">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

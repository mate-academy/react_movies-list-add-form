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
  };

  handleChanges = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  submitNewMovie = (event) => {
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;

    const { onAdd } = this.props;

    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbId: '',
      imdbUrl: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbId, imdbUrl } = this.state;

    return (
      <form className="form" onSubmit={this.submitNewMovie}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChanges}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChanges}
        />
        <input
          name="imgUrl"
          placeholder="Image"
          value={imgUrl}
          onChange={this.handleChanges}
        />
        <input
          name="imdbId"
          placeholder="Film IMDB URL"
          value={imdbId}
          onChange={this.handleChanges}
        />
        <input
          name="imdbUrl"
          placeholder="Film IMDB ID"
          value={imdbUrl}
          onChange={this.handleChanges}
        />
        <button
          type="submit"
          className="button is-primary"
        >
          Add new Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

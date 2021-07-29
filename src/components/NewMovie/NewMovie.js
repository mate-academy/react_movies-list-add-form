import React, { Component } from 'react';
import propTypes from 'prop-types';
import './NewMovie.scss';

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

  submitNewFilm = (event) => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { onAdd } = this.props;

    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form className="form" onSubmit={this.submitNewFilm}>
        <input
          name="title"
          placeholder="Film title"
          value={title}
          onChange={this.handleChanges}
        />
        <textarea
          name="description"
          placeholder="Film description"
          value={description}
          onChange={this.handleChanges}
        />
        <input
          name="imgUrl"
          placeholder="Film URL"
          value={imgUrl}
          onChange={this.handleChanges}
        />
        <input
          name="imdbUrl"
          placeholder="Film IMDB URL"
          value={imdbUrl}
          onChange={this.handleChanges}
        />
        <input
          name="imdbId"
          placeholder="Film IMDB id"
          value={imdbId}
          onChange={this.handleChanges}
        />
        <button type="submit">
          Add film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: propTypes.func.isRequired,
};

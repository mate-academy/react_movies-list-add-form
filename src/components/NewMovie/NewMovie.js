import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { onAdd } = this.props;
    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);

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
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="enter the title of the movie"
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="enter the description"
          value={description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="enter the address of the movie's poster"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="enter the IMDB link for the movie"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbId"
          placeholder="enter the IMDB ID of the movie"
          value={imdbId}
          onChange={this.handleChange}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

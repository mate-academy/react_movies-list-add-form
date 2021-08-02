import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const { handleChange, handleSubmit } = this;

    return (
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="Title"
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <textarea
          required
          placeholder="Description"
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <input
          type="text"
          required
          placeholder="Image url"
          name="imgUrl"
          value={imgUrl}
          onChange={handleChange}
        />
        <input
          type="text"
          required
          placeholder="Imdb Url"
          name="imdbUrl"
          value={imdbUrl}
          onChange={handleChange}
        />
        <input
          type="text"
          required
          placeholder="Imdb Id"
          name="imdbId"
          value={imdbId}
          onChange={handleChange}
        />
        <button type="submit">
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

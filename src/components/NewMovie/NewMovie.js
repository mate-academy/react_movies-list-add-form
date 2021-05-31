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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.onAdd({
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
      <form
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Add title"
          className="input"
          required
        />

        <textarea
          type="text"
          name="description"
          value={description}
          onChange={this.handleChange}
          placeholder="Add description"
          className="input"
          required
        />

        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          placeholder="Add URL"
          className="input"
          required
        />

        <input
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          placeholder="Add image URL"
          className="input"
          required
        />

        <input
          type="text"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          placeholder="Add image ID"
          className="input"
          required
        />
        <button type="submit">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

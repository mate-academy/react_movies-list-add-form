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

    this.setState({
      [name]: value,
    });
  }

  handleSubmit =(event) => {
    event.preventDefault();

    this.props.onAdd({
      title: this.state.title,
      description: this.state.description,
      imdbId: this.state.imdbId,
      imdbUrl: this.state.imdbUrl,
      imgUrl: this.state.imgUrl,
    });

    this.setState({
      title: '',
      description: '',
      imdbId: '',
      imdbUrl: '',
      imgUrl: '',
    });
  }

  render() {
    const {
      title, description,
      imgUrl, imdbUrl, imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={this.handleChange}
        />

        <textarea
          name="description"
          value={description}
          placeholder="Enter description"
          onChange={this.handleChange}
        />

        <input
          type="text"
          value={imgUrl}
          name="imgUrl"
          placeholder="Enter image link"
          onChange={this.handleChange}
        />

        <input
          type="text"
          value={imdbUrl}
          name="imdbUrl"
          placeholder="Enter rating link"
          onChange={this.handleChange}
        />

        <input
          type="text"
          value={imdbId}
          name="imdbId"
          placeholder="Enter film id"
          onChange={this.handleChange}
        />

        <button type="submit">
          Add new film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

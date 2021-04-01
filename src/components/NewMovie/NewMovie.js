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
    isEmpty: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      isEmpty: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onAdd({ ...this.state });

    return this.setState({
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
        <h1 className="form_header">ADD MOVIE</h1>
        <input
          name="title"
          className="form_element"
          type="text"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
        />

        <input
          name="description"
          className="form_element"
          type="text-area"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        />

        <input
          name="imgUrl"
          className="form_element"
          type="text"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />

        <input
          name="imdbUrl"
          className="form_element"
          type="text"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />

        <input
          name="imdbId"
          className="form_element"
          type="text"
          placeholder="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />

        <button
          type="submit"
          className="form_button"
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

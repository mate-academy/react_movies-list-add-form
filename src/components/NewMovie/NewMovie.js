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

    if (!value) {
      return;
    }

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (Object.values(newMovie).some(value => !value)) {
      return;
    }

    this.props.onAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

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
        onSubmit={this.handleSubmit}
        className="form"
      >
        <h2 className="title">
          Form to add movie:
        </h2>
        <input
          className="input"
          name="title"
          type="text"
          placeholder="Title"
          onChange={this.handleChange}
          value={title}
        />
        <input
          className="input"
          name="description"
          type="text"
          placeholder="Description"
          onChange={this.handleChange}
          value={description}
        />
        <input
          className="input"
          name="imgUrl"
          type="text"
          placeholder="imgUrl"
          onChange={this.handleChange}
          value={imgUrl}
        />
        <input
          className="input"
          name="imdbUrl"
          type="text"
          placeholder="imdbUrl"
          onChange={this.handleChange}
          value={imdbUrl}
        />
        <input
          className="input"
          name="imdbId"
          type="text"
          placeholder="imdbId"
          onChange={this.handleChange}
          value={imdbId}
        />

        <button
          className="button"
          type="submit"
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

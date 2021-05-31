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

  handleFormSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    this.props.onAdd(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
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

    return (
      <form
        className="add__form"
        onSubmit={this.handleFormSubmit}
      >
        <input
          className="add__form--input"
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
        />
        <textarea
          className="add__form--input"
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        />
        <input
          className="add__form--input"
          type="text"
          name="imgUrl"
          placeholder="ImgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          className="add__form--input"
          type="text"
          name="imdbUrl"
          placeholder="ImdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <input
          className="add__form--input"
          type="text"
          name="imdbId"
          placeholder="ImdbId"
          value={imdbId}
          onChange={this.handleChange}
        />
        <button
          className="add__form--button"
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

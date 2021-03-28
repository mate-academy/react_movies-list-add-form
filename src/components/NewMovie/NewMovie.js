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

    this.props.onAdd(this.state);

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
        onSubmit={this.handleSubmit}
      >
        <input
          name="title"
          className="input is-medium input-margin"
          type="text"
          placeholder="title"
          value={title}
          onChange={this.handleChange}
        />
        <input
          name="description"
          className="input is-medium input-margin"
          type="text"
          placeholder="description"
          value={description}
          onChange={this.handleChange}
        />
        <input
          name="imgUrl"
          className="input is-medium input-margin"
          type="text"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          name="imdbUrl"
          className="input is-medium input-margin"
          type="text"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <input
          name="imdbId"
          className="input is-medium input-margin"
          type="text"
          placeholder="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
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


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

  onSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imbdId,
    } = this.state;

    this.props.addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imbdId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (event) => {
    const { target: { name, value } } = event;

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

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <label>
          <h3>Title</h3>
          <input
            name="title"
            onChange={this.handleChange}
            value={title}
            required
          />
        </label>
        <label>
          <h3>Description</h3>
          <input
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <h2>imgUrl</h2>
          <input
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          <h2>imdbUrl</h2>
          <input
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          <h2>imdbId</h2>
          <input
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
        </label>
        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

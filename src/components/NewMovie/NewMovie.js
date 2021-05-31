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
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const values = Object.values(this.state);

    if (values.some(value => !value)) {
      return;
    }

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
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter title of the movie"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          value={description}
          placeholder="Enter some description"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          placeholder="Put a link to the image"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Put a link to the IMDB"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbId"
          value={imdbId}
          placeholder="Put imdbId"
          onChange={this.handleChange}
        />
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
  onAdd: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.css';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
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
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    return (
      <form
        name="newMovie"
        onSubmit={this.handleSubmit}
      >

        <input
          type="text"
          className="input"
          required
          name="title"
          id="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Enter title"
        />

        <textarea
          name="description"
          className="input"
          id="description"
          value={description}
          onChange={this.handleChange}
          placeholder="Enter description"
        />

        <input
          type="text"
          className="input"
          required
          name="imgUrl"
          id="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          placeholder="Attach image url"
        />

        <input
          type="text"
          className="input"
          required
          name="imdbUrl"
          id="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          placeholder="Attach IMDb url"
        />

        <input
          type="text"
          required
          className="input"
          name="imdbId"
          id="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          placeholder="Enter IMDb id"
        />

        <button type="submit" className="button">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

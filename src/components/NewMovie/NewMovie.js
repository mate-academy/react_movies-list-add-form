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

    this.props.addMovie(this.state);

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
        className="form"
        onSubmit={this.handleSubmit}
      >
        <div className="container title-container">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            className="input"
            value={title}
            onChange={this.handleChange}
            placeholder="Please, enter title"
          />
        </div>
        <div className="container descr-container">
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            name="description"
            className="textarea"
            value={description}
            onChange={this.handleChange}
            placeholder="Please, enter a description"
          />
        </div>
        <div className="container imgUrl-container">
          <label htmlFor="imgUrl">imgUrl: </label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            className="input"
            value={imgUrl}
            onChange={this.handleChange}
            placeholder="Please, enter URL of the image"
          />
        </div>
        <div className="container imdbUrl-container">
          <label htmlFor="imdbUrl">imdbUrl: </label>
          <input
            type="text"
            id="imdbUrl"
            name="imdbUrl"
            className="input"
            value={imdbUrl}
            onChange={this.handleChange}
            placeholder="Please, enter URL of the imdb"
          />
        </div>
        <div className="container imdbId-container">
          <label htmlFor="imdbId">imdbId: </label>
          <input
            type="text"
            id="imdbId"
            name="imdbId"
            className="input"
            value={imdbId}
            onChange={this.handleChange}
            placeholder="Please, enter ID of the imdb"
          />
        </div>
        <button
          type="submit"
          className="button"
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

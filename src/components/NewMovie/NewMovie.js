import React, { Component } from 'react';
import './NewMovie.scss';
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

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);

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
        action="../api/movies.json"
        method="POST"
        className="NewMovie__form"
        onSubmit={this.handleSubmit}
      >
        <p>Add new Movie</p>
        <input
          type="text"
          name="title"
          className="NewMovie__form-item"
          value={title}
          onChange={this.handleChange}
          placeholder="write title"
          required
        />
        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          className="NewMovie__form-item"
          onChange={this.handleChange}
          placeholder="add ImgUrl"
          required
        />
        <input
          type="text"
          name="imdbUrl"
          className="NewMovie__form-item"
          value={imdbUrl}
          onChange={this.handleChange}
          placeholder="add imdbUrl"
          required
        />
        <input
          type="text"
          name="imdbId"
          className="NewMovie__form-item"
          value={imdbId}
          onChange={this.handleChange}
          placeholder="add imdbId"
          required
        />
        <textarea
          name="description"
          className="NewMovie__form-item"
          value={description}
          onChange={this.handleChange}
          placeholder="write description"
        />
        <br />
        <button type="submit" className="NewMovie__form-btn">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

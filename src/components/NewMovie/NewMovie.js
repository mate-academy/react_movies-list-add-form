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

    this.setState(state => ({
      [name]: value,
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(movie);

    this.setState(state => ({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));
  };

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>

        <h1>Add your movie</h1>

        <div className="formInput">
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
            placeholder="Write title here"
            required
          />
        </div>

        <div className="formInput">
          <textarea
            name="description"
            value={description}
            onChange={this.handleChange}
            placeholder="Write description here"
            required
          />
        </div>

        <div className="formInput">
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            placeholder="Write imgUrl here"
            required
          />
        </div>

        <div className="formInput">
          <input
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            placeholder="Write imdbUrl here"
            required
          />
        </div>

        <div className="formInput">
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            placeholder="Write imdbId here"
            required
          />
        </div>

        <div className="formButton">
          <button type="submit">
            Add
          </button>
        </div>

      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

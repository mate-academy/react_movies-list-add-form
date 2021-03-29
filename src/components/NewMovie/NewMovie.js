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

        <h1 className="subtitle">Add your movie</h1>

        <div className="formInput">
          <input
            className="input is-info"
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
            className="textarea is-info"
            name="description"
            value={description}
            onChange={this.handleChange}
            placeholder="Write description here"
            required
          />
        </div>

        <div className="formInput">
          <input
            className="input is-info"
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
            className="input is-info"
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
            className="input is-info"
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            placeholder="Write imdbId here"
            required
          />
        </div>

        <div>
          <button
            className="button is-info"
            type="submit"
          >
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

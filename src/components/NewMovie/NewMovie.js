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

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    addMovie({
      title, description, imgUrl, imdbUrl, imdbId,
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
    const {
      name,
      value,
    } = event.target;

    this.setState({
      [name]: value.trimLeft(),
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="movieForm"
      >
        <input
          type="text"
          className="movieForm__input"
          placeholder="Title"
          name="title"
          id="title"
          value={title}
          onChange={this.handleChange}
          required
        />
        <textarea
          className="movieForm__textarea"
          placeholder="Description"
          name="description"
          id="description"
          value={description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="movieForm__input"
          placeholder="ImgUrl"
          name="imgUrl"
          id="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          className="movieForm__input"
          placeholder="ImdbUrl"
          name="imdbUrl"
          id="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          className="movieForm__input"
          placeholder="ImdbId"
          name="imdbId"
          id="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          required
        />
        <button
          type="submit"
          className="movieForm__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

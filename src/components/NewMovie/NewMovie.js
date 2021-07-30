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
  };

  changeOnDefaultState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleSubmit = (event) => {
    const { addMovie } = this.props;

    event.preventDefault();
    addMovie(this.state);
    this.changeOnDefaultState();
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (

      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label
          htmlFor="title"
          className="form__label"
        >
          Title
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </label>
        <label
          htmlFor="description"
          className="form__label"
        >
          Description
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.handleChange}
          />
        </label>
        <label
          htmlFor="imgUrl"
          className="form__label"
        >
          ImgUrl
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
        </label>
        <label
          htmlFor="imdbUrl"
          className="form__label"
        >
          IMDBUrl
          <input
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </label>
        <label
          htmlFor="imdbId"
          className="form__label"
        >
          IMDBid
          <input
            type="text"
            name="imdbId"
            id="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
        </label>
        <button
          type="submit"
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

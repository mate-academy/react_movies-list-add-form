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

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);
    this.clearForm();
  }

  clearForm = () => {
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
        <label htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="description">
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="imgUrl">
          ImgUrl:
        </label>
        <input
          type="text"
          id="imgurl"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="imdbUrl">
          ImdbUrl:
        </label>
        <input
          type="text"
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="imdbId">
          ImdbId:
        </label>
        <input
          type="text"
          id="imdbId"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          required
        />

        <button type="submit">
          Add Movie
        </button>

      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

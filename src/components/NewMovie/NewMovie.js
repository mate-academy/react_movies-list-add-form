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

  handleSubmit = (event) => {
    event.preventDefault();

    const { onAddMovie } = this.props;

    onAddMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

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
      <form onSubmit={this.handleSubmit} className="form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form__field"
          value={title}
          onChange={this.handleChange}
        />

        <textarea
          name="description"
          className="form__field"
          value={description}
          placeholder="Description..."
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imgUrl"
          placeholder="ImgUrl"
          className="form__field"
          value={imgUrl}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imdbUrl"
          placeholder="ImdbUrl"
          className="form__field"
          value={imdbUrl}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imdbId"
          placeholder="ImdbId"
          className="form__field"
          value={imdbId}
          onChange={this.handleChange}
        />

        <button type="submit" className="form__button">Add Movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
};

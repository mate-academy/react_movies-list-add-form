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

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    this.props.addMovie({
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
        <h1 className="form__heading">Add your movie</h1>
        <input
          className="form__title"
          name="title"
          value={title}
          placeholder="add movie title"
          onChange={this.handleInputChange}
        />
        <textarea
          className="form__description"
          name="description"
          value={description}
          placeholder="add movie description"
          onChange={this.handleInputChange}
        />
        <input
          className="form__imgUrl"
          name="imgUrl"
          value={imgUrl}
          placeholder="add movie imgUrl"
          onChange={this.handleInputChange}
        />
        <input
          className="form__imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="add movie imdbUrl"
          onChange={this.handleInputChange}
        />
        <input
          className="form__imdbId"
          name="imdbId"
          value={imdbId}
          placeholder="add movie imdbId"
          onChange={this.handleInputChange}
        />
        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

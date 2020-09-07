import React, { Component } from 'react';
import propTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  isSubmit = (event) => {
    event.preventDefault();
    const { addMovie } = this.props;

    addMovie(this.state);

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

    this.setState({ [name]: value });
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
      <form className="form" onSubmit={this.isSubmit}>
        <input
          type="text"
          className="form__input"
          name="title"
          placeholder="Pleas enter title"
          required
          value={title}
          onChange={this.handleChange}
        />
        <textarea
          name="description"
          className="form__textarea"
          placeholder="Pleas enter description"
          required
          value={description}
          onChange={this.handleChange}
        />
        <input
          type="url"
          className="form__input"
          name="imgUrl"
          placeholder="Pleas enter image url"
          required
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          type="url"
          className="form__input"
          name="imdbUrl"
          placeholder="Pleas enter imdb url"
          required
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form__input"
          name="imdbId"
          placeholder="Pleas enter imdb ID"
          required
          value={imdbId}
          onChange={this.handleChange}
        />
        <button type="submit" className="form__button">Add</button>
      </form>

    );
  }
}

NewMovie.propTypes = {
  addMovie: propTypes.func.isRequired,
};

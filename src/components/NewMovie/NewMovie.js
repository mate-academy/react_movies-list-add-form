import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    title: '',
    description: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  pushNewFilm = () => {
    const {
      imgUrl,
      imdbUrl,
      imdbId,
      title,
      description,
    } = this.state;
    const newFilm = {
      imgUrl,
      imdbUrl,
      imdbId,
      title,
      description,
    };

    this.setState({
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      title: '',
      description: '',
    });

    return newFilm;
  }

  addFilm = (event) => {
    event.preventDefault();
    this.props.onAdd(this.pushNewFilm());
  }

  render() {
    const {
      imgUrl,
      imdbUrl,
      imdbId,
      title,
      description,
    } = this.state;

    return (
      <form
        className="movies__form"
        onSubmit={this.addFilm}
      >
        <label htmlFor="imgUrl">
          imgUrl
        </label>
        <input
          id="imgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <label htmlFor="imdbUrl">
          imdbUrl
        </label>
        <input
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <label htmlFor="imdbId">
          imdbId
        </label>
        <input
          id="imdbId"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />
        <label htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <textarea
          placeholder="description"
          name="description"
          value={description}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

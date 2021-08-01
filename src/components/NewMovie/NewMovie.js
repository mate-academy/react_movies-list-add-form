import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';

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

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);
  };

  onChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <>
        Add Movie
        <form onSubmit={this.handleSubmit} className="form">
          <Input
            name="title"
            className="form--input"
            value={title}
            onChange={this.onChange}
          />
          <Input
            name="description"
            className="form--input"
            value={description}
            onChange={this.onChange}
          />
          <Input
            name="imgUrl"
            className="form--input"
            value={imgUrl}
            onChange={this.onChange}
          />
          <Input
            name="imdbUrl"
            className="form--input"
            value={imdbUrl}
            onChange={this.onChange}
          />
          <Input
            name="imdbId"
            className="form--input"
            value={imdbId}
            onChange={this.onChange}
          />
          <button type="submit">
            Add Movie
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

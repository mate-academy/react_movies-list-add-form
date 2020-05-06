import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MovieItem } from '../MovieItem';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isDisabled: true,
  };

  handleChangeInput = (name, value) => {
    this.setState({
      [name]: value.trim(),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.addMovie({
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChangeForm = () => {
    if (this.state.title
        && this.state.imgUrl
        && this.state.imdbUrl
        && this.state.imdbId) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    return (
      <form onChange={this.handleChangeForm} onSubmit={this.handleSubmit}>
        <MovieItem
          name="title"
          value={this.state.title}
          handleChangeInput={this.handleChangeInput}
        />
        <MovieItem
          name="description"
          value={this.state.description}
          handleChangeInput={this.handleChangeInput}
        />
        <MovieItem
          name="imgUrl"
          value={this.state.imgUrl}
          handleChangeInput={this.handleChangeInput}
        />
        <MovieItem
          name="imdbUrl"
          value={this.state.imdbUrl}
          handleChangeInput={this.handleChangeInput}
        />
        <MovieItem
          name="imdbId"
          value={this.state.imdbId}
          handleChangeInput={this.handleChangeInput}
        />
        <button
          disabled={this.state.isDisabled}
          type="submit"
          className="btn"
        >
          Add New Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

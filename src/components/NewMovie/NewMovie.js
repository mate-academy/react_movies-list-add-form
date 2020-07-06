import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: [],
    description: [],
    imgUrl: [],
    imdbUrl: [],
    imdbId: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addMovies(this.state);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  addTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  addDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  addImg = (event) => {
    this.setState({
      imgUrl: event.target.value,
    });
  }

  addImdbUrl = (event) => {
    this.setState({
      imdbUrl: event.target.value,
    });
  }

  addImdbId = (event) => {
    this.setState({
      imdbId: event.target.value,
    });
  }

  render() {
    return (
      <>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            required
            placeholder="Add title"
            onChange={this.addTitle}
            value={this.state.title}
          />
          <input
            required
            type="text"
            placeholder="Add description"
            onChange={this.addDescription}
            value={this.state.description}
          />
          <input
            required
            type="text"
            placeholder="Add image url"
            onChange={this.addImg}
            value={this.state.imgUrl}
          />
          <input
            required
            type="text"
            placeholder="Add imdb url"
            onChange={this.addImdbUrl}
            value={this.state.imdbUrl}
          />
          <input
            required
            type="text"
            placeholder="Add imdb id"
            onChange={this.addImdbId}
            value={this.state.imdbId}
          />
          <button
            type="submit"
          >
            ADD
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovies: PropTypes.func.isRequired,
};

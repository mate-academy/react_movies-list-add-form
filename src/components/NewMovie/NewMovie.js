import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addMovie(this.state.movie);
    this.setState({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  }

  handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;

    this.setState(prevState => ({
      movie: {
        ...prevState.movie,
        [name]: value,
      },
    }));
  }

  render() {
    return (
      <form className="form" onSubmit={event => this.handleSubmit(event)}>
        <label>
          <h2>Title</h2>
          <input
            className="input"
            name="title"
            value={this.state.movie.title}
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          <h2>Description</h2>
          <input
            className="input"
            name="description"
            value={this.state.movie.description}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <h2>imgUrl</h2>
          <input
            className="input"
            name="imgUrl"
            value={this.state.movie.imgUrl}
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          <h2>imdbUrl</h2>
          <input
            className="input"
            name="imdbUrl"
            value={this.state.movie.imdbUrl}
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          <h2>imdbId</h2>
          <input
            className="input"
            name="imdbId"
            value={this.state.movie.imdbId}
            onChange={this.handleChange}
            required
          />
        </label>
        <button
          className="button"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

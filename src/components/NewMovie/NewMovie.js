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

  handleChange = (event) => {
    const { name } = event.target;
    const target = event.target.value;

    this.setState(prevState => ({
      movie: {
        ...prevState.movie,
        [name]: target,
      },
    }));
  }

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

  render() {
    return (
      <form className="form" onSubmit={e => this.handleSubmit(e)}>
        <label>
          <h2>Title</h2>
          <input
            required
            className="form__input"
            name="title"
            onChange={this.handleChange}
            value={this.state.movie.title}
          />
        </label>
        <label>
          <h2>Description</h2>
          <input
            required
            className="form__input"
            name="description"
            onChange={this.handleChange}
            value={this.state.movie.description}
          />
        </label>
        <label>
          <h2>imgUrl</h2>
          <input
            required
            className="form__input"
            name="imgUrl"
            onChange={this.handleChange}
            value={this.state.movie.imgUrl}
          />
        </label>
        <label>
          <h2>imdbUrl</h2>
          <input
            required
            className="form__input"
            name="imdbUrl"
            onChange={this.handleChange}
            value={this.state.movie.imdbUrl}
          />
        </label>
        <label>
          <h2>imdbId</h2>
          <input
            required
            className="form__input"
            name="imdbId"
            onChange={this.handleChange}
            value={this.state.movie.imdbId}
          />
        </label>
        <br />
        <button
          className="form__button"
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

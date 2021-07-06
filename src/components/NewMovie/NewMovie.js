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

  reset = () => {
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

  handleSubmit = (event) => {
    const { onAdd } = this.props;
    const { movie } = this.state;

    event.preventDefault();
    onAdd(movie);
    this.reset();
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
    }));
  }

  render() {
    const { movie } = this.state;
    const movieKeys = Object.keys(movie);

    return (
      <form onSubmit={this.handleSubmit} className="form">
        {movieKeys.map(key => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key}
            onChange={this.handleChange}
            value={movie[key].trimLeft()}
            className="form__item"
            required
          />
        ))}
        <button type="submit">
          Add New Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

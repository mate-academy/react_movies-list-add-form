import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

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

    this.props.onAdd(this.state.movie);

    this.setState({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  handleChanges = ({ target }) => {
    const { name } = target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: target.value,
      },
    }));
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state.movie;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <p className="form__info">* All fields are required</p>
        <input
          type="text"
          value={title}
          name="title"
          className="form__item"
          placeholder="Enter a title"
          onChange={this.handleChanges}
        />

        <textarea
          value={description}
          name="description"
          className="form__item"
          placeholder="Enter a description"
          onChange={this.handleChanges}
        />

        <input
          type="text"
          value={imgUrl}
          name="imgUrl"
          className="form__item"
          placeholder="Enter an imgUrl"
          onChange={this.handleChanges}
        />

        <input
          type="text"
          value={imdbUrl}
          name="imdbUrl"
          className="form__item"
          placeholder="Enter an imdbUrl"
          onChange={this.handleChanges}
        />

        <input
          type="text"
          value={imdbId}
          name="imdbId"
          className="form__item"
          placeholder="Enter an imdbId"
          onChange={this.handleChanges}
        />

        <button
          type="submit"
          className="form__button"
        >
          {'Add a movie'.toUpperCase()}
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

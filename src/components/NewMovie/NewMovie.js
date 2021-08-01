import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    } = this.state;
    const { onAdd } = this.props;

    const movie = {
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    };

    onAdd(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbId: '',
      imdbUrl: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    } = this.state;
    const { handleChange, onSubmit } = this;

    return (
      <form
        className="form"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          className="form__input"
          value={title}
          name="title"
          placeholder="Enter a title"
          onChange={handleChange}
        />
        <input
          type="text"
          className="form__input"
          value={description}
          name="description"
          placeholder="Enter a description"
          onChange={handleChange}
        />
        <input
          type="text"
          className="form__input"
          value={imgUrl}
          name="imgUrl"
          placeholder="Enter a imgUrl"
          onChange={handleChange}
        />
        <input
          type="text"
          className="form__input"
          value={imdbUrl}
          name="imdbUrl"
          placeholder="Enter a imdbUrl"
          onChange={handleChange}

        />
        <input
          type="text"
          className="form__input"
          value={imdbId}
          name="imdbId"
          placeholder="Enter a imdbId"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="form__button"
        >
          Add a movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

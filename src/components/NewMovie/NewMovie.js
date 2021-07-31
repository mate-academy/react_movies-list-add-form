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

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmitForm = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    const { addMovie } = this.props;

    const newMovie = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    addMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const { handleSubmitForm, onChange } = this;

    return (
      <form
        onSubmit={handleSubmitForm}
        className="field"
      >
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={onChange}
          required
          type="text"
          className="input"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={onChange}
          required
          cols="50"
          rows="5"
          style={{ resize: 'none' }}
          className="textarea"
        />
        <input
          name="imgUrl"
          placeholder="ImgUrl"
          value={imgUrl}
          onChange={onChange}
          required
          type="text"
          className="input"
        />
        <input
          name="imdbUrl"
          placeholder="ImdbUrl"
          value={imdbUrl}
          onChange={onChange}
          required
          type="text"
          className="input"
        />
        <input
          name="imdbId"
          placeholder="ImdbId"
          value={imdbId}
          onChange={onChange}
          required
          type="text"
          className="input"
        />
        <button
          type="submit"
          className="button is-warning"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends PureComponent {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleInput = (event) => {
    const { name, value } = event.target;

    return this.setState(() => ({
      [name]: value,
    }));
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

    if (title.trim() === '') {
      return;
    }

    if (description.trim() === '') {
      return;
    }

    if (imgUrl.trim() === '') {
      return;
    }

    if (imdbUrl.trim() === '') {
      return;
    }

    if (imdbId.trim() === '') {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);

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

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >

        <input
          className="input"
          type="text"
          name="title"
          placeholder="Title Name"
          value={title}
          onChange={(event) => {
            this.handleInput(event);
          }}
        />

        <input
          className="input"
          type="text"
          name="imgUrl"
          placeholder="Image URL"
          value={imgUrl}
          onChange={(event) => {
            this.handleInput(event);
          }}
        />

        <input
          className="input"
          type="text"
          name="imdbUrl"
          placeholder="IMDb URL"
          value={imdbUrl}
          onChange={(event) => {
            this.handleInput(event);
          }}
        />

        <input
          className="input"
          type="text"
          name="imdbId"
          placeholder="IMDb ID"
          value={imdbId}
          onChange={(event) => {
            this.handleInput(event);
          }}
        />

        <textarea
          className="textarea"
          rows="5"
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(event) => {
            this.handleInput(event);
          }}
        />

        <button
          className="form-button"
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

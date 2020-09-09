import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

import { Form } from '../Form/Form';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, imgUrl, imdbUrl, imdbId, description } = this.state;

    return (
      <>
        <h1 className="title">Add new Movie to a list</h1>
        <form onSubmit={(event) => {
          event.preventDefault();

          const newMovie = {
            title,
            imgUrl,
            imdbUrl,
            imdbId,
            description,
          };

          this.props.onAdd(newMovie);
          this.clearState();
        }}
        >
          <Form
            value={title}
            label="Title"
            name="title"
            onInputChange={this.onChangeHandler}
          />

          <label>
            Description:
            <textarea
              className="movie-description"
              value={description}
              onChange={this.onChangeHandler}
              type="text"
              name="description"
            />
          </label>

          <Form
            value={imgUrl}
            label="Image URL"
            name="imgUrl"
            onInputChange={this.onChangeHandler}
          />
          <Form
            value={imdbUrl}
            label="Imdb URL"
            name="imdbUrl"
            onInputChange={this.onChangeHandler}
          />
          <Form
            value={imdbId}
            label="Imdb ID"
            name="imdbId"
            onInputChange={this.onChangeHandler}
          />

          <button
            className="movie-button"
            type="submit"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add Movie
          </button>

        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

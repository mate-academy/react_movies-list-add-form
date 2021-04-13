import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, imgUrl, imdbUrl, imdbId } = this.state;
    
    if (
      title === ''
      || imgUrl === ''
      || imdbUrl === ''
      || imdbId === ''
    ) {
      return;
    }

    const newMovie = { ...this.state };

    this.props.addMovie(newMovie);
    this.resetForm();
  }

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        onSubmit={(event) => {
          this.handleSubmit(event);
        }}
      >
        <span className="mb-1">Title</span>
        <input
          className="input is-small mb-3"
          name="title"
          type="text"
          value={title}
          placeholder="Title"
          onChange={(event) => {
            this.handleChange(event);
          }}
        />
        <span className="mb-1">Description</span>
        <input
          className="input is-small mb-3"
          name="description"
          type="text"
          value={description}
          placeholder="Description"
          onChange={(event) => {
            this.handleChange(event);
          }}
        />
        <span className="mb-1">Image Url</span>
        <input
          className="input is-small mb-3"
          name="imgUrl"
          type="text"
          value={imgUrl}
          placeholder="Image Url"
          onChange={(event) => {
            this.handleChange(event);
          }}
        />
        <span className="mb-1">Imdb Url</span>
        <input
          className="input is-small mb-3"
          name="imdbUrl"
          type="text"
          value={imdbUrl}
          placeholder="Imdb Url"
          onChange={(event) => {
            this.handleChange(event);
          }}
        />
        <span className="mb-1">Imdb Id</span>
        <input
          className="input is-small mb-3"
          name="imdbId"
          type="text"
          value={imdbId}
          placeholder="Imdb Id"
          onChange={(event) => {
            this.handleChange(event);
          }}
        />
        <button
          type="submit"
          className="button is-small mb-3"
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

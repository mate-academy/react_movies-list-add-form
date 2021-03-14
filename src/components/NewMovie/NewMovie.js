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

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  createFilm = () => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };
  };

  render() {
    const { onAdd } = this.props;
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <>
        <h2 className="add-movie__header">
          Add New Movie
        </h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.clearForm();
            onAdd(this.createFilm());
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={this.changeHandler}
            className="input"
          />

          <textarea
            type="text"
            name="description"
            placeholder="Enter description"
            value={description}
            onChange={this.changeHandler}
            className="input"
          />

          <input
            type="text"
            name="imgUrl"
            placeholder="Enter image Url"
            value={imgUrl}
            onChange={this.changeHandler}
            className="input"
          />

          <input
            type="text"
            name="imdbUrl"
            placeholder="Enter IMDB Url"
            value={imdbUrl}
            onChange={this.changeHandler}
            className="input"
          />

          <input
            type="text"
            name="imdbId"
            placeholder="Enter IMDB Id"
            value={imdbId}
            onChange={this.changeHandler}
            className="input"
          />

          <button
            type="submit"
            className="button"
          >
            Add film
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

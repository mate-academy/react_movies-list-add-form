import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    newTitle: '',
    newImg: '',
    newImdbUrl: '',
    imdbId: '',
    description: '',
  };

  handlerUniversal = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handlerSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;
    const {
      newTitle,
      newImg,
      newImdbUrl,
      imdbId,
      description,
    } = this.state;

    const newFilm = {
      title: newTitle,
      description,
      imgUrl: newImg,
      imdbUrl: newImdbUrl,
      imdbId,
    };

    addMovie(newFilm);

    this.resetForm();
  }

  resetForm = () => {
    this.setState({
      newTitle: '',
      newImg: '',
      newImdbUrl: '',
      imdbId: '',
      description: '',
    });
  }

  render() {
    const {
      newTitle,
      newImg,
      newImdbUrl,
      imdbId,
      description,
    } = this.state;

    return (
      <>
        <h1
          className="form__title"
        >
          Add new film
        </h1>

        <form
          className="form"
          onSubmit={this.handlerSubmit}
        >
          <label>
            Title:
            <input
              name="newTitle"
              required
              placeholder="Title"
              value={newTitle}
              onChange={this.handlerUniversal}
            />
          </label>

          <label>
            imgUrl:
            <input
              name="newImg"
              required
              placeholder="imgUrl"
              value={newImg}
              onChange={this.handlerUniversal}
            />
          </label>

          <label>
            imdbUrl:
            <input
              name="newImdbUrl"
              required
              placeholder="imdbUrl"
              value={newImdbUrl}
              onChange={this.handlerUniversal}
            />
          </label>

          <label>
            imdbId:
            <input
              name="imdbId"
              required
              placeholder="imdbId"
              value={imdbId}
              onChange={this.handlerUniversal}
            />
          </label>
          <textarea
            name="description"
            placeholder="Description"
            className="form__text-area"
            value={description}
            onChange={this.handlerUniversal}
          />
          <button
            type="submit"
            className="form__button"
          >
            ADD
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

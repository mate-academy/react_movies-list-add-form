import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  createMovie = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  clearForm = (event) => {
    [...event.target.elements].forEach(element => (
      this.setState({
        [element.name]: '',
      })
    ));
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          this.props.addMovie(event, this.state);
          this.clearForm(event);
        }}
      >
        <label htmlFor="title" className="form__title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title.trim()}
          className="form__input"
          onChange={(event) => {
            this.createMovie(event);
          }}
          required
        />
        <label
          htmlFor="description"
          className="form__title"
        >
          Description:
        </label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={description.trim()}
          className="form__input form__input_textarea"
          onChange={(event) => {
            this.createMovie(event);
          }}
          required
        />
        <label htmlFor="imgUrl" className="form__title">imgUrl: </label>
        <input
          type="url"
          id="imgUrl"
          name="imgUrl"
          value={imgUrl.trim()}
          className="form__input"
          onChange={(event) => {
            this.createMovie(event);
          }}
          required
        />
        <label htmlFor="imdbUrl" className="form__title">imdbUrl: </label>
        <input
          type="url"
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl.trim()}
          className="form__input"
          onChange={(event) => {
            this.createMovie(event);
          }}
          required
        />
        <label htmlFor="imdbId" className="form__title">imdbId: </label>
        <input
          type="text"
          id="imdbId"
          name="imdbId"
          value={imdbId.trim()}
          className="form__input"
          onChange={(event) => {
            this.createMovie(event);
          }}
          required
        />
        <button className="form__button" type="submit">Submit</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

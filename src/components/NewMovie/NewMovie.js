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
          event.preventDefault();
          this.props.addMovie(this.state);
          this.clearForm(event);
        }}
      >
        <label htmlFor="title" className="form__title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          className="form__input"
          onChange={this.createMovie}
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
          value={description}
          className="form__input form__input_textarea"
          onChange={this.createMovie}
          required
        />
        <label htmlFor="imgUrl" className="form__title">imgUrl: </label>
        <input
          type="url"
          id="imgUrl"
          name="imgUrl"
          value={imgUrl}
          className="form__input"
          onChange={this.createMovie}
          required
        />
        <label htmlFor="imdbUrl" className="form__title">imdbUrl: </label>
        <input
          type="url"
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          className="form__input"
          onChange={this.createMovie}
          required
        />
        <label htmlFor="imdbId" className="form__title">imdbId: </label>
        <input
          type="text"
          id="imdbId"
          name="imdbId"
          value={imdbId}
          className="form__input"
          onChange={this.createMovie}
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

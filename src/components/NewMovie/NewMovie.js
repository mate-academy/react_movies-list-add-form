import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    titleValue: '',
    descriptionValue: '',
    imgUrlValue: '',
    imdbUrlValue: '',
    imdbIdValue: '',
  };

  createNewMoviePost = () => {
    const {
      titleValue,
      descriptionValue,
      imgUrlValue,
      imdbUrlValue,
      imdbIdValue,
    } = this.state;
    const newMovie = {
      title: titleValue,
      description: descriptionValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdValue,
    };

    this.props.addMovie(newMovie);
  }

  render() {
    const {
      titleValue,
      descriptionValue,
      imgUrlValue,
      imdbUrlValue,
      imdbIdValue,
    } = this.state;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.createNewMoviePost();
        }}
        className="form"
      >
        <label className="label" htmlFor="title">Title</label>
        <input
          onChange={(event) => {
            this.setState({
              titleValue: event.target.value,
            });
          }}
          value={titleValue}
          className="input"
          id="title"
          required
        />
        <label className="label" htmlFor="description">Description</label>
        <input
          onChange={(event) => {
            this.setState({
              descriptionValue: event.target.value,
            });
          }}
          value={descriptionValue}
          className="input"
          id="description"
        />
        <label className="label" htmlFor="img-url">Image URL</label>
        <input
          onChange={(event) => {
            this.setState({
              imgUrlValue: event.target.value,
            });
          }}
          value={imgUrlValue}
          className="input"
          id="img-url"
          required
        />
        <label className="label" htmlFor="imdb-url">IMDB URL</label>
        <input
          onChange={(event) => {
            this.setState({
              imdbUrlValue: event.target.value,
            });
          }}
          value={imdbUrlValue}
          className="input"
          id="imdb-url"
          required
        />
        <label className="label" htmlFor="imdb-id">IMDB id</label>
        <input
          onChange={(event) => {
            this.setState({
              imdbIdValue: event.target.value,
            });
          }}
          value={imdbIdValue}
          className="input"
          id="imdb-id"
          required
        />
        <button type="submit" className="button is-link">Submit</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

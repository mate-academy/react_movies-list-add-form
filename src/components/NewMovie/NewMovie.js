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

  onChangeHandler = (event) => {
    const {
      name,
      value,
    } = event.target;

    this.setState({
      [name]: value,
    });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state);

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
      onChangeHandler,
      onSubmitHandler,
    } = this;

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <>
        <h1>Add movie:</h1>
        <form
          className="ui form"
          onSubmit={onSubmitHandler}
        >
          <div className="field">
            <input
              type="text"
              name="title"
              placeholder="Movie title"
              value={title}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="field">
            <input
              type="text"
              name="description"
              placeholder="Movie description"
              value={description}
              onChange={onChangeHandler}
            />
          </div>
          <div className="field">
            <input
              type="text"
              name="imgUrl"
              placeholder="Movie link"
              value={imgUrl}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="field">
            <input
              type="text"
              name="imdbUrl"
              placeholder="IMDB link"
              value={imdbUrl}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="field">
            <input
              type="text"
              name="imdbId"
              placeholder="IMDB id"
              value={imdbId}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button
            type="submit"
            className="ui button"
          >
            Add movie
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

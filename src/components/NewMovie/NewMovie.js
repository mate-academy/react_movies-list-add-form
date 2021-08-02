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

  submitHandler = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const { changeHandler, submitHandler } = this;

    return (
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="title"
          className="form__field"
          placeholder="Title"
          value={title}
          onChange={changeHandler}
          required
        />
        <textarea
          type="text"
          rows="15"
          name="description"
          className="form__field"
          placeholder="Description..."
          value={description}
          onChange={changeHandler}
          required
        />
        <input
          type="text"
          name="imgUrl"
          className="form__field"
          placeholder="img url"
          value={imgUrl}
          onChange={changeHandler}
          required
        />
        <input
          type="text"
          name="imdbUrl"
          className="form__field"
          placeholder="imdb url"
          value={imdbUrl}
          onChange={changeHandler}
          required
        />
        <input
          type="text"
          name="imdbId"
          className="form__field"
          placeholder="imdb id"
          value={imdbId}
          onChange={changeHandler}
          required
        />
        <div className="form__submit">
          <button
            type="submit"
            className="form__submit-button"
          >
            Add movie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

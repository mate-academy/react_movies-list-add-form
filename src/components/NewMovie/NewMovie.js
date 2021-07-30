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
          placeholder="Title"
          value={title}
          onChange={changeHandler}
        />
        <textarea
          type="text"
          name="description"
          placeholder="Description..."
          value={description}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="img url"
          value={imgUrl}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="imdb url"
          value={imdbUrl}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="imdbId"
          placeholder="imdb id"
          value={imdbId}
          onChange={changeHandler}
        />
        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  defaultState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  }

  state = this.defaultState;

  onSubmitHandler = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state);

    this.setState(this.defaultState);
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { onChangeHandler, onSubmitHandler, state: {
      title, description, imgUrl, imdbUrl, imdbId,
    } } = this;

    return (
      <form onSubmit={onSubmitHandler}>
        <input
          name="title"
          placeholder="title"
          value={title}
          type="text"
          onChange={onChangeHandler}
          className="input"
        />
        <input
          name="description"
          placeholder="descrition"
          value={description}
          type="text"
          onChange={onChangeHandler}
          className="input"
        />
        <input
          name="imgUrl"
          placeholder="imgUrl"
          value={imgUrl}
          type="text"
          onChange={onChangeHandler}
          className="input"
        />
        <input
          name="imdbUrl"
          placeholder="imdbUrl"
          value={imdbUrl}
          type="text"
          onChange={onChangeHandler}
          className="input"
        />
        <input
          name="imdbId"
          placeholder="imdbId"
          value={imdbId}
          type="text"
          onChange={onChangeHandler}
          className="input"
        />
        <button
          type="submit"
          className="button"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

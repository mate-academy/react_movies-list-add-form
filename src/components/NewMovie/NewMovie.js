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

  addValueStateTarget = (event) => {
    const { name } = event.target;

    this.setState({ [name]: event.target.value });
  };

  render() {
    const { addMovie } = this.props;
    const { state } = this;

    return (
      <form
        className="newMovie"
        onSubmit={(event) => {
          event.preventDefault();
          addMovie(state);
        }}
      >
        <p className="newMovie__input">
          <span className="">title</span>
          <input
            type="text"
            name="title"
            required
            onChange={this.addValueStateTarget}
            value={this.state.title}
          />
        </p>
        <p className="newMovie__input">
          <span>description</span>
          <input
            type="text"
            name="description"
            required
            onChange={this.addValueStateTarget}
            value={this.state.description}
          />
        </p>
        <p className="newMovie__input">
          <span>imgUrl</span>
          <input
            type="text"
            name="imgUrl"
            required
            onChange={this.addValueStateTarget}
            value={this.state.imgUrl}
          />
        </p>
        <p className="newMovie__input">
          <span>imdbUrl</span>
          <input
            type="text"
            name="imdbUrl"
            required
            onChange={this.addValueStateTarget}
            value={this.state.imdbUrl}
          />
        </p>
        <p className="newMovie__input">
          <span>imdbId</span>
          <input
            type="text"
            name="imdbId"
            required
            onChange={this.addValueStateTarget}
            value={this.state.imdbId}
          />
        </p>

        <button
          className="newMovie__button"
          type="submit"
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

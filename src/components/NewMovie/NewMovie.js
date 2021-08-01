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
            onChange={(event) => {
              this.setState({ title: event.target.value });
            }}
            value={this.state.title}
          />
        </p>
        <p className="newMovie__input">
          <span>description</span>
          <input
            type="text"
            onChange={(event) => {
              this.setState({ description: event.target.value });
            }}
            value={this.state.description}
          />
        </p>
        <p className="newMovie__input">
          <span>imgUrl</span>
          <input
            type="text"
            onChange={(event) => {
              this.setState({ imgUrl: event.target.value });
            }}
            value={this.state.imgUrl}
          />
        </p>
        <p className="newMovie__input">
          <span>imdbUrl</span>
          <input
            type="text"
            onChange={(event) => {
              this.setState({ imdbUrl: event.target.value });
            }}
            value={this.state.imdbUrl}
          />
        </p>
        <p className="newMovie__input">
          <span>imdbId</span>
          <input
            type="text"
            onChange={(event) => {
              this.setState({ imdbId: event.target.value });
            }}
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

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

  handleSubmit = () => {
    const { addMovie } = this.props;

    addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.handleSubmit();
        }}
      >
        <input
          className="input"
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={(event) => {
            this.setState({
              title: event.target.value,
            });
          }}
          required
        />
        <input
          className="input"
          type="textarea"
          placeholder="Description"
          value={this.state.description}
          onChange={(event) => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <input
          className="input"
          type="text"
          placeholder="ImgUrl"
          value={this.state.ImgUrl}
          onChange={(event) => {
            this.setState({
              ImgUrl: event.target.value,
            });
          }}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="ImdbUrl"
          value={this.state.ImdbUrl}
          onChange={(event) => {
            this.setState({
              ImdbUrl: event.target.value,
            });
          }}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="ImdbId"
          value={this.state.ImdbId}
          onChange={(event) => {
            this.setState({
              ImdbId: event.target.value,
            });
          }}
          required
        />
        <button
          className="button"
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

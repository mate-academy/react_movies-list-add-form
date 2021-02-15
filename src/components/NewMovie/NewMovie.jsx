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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { addMovie } = this.props;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor="title">
          Name for title
          <input
            id="title"
            name="title"
            type="text"
            placeholder="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Write description for movie
          <input
            name="description"
            type="text"
            placeholder="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Write imgUrl for movie
          <input
            name="imgUrl"
            type="text"
            placeholder="imgUrl"
            value={this.state.imgUrl}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Write imdbUrl for movie
          <input
            name="imdbUrl"
            type="text"
            placeholder="imdbUrl"
            value={this.state.imdbUrl}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Write imdbId for movie
          <input
            name="imdbId"
            type="text"
            placeholder="imdbId"
            value={this.state.imdbId}
            onChange={this.handleChange}
          />
        </label>
        <input
          type="submit"
          onClick={() => {
            addMovie(this.state);
            this.setState({
              title: '',
              description: '',
              imgUrl: '',
              imdbUrl: '',
              imdbId: '',
            });
          }}
          value="Add new movie"
        />
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

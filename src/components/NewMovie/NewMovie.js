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
    this.clearForm();
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  clearForm() {
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
      <form onSubmit={this.submitHandler}>
        <input
          name="title"
          placeholder="title"
          value={this.state.title}
          onChange={this.onChange}
        />
        <br />
        <textarea
          name="description"
          placeholder="description"
          value={this.state.description}
          onChange={this.onChange}
        />
        <br />
        <input
          name="imgUrl"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={this.onChange}
        />
        <br />
        <input
          name="imdbUrl"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.onChange}
        />
        <br />
        <input
          name="imdbId"
          placeholder="imdbId"
          value={this.state.imdbId}
          onChange={this.onChange}
        />
        <br />
        <button type="submit">
          Add a movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

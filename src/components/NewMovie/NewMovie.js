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
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  clearForm = () => this.setState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  render() {
    return (
      <form
        onSubmit={
          event => this.props.onAdd(this.state, event, this.clearForm)
        }
      >
        <p>Put the form here</p>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbId"
          placeholder="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
        />
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <button
          type="submit"
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

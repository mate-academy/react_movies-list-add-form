import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imbdUrl: '',
    imdbId: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        this.props.onAdd(this.state);
      }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <textarea
          name="description"
          placeholder="What is the movie about?"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          name="imgUrl"
          placeholder="add imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          name="imbdUrl"
          placeholder="add imbdUrl"
          value={this.state.imbdUrl}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          name="imdbId"
          placeholder="add movie imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
        />
        <br />
        <button type="submit">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

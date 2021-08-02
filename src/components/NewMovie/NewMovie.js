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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <>
        <h1>New movie</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="title"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder="description"
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder="imgUrl"
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder="imdbUrl"
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder="imdbId"
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />

          <button type="submit">
            Add movie
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

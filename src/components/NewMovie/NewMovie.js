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
  };

  handleSubmit = (event) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    event.preventDefault();

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    return (
      <form
        className="MovieForm"
        onSubmit={this.handleSubmit}
      >
        <input
          name="title"
          type="text"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        {' '}
        <input
          name="description"
          type="text"
          placeholder="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        {' '}
        <input
          name="imgUrl"
          type="text"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
        />
        {' '}
        <input
          name="imdbUrl"
          type="text"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
        />
        {' '}
        <input
          name="imdbId"
          type="text"
          placeholder="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
        />
        {' '}

        <button type="submit">SUBMIT</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

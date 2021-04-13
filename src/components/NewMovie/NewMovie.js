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

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { addMovie } = this.props;

    event.preventDefault();
    addMovie({ ...this.state });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <input
          className="form-control-lg"
          name="title"
          value={title}
          placeholder="Title"
          onChange={this.handleChange}
          required
        />
        <input
          className="form-control-lg"
          name="description"
          value={description}
          placeholder="Description"
          onChange={this.handleChange}
          required
        />
        <input
          className="form-control-lg"
          name="imgUrl"
          value={imgUrl}
          placeholder="imgUrl"
          onChange={this.handleChange}
          required
        />
        <input
          className="form-control-lg"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="imdbUrl"
          onChange={this.handleChange}
          required
        />
        <input
          className="form-control-lg"
          name="imdbId"
          value={imdbId}
          placeholder="imdbId"
          onChange={this.handleChange}
          required
        />
        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

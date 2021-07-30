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
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { onAdd } = this.props;

    event.preventDefault();
    onAdd(this.state);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Enter title"
          value={title}
          onChange={this.handleChange}
        />
        <textarea
          type="text"
          name="description"
          className="form-control"
          placeholder="Enter description"
          value={description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          className="form-control"
          placeholder="Enter imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          className="form-control"
          placeholder="Enter imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbId"
          className="form-control"
          placeholder="Enter imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />
        <button
          className="form-btn"
          type="submit"
        >
          Add Film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

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

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addMovie({
      ...this.state,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      [name]: value,
    })
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId } = this.state;

    return (
      <div className="form">
        <h1 className="display-4">Add Movie</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
            required
          />
          <input
            className="form-control"
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            placeholder="imgUrl"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
          <input
            className="form-control"
            placeholder="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
          <input
            className="form-control"
            placeholder="imdbId"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
          <button className="btn btn-success" type="submit">Add movie</button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

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
    const movie = this.state;

    event.preventDefault();
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    this.props.addMovie(movie);
  }

  handleChange = (event) => {
    const { name } = event.target;

    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { title, description, imdbId, imgUrl, imdbUrl } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <form
        className="form sticky-top"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="title*"
          onChange={handleChange}
          value={title}
          required
        />
        <input
          type="text"
          className="form-control"
          name="description"
          placeholder="description*"
          onChange={handleChange}
          value={description}
          required
        />
        <input
          type="text"
          className="form-control"
          name="imgUrl"
          placeholder="imgUrl"
          onChange={handleChange}
          value={imgUrl}
        />
        <input
          type="text"
          className="form-control"
          name="imdbUrl"
          placeholder="imdbUrl*"
          onChange={handleChange}
          value={imdbUrl}
          required
        />
        <input
          type="text"
          className="form-control"
          name="imdbId"
          placeholder="imdbId"
          onChange={handleChange}
          value={imdbId}
        />
        <button type="submit" className="btn btn-primary">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

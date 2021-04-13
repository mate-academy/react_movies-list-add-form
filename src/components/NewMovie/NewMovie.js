import React, { Component } from 'react';
import propTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { addMovie } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    addMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          title
          <input
            value={title}
            name="title"
            onChange={this.handleChange}
          />
        </div>
        <div>
          description
          <input
            value={description}
            name="description"
            onChange={this.handleChange}
          />
        </div>
        <div>
          imgUrl
          <input
            value={imgUrl}
            name="imgUrl"
            onChange={this.handleChange}
          />
        </div>
        <div>
          imdbUrl
          <input
            value={imdbUrl}
            name="imdbUrl"
            onChange={this.handleChange}
          />
        </div>
        <div>
          imdbId
          <input
            value={imdbId}
            name="imdbId"
            onChange={this.handleChange}
          />
        </div>
        <button
          type="submit"
        >
          onAdd
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: propTypes.func.isRequired,
};

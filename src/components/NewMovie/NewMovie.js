import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value.trim(),
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;
    const { newMovie } = this.state;

    addMovie(newMovie);

    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state.newMovie;

    return (
      <form method="POST" onSubmit={this.handleSubmit}>

        <label>
          Title:
          <br />
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />

        <label>
          Description:
          <br />
          <input
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />

        <label>
          ImgUrl:
          <br />
          <input
            type="text"
            name="imgUrl"
            placeholder="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />

        <label>
          ImdbUrl:
          <br />
          <input
            type="text"
            name="imdbUrl"
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />

        <label>
          ImdbId:
          <br />
          <input
            type="text"
            name="imdbId"
            placeholder="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">
          Add
        </button>

      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

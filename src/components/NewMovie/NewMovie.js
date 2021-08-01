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

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;
    const { onMovieAdd } = this.props;

    const newMovie = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    onMovieAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imdbId: '',
      imdbUrl: '',
      imgUrl: '',
    });
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        className="box"
        onSubmit={this.handleSubmit}
      >
        <h1 className="title">Add film</h1>
        <input
          className="input"
          value={title}
          type="text"
          name="title"
          placeholder="title"
          onChange={(event) => {
            const { value, name } = event.target;

            this.handleChange(name, value);
          }}
          required
        />
        <input
          className="input"
          value={description}
          type="text"
          name="description"
          placeholder="description"
          onChange={(event) => {
            const { value, name } = event.target;

            this.handleChange(name, value);
          }}
          required
        />
        <input
          className="input"
          value={imgUrl}
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          onChange={(event) => {
            const { value, name } = event.target;

            this.handleChange(name, value);
          }}
          required
        />
        <input
          className="input"
          value={imdbUrl}
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          onChange={(event) => {
            const { value, name } = event.target;

            this.handleChange(name, value);
          }}
          required
        />
        <input
          className="input"
          value={imdbId}
          type="text"
          name="imdbId"
          placeholder="imdbId"
          onChange={(event) => {
            const { value, name } = event.target;

            this.handleChange(name, value);
          }}
          required
        />

        <button
          className="button is-primary is-outlined"
          type="submit"
        >
          add film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onMovieAdd: PropTypes.func.isRequired,
};

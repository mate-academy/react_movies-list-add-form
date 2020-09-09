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
    event.preventDefault();
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

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
      <form
        className="newMovie"
        onSubmit={this.handleSubmit}
      >
        <div>
          <label htmlFor="title">Name of movie: </label>
          <br />
          <input
            type="text"
            className="newMovie__title"
            id="title"
            name="title"
            value={title}
            required
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Movie description: </label>
          <br />
          <textarea
            className="newMovie__description"
            id="description"
            rows="5"
            cols="30"
            name="description"
            value={description}
            required
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="imgUrl">Enter imageUrl movie:</label>
          <br />
          <input
            type="text"
            className="newMovie__imgUrl"
            id="imgUrl"
            name="imgUrl"
            value={imgUrl}
            required
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="imdbUrl">Enter imdbUrl movie:</label>
          <br />
          <input
            type="text"
            className="newMovie__imdbUrl"
            name="imdbUrl"
            id="imdbUrl"
            value={imdbUrl}
            required
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="imdbId">Enter imdbId movie:</label>
          <br />
          <input
            type="text"
            className="newMovie__imdbId"
            name="imdbId"
            id="imdbId"
            value={imdbId}
            required
            onChange={this.handleChange}
          />
        </div>
        <button
          type="submit"
          className="newMovie__add"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

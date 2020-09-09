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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;

    onAdd(this.state);

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
        <h2 className="title">Add new movie</h2>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <label
            htmlFor="title"
          >
            Movie name:
          </label>
          <input
            className="form__input"
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
            required
          />

          <label
            htmlFor="description"
          >
            Movie description:
          </label>
          <textarea
            className="form__input form__textarea"
            id="description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />

          <label
            htmlFor="img"
          >
            Movie poster:
          </label>
          <input
            className="form__input"
            id="img"
            type="url"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />

          <label
            htmlFor="imdbUrl"
          >
            Movie IMDB link:
          </label>
          <input
            className="form__input"
            id="imdbUrl"
            type="url"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />

          <label
            htmlFor="imdbId"
          >
            Movie IMDB id:
          </label>
          <input
            className="form__input"
            id="imdbId"
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />

          <button
            type="submit"
          >
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

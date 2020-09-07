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

  handleAdd = (event) => {
    event.preventDefault();

    if (Object.values(this.state).some(item => !item)) {
      return;
    }

    this.props.onAdd({ ...this.state });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value.trimLeft() });
  }

  render() {
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;

    return (
      <form
        className="movie"
        onSubmit={this.handleAdd}
      >
        <input
          type="text"
          name="title"
          className="movie__item movie__item_title"
          value={title}
          placeholder="Movie title"
          required
          onChange={this.handleChange}
        />
        <textarea
          name="description"
          className="movie__item movie__item_description"
          value={description}
          placeholder="Movie description"
          required
          onChange={this.handleChange}
          resize={false}
        />
        <input
          type="text"
          name="imgUrl"
          className="movie__item movie__item_imgUrl"
          value={imgUrl}
          placeholder="Movie imgUrl"
          required
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          className="movie__item movie__item_imdbUrl"
          value={imdbUrl}
          placeholder="Movie imdbUrl"
          required
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbId"
          className="movie__item movie__item_imdbId"
          value={imdbId}
          placeholder="Movie imdbId"
          required
          onChange={this.handleChange}
        />

        <button
          type="submit"
          className="movie__item movie__item_add"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

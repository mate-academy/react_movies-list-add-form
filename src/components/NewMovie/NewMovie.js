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

  onAdd = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  createMovie = (event) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.addMovie(newMovie);
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
      <form className="form" onSubmit={event => this.createMovie(event)}>
        <label htmlFor="title">
          Title
        </label>
        <input
          type="text"
          className="form__item"
          placeholder="Title"
          id="title"
          name="title"
          value={title}
          onChange={this.onAdd}
        />
        <label htmlFor="description">
          Description
        </label>
        <input
          type="text"
          className="form__item"
          placeholder="Description"
          id="description"
          name="description"
          value={description}
          onChange={this.onAdd}
        />
        <label htmlFor="imgUrl">
          ImgUrl
        </label>
        <input
          type="text"
          className="form__item"
          placeholder="imgUrl"
          id="imgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={this.onAdd}
        />
        <label htmlFor="imdbUrl">
          ImdbUrl
        </label>
        <input
          type="text"
          className="form__item"
          placeholder="imdbUrl"
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.onAdd}
        />
        <label htmlFor="imdbId">
          ImdbId
        </label>
        <input
          type="text"
          className="form__item"
          placeholder="imdbId"
          id="imdbId"
          name="imdbId"
          value={imdbId}
          onChange={this.onAdd}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

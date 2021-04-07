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

  setMovie = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    this.props.onAdd({
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
  }

  render() {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    return (
      <div>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <h2 className="head"><strong>Add movies to list here</strong></h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="form__input"
            value={title}
            onChange={this.setMovie}
            required
          />
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="form__input form__textarea"
            value={description}
            onChange={this.setMovie}
          />
          <input
            type="text"
            name="imgUrl"
            placeholder="ImgUrl"
            className="form__input"
            value={imgUrl}
            onChange={this.setMovie}
            required
          />
          <input
            type="text"
            name="imdbUrl"
            placeholder="ImdbUrl"
            className="form__input"
            value={imdbUrl}
            onChange={this.setMovie}
            required
          />
          <input
            type="text"
            name="imdbId"
            placeholder="ImdbId"
            className="form__input"
            value={imdbId}
            onChange={this.setMovie}
            required
          />
          <button
            type="submit"
            className="button"
          >
            <strong>Add movie</strong>
          </button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

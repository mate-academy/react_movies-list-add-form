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

  onChangeMovie = (event) => {
    const { name, value } = event.target;

    return this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state);

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
      <form className="form" onSubmit={this.handleSubmit}>
        <label className="form__label" htmlFor="input__title">
          Title:
        </label>
        <input
          type="text"
          className="form__input"
          id="input__title"
          placeholder="title..."
          name="title"
          value={title}
          onChange={this.onChangeMovie}
          required
        />
        <label className="form__label" htmlFor="description__input">
          Description
        </label>
        <textarea
          type="text"
          className="form__textarea"
          id="description__input"
          value={description}
          placeholder="description..."
          name="description"
          onChange={this.onChangeMovie}
        />

        <label className="form__label" htmlFor="imgurl__input">
          ImgURL:
        </label>
        <input
          type="text"
          className="form__input"
          id="imgurl__input"
          value={imgUrl}
          placeholder="imgURL..."
          name="imgUrl"
          onChange={this.onChangeMovie}
          required
        />

        <label className="form__label" htmlFor="imdburl__input">
          ImdbURL:
        </label>
        <input
          type="text"
          className="form__input"
          id="imdburl__input"
          value={imdbUrl}
          placeholder="imbdURL..."
          name="imdbUrl"
          onChange={this.onChangeMovie}
          required
        />

        <label className="form__label" htmlFor="imbdId__input">
          ImdbID:
        </label>
        <input
          type="text"
          className="form__input"
          id="imbdId__input"
          value={imdbId}
          placeholder="imbdID..."
          name="imdbId"
          onChange={this.onChangeMovie}
          required
        />

        <button
          type="submit"
          className="form__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

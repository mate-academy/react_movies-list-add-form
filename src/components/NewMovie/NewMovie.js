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

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onAdd(this.state);
    this.resetForm();
  }

  resetForm = () => {
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

    this.setState({
      [name]: value.trimStart(),
    });
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label
          className="form__label"
          htmlFor="title"
        >
          Movie title
        </label>
        <input
          className="form__input"
          id="title"
          name="title"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Enter a title"
          autoComplete="off"
          required
        />

        <label
          className="form__label"
          htmlFor="descriprion"
        >
          Movie descriprion
        </label>
        <textarea
          className="form__input form__input-textarea"
          id="descriprion"
          name="descriprion"
          value={this.state.descriprion}
          onChange={this.handleChange}
          placeholder="Enter a descriprion"
          autoComplete="off"
          required
        />

        <label
          className="form__label"
          htmlFor="imgUrl"
        >
          Poster
        </label>
        <input
          className="form__input"
          id="imgUrl"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          placeholder="Enter a link"
          autoComplete="off"
          required
        />

        <label
          className="form__label"
          htmlFor="imdbUrl"
        >
          Link on imdb
        </label>
        <input
          className="form__input"
          id="imdbUrl"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          placeholder="Enter a link"
          autoComplete="off"
          required
        />

        <label
          className="form__label"
          htmlFor="imdbId"
        >
          Imdb id
        </label>
        <input
          className="form__input"
          id="imdbId"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
          placeholder="Enter an imdb id"
          autoComplete="off"
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
  onAdd: PropTypes.func.isRequired,
};

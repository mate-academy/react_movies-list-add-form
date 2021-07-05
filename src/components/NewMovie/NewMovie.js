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
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { onAdd } = this.props;
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();

          const stateValues = Object.values(this.state);

          if (stateValues.map(value => value.trim()).includes('')) {
            return;
          }

          onAdd(this.state);

          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }}
      >
        <label
          className="form__label"
          htmlFor="title"
        >
          Title:

          <input
            type="text"
            name="title"
            id="title"
            value={title}
            className="form__input"
            placeholder="Title"
            onChange={this.handleChange}
          />
        </label>

        <label
          className="form__label"
          htmlFor="imgUrl"
        >
          Image link:

          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={imgUrl}
            className="form__input"
            placeholder="Image link"
            onChange={this.handleChange}
          />
        </label>

        <label
          className="form__label"
          htmlFor="imdbUrl"
        >
          Imdb link:

          <input
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            value={imdbUrl}
            className="form__input"
            placeholder="Imdb link"
            onChange={this.handleChange}
          />
        </label>

        <label
          className="form__label"
          htmlFor="imdbId"
        >
          Imdb Id:

          <input
            type="text"
            name="imdbId"
            id="imdbId"
            value={imdbId}
            className="form__input"
            placeholder="Imdb Id"
            onChange={this.handleChange}
          />
        </label>

        <label
          className="form__label"
          htmlFor="description"
        >
          Description:

          <textarea
            name="description"
            id="description"
            value={description}
            className="form__textarea"
            placeholder="Description"
            onChange={this.handleChange}
          />
        </label>

        <button
          type="submit"
          className="form__button"
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

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

  inputHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    const { onAdd } = this.props;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const newMovie = {
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          };

          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });

          onAdd(newMovie);
        }}
      >

        <label htmlFor="title">
          Title:&nbsp;
          <input
            required
            placeholder="Title"
            name="title"
            className="form__input"
            id="title"
            value={title}
            onChange={(event) => {
              this.inputHandler(event);
            }}
          />
        </label>

        <label htmlFor="description">
          Description:&nbsp;
          <input
            required
            placeholder="Description"
            name="description"
            className="form__input"
            id="description"
            value={description}
            onChange={(event) => {
              this.inputHandler(event);
            }}
          />
        </label>

        <label htmlFor="imgUrl">
          Img Url:&nbsp;
          <input
            required
            placeholder="Img Url"
            name="imgUrl"
            className="form__input"
            id="imgUrl"
            value={imgUrl}
            onChange={(event) => {
              this.inputHandler(event);
            }}
          />
        </label>

        <label htmlFor="imdbUrl">
          IMDb Url:&nbsp;
          <input
            required
            placeholder="IMDb Url"
            name="imdbUrl"
            className="form__input"
            id="imdbUrl"
            value={imdbUrl}
            onChange={(event) => {
              this.inputHandler(event);
            }}
          />
        </label>

        <label htmlFor="imdbId">
          IMDb Id:&nbsp;
          <input
            required
            placeholder="IMDb Id"
            name="imdbId"
            className="form__input"
            id="imdbId"
            value={imdbId}
            onChange={(event) => {
              this.inputHandler(event);
            }}
          />
        </label>

        <button
          type="submit"
        >
          Add a film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

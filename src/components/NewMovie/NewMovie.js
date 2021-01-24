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

  inputHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        className="NewMovie__form"
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

          this.props.onAdd(newMovie);
        }}
      >
        <label htmlFor="title">
          Title:&nbsp;
          <input
            placeholder="Title"
            name="title"
            className="NewMovie__form-input"
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
            placeholder="Description"
            name="description"
            className="NewMovie__form-input"
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
            placeholder="Img Url"
            name="imgUrl"
            className="NewMovie__form-input"
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
            placeholder="IMDb Url"
            name="imdbUrl"
            className="NewMovie__form-input"
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
            placeholder="IMDb Id"
            name="imdbId"
            className="NewMovie__form-input"
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

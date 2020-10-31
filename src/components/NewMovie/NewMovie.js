import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbLink: '',
    imdbId: '',
    titleError: false,
    imgUrlError: false,
    imdbLinkError: false,
    imdbIdError: false,
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onBlur = (input, errorName) => {
    if (input === '') {
      this.setState({
        [errorName]: true,
      });
    }
  }

  resetState() {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbLink: '',
      imdbId: '',
      titleError: false,
      imgUrlError: false,
      imdbLinkError: false,
      imdbIdError: false,
    });
  }

  render() {
    const { addMovie } = this.props;
    const { titleError, imgUrlError, imdbLinkError, imdbIdError } = this.state;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          addMovie(this.state);
          this.resetState();
        }}
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={this.state.title}
          name="title"
          placeholder="Title"
          autoComplete="off"
          required
          onChange={(event) => {
            this.onChange(event);
          }}
          onBlur={() => {
            this.onBlur(this.state.title, 'titleError');
          }}
        />

        {titleError && (
          <p>This field should not be empty</p>
        )}

        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          value={this.state.description}
          name="description"
          placeholder="Description"
          autoComplete="off"
          onChange={(event) => {
            this.onChange(event);
          }}
        />

        <label htmlFor="imgUrl">Image:</label>
        <input
          type="url"
          value={this.state.imgUrl}
          name="imgUrl"
          placeholder="https://example.com"
          pattern="https://.*"
          autoComplete="off"
          required
          onChange={(event) => {
            this.onChange(event);
          }}
          onBlur={() => {
            this.onBlur(this.state.imgUrl, 'imgUrlError');
          }}
        />

        {imgUrlError && (
          <p>This field should not be empty</p>
        )}

        <label htmlFor="imdbLink">IMDb link:</label>
        <input
          type="url"
          value={this.state.imdbLink}
          name="imdbLink"
          placeholder="https://example.com"
          pattern="https://.*"
          autoComplete="off"
          required
          onChange={(event) => {
            this.onChange(event);
          }}
          onBlur={() => {
            this.onBlur(this.state.imdbLink, 'imdbLinkError');
          }}
        />

        {imdbLinkError && (
          <p>This field should not be empty</p>
        )}

        <label htmlFor="imdbId">IMDb id:</label>
        <input
          type="text"
          value={this.state.imdbId}
          name="imdbId"
          placeholder="id"
          autoComplete="off"
          required
          onChange={(event) => {
            this.onChange(event);
          }}
          onBlur={() => {
            this.onBlur(this.state.imdbId, 'imdbIdError');
          }}
        />

        {imdbIdError && (
          <p>This field should not be empty</p>
        )}

        <button type="submit">save</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

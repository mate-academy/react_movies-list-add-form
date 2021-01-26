import React, { Component } from 'react';
import ClassNames from 'classnames';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgUrlError: false,
    imdbUrlError: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'imgUrl') {
      this.setState({
        imgUrlError: false,
      });
    }

    if (name === 'imdbUrl') {
      this.setState({
        imdbUrlError: false,
      });
    }

    this.setState({
      [name]: value,
    });
  }

  handleBlur = (event) => {
    const { name, value } = event.target;
    // eslint-disable-next-line
    const urlValidator = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (name === 'imgUrl' && !urlValidator.test(value)) {
      this.setState({
        imgUrlError: true,
      });
    }

    if (name === 'imdbUrl' && !urlValidator.test(value)) {
      this.setState({
        imdbUrlError: true,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.imgUrlError
      || this.state.imdbUrlError) {
      return;
    }

    const movie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.onAdd(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      imgUrlError: false,
      imdbUrlError: false,
    });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="add-movie-form"
      >
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="imgUrl"
          className={ClassNames({ error: this.state.imgUrlError })}
          value={this.state.imgUrl}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder="imgUrl"
          required
        />
        <span
          className={ClassNames({ 'url-error': this.state.imgUrlError })}
        />
        <input
          type="text"
          name="imdbUrl"
          className={ClassNames({ error: this.state.imdbUrlError })}
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder="imdbUrl"
          required
        />
        <span
          className={ClassNames({ 'url-error': this.state.imdbUrlError })}
        />
        <input
          type="text"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder="imdbId"
          required
        />
        <button
          type="submit"
        >
          Add a movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

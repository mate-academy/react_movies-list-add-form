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

  textSaving = (event) => {
    if (event.target.value === ' ') {
      return;
    }

    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.props.addMovie(this.state);
          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }}
      >
        <label>
          <p>Title:</p>
          <input
            className="form__item"
            type="text"
            name="title"
            value={title}
            onChange={this.textSaving}
            required
          />
        </label>
        <label>
          <p>Description:</p>
          <textarea
            className="form__item"
            name="description"
            rows="5"
            value={description}
            onChange={this.textSaving}
            required
          />
        </label>
        <label>
          <p>imgUrl:</p>
          <input
            className="form__item"
            type="url"
            name="imgUrl"
            value={imgUrl}
            onChange={this.textSaving}
            required
          />
        </label>
        <label>
          <p>imdbUrl:</p>
          <input
            className="form__item"
            type="url"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.textSaving}
            required
          />
        </label>
        <label>
          <p>imdbId:</p>
          <input
            className="form__item"
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.textSaving}
            required
          />
        </label>
        <button type="submit">ADD</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

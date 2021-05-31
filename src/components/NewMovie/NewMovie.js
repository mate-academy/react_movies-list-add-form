import React, { Component } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      [name]: value.trim(),
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    // eslint-disable-next-line
    this.props.addMovie(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="submitForm">
        <input
          required
          className={classNames(
            'submitForm__form',
            { submitForm__active: this.state.title !== '' },
          )}
          type="text"
          placeholder="title"
          value={title}
          name="title"
          onChange={this.handleChange}
        />
        <input
          required
          className={classNames(
            'submitForm__form',
            { submitForm__active: this.state.description !== '' },
          )}
          type="text"
          placeholder="description"
          value={description}
          name="description"
          onChange={this.handleChange}
        />
        <input
          required
          className={classNames(
            'submitForm__form',
            { submitForm__active: this.state.imgUrl !== '' },
          )}
          type="url"
          placeholder="imgUrl"
          value={imgUrl}
          name="imgUrl"
          onChange={this.handleChange}
        />
        <input
          required
          className={classNames(
            'submitForm__form',
            { submitForm__active: this.state.imdbUrl !== '' },
          )}
          type="url"
          placeholder="imdbUrl"
          value={imdbUrl}
          name="imdbUrl"
          onChange={this.handleChange}
        />
        <input
          required
          className={classNames(
            'submitForm__form',
            { submitForm__active: this.state.imdbId !== '' },
          )}
          type="url"
          placeholder="imdbId"
          value={imdbId}
          name="imdbId"
          onChange={this.handleChange}
        />
        <button type="submit" className="formButton">
          Add movie
        </button>
      </form>
    );
  }
}

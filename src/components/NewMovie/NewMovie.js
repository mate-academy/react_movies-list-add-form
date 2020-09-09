import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    error: false,
  };

  editState = ({ target }) => {
    const newValue = target.name;

    this.setState({
      error: false,
      [newValue]: target.value,
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId, error } = this.state;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (
            !title.trim()
            || !description.trim()
            || !imgUrl.trim()
            || !imdbUrl.trim()
            || !imdbId.trim()
          ) {
            this.setState({
              error: true,
            });

            return;
          }

          this.props.addedMovie(this.state);
        }}
      >
        <label className="newMovie__label">
          <span>Name of the movie</span>
          <input
            className="newMovie__input"
            placeholder="Title"
            type="text"
            value={this.state.title}
            name="title"
            onChange={event => this.editState(event)}
          />
        </label>

        <label className="newMovie__label">
          <span>Description</span>
          <textarea
            className="newMovie__input newMovie__input-textarea"
            placeholder="Description"
            value={this.state.description}
            name="description"
            onChange={event => this.editState(event)}
          />
        </label>

        <label className="newMovie__label">
          <span>Link for image</span>
          <input
            className="newMovie__input"
            placeholder="Enter link for image"
            type="url"
            value={this.state.imgUrl}
            name="imgUrl"
            onChange={event => this.editState(event)}
          />
        </label>

        <label className="newMovie__label">
          <span>IMDb link</span>
          <input
            className="newMovie__input"
            placeholder="Enter the IMDb link"
            type="url"
            value={this.state.imdbUrl}
            name="imdbUrl"
            onChange={event => this.editState(event)}
          />
        </label>

        <label className="newMovie__label">
          <span>ID on IMDb</span>
          <input
            className="newMovie__input"
            placeholder="Enter ID on IMDb"
            type="text"
            value={this.state.imdbId}
            name="imdbId"
            onChange={event => this.editState(event)}
          />
        </label>

        <button
          className={ClassNames(
            'newMovie__input newMovie__input__button',
            { ' newMovie__input-error': error },
          )}
          type="submit"
        >
          Add
        </button>

        {
          !error
          || (
            <p className="newMovie__error">
              Please, fill gaps in!
            </p>
          )
        }
      </form>
    );
  }
}

NewMovie.propTypes = {
  addedMovie: PropTypes.func.isRequired,
};

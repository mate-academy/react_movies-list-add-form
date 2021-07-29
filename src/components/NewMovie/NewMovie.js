import React, { Component } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    submitWasPressed: false,
  };

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  createMovieCard = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (
      title !== ''
      && imgUrl !== ''
      && imdbUrl !== ''
      && imdbId !== ''
    ) {
      const newMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      this.props.onAdd(newMovie);

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        submitWasPressed: false,
      });
    } else {
      this.setState({
        submitWasPressed: true,
      });
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      submitWasPressed,
    } = this.state;

    return (
      <form
        className="new-movie"
        onSubmit={event => event.preventDefault()}
      >
        <label
          className="new-movie__title-label"
        >
          Enter title:
          <input
            type="text"
            name="title"
            className={
              classNames(
                'new-movie__title input',
                { showInputError: !title && submitWasPressed },
              )
            }
            placeholder="Enter title"
            value={title}
            onChange={this.onChange}
            required
          />
        </label>
        <span
          className={
                classNames(
                  (!title && submitWasPressed)
                    ? 'showError'
                    : 'hideError',
                )
              }
        >
          Please, enter the title.
        </span>

        <label
          className="new-movie__description-label"
        >
          Enter description:
          <textarea
            type="text"
            name="description"
            className="new-movie__description input"
            placeholder="Enter description"
            value={description}
            onChange={this.onChange}
          />
        </label>
        <label
          className="new-movie__imgUrl-label"
        >
          Enter image url address:
          <input
            type="text"
            name="imgUrl"
            className={
              classNames(
                'new-movie__imgUrl input',
                { showInputError: !imgUrl && submitWasPressed },
              )
            }
            placeholder="Enter imgUrl"
            value={imgUrl}
            onChange={this.onChange}
            required
          />
        </label>
        <span
          className={
                classNames(
                  (!imgUrl && submitWasPressed)
                    ? 'showError'
                    : 'hideError',
                )
              }
        >
          Please, enter the title.
        </span>

        <label
          className="new-movie__imdbUrl-label"
        >
          Enter url address from imdb:
          <input
            type="text"
            name="imdbUrl"
            className={
              classNames(
                'new-movie__imdbUrl input',
                { showInputError: !imdbUrl && submitWasPressed },
              )
            }
            placeholder="Enter imdbUrl"
            value={imdbUrl}
            onChange={this.onChange}
            required
          />
        </label>
        <span
          className={
                classNames(
                  (!imdbUrl && submitWasPressed)
                    ? 'showError'
                    : 'hideError',
                )
              }
        >
          Please, enter the title.
        </span>

        <label
          className="new-movie__imdbId-label"
        >
          Enter imdbId address from imdb:
          <input
            type="text"
            name="imdbId"
            className={
              classNames(
                'new-movie__imdbId input',
                { showInputError: !imdbId && submitWasPressed },
              )
            }
            placeholder="Enter imdbId"
            value={imdbId}
            onChange={this.onChange}
            required
          />
        </label>
        <span
          className={
            classNames(
              (!imdbId && submitWasPressed)
                ? 'showError'
                : 'hideError',
            )
          }
        >
          Please, enter the title.
        </span>
        <button
          type="button"
          className="new-movie__submit-button"
          onClick={this.createMovieCard}
        >
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

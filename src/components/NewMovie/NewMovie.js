import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
    isEmpty: false,
  };

  handlerValue = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      [name]: value,
    }));
  }

  handlerSubmit = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (
      (title.trim().length === 0)
      || (description.trim().length === 0)
      || (imgUrl.trim().length === 0)
      || (imdbUrl.trim().length === 0)
      || (imdbId.trim().length === 0)
    ) {
      this.setState({
        isEmpty: true,
      });

      return;
    }

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isEmpty: false,
    });
  }

  render() {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
      isEmpty,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.handlerSubmit();
        }}
      >

        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(event) => {
            this.handlerValue(event);
          }}
        />

        <input
          type="text"
          name="imgUrl"
          placeholder="image url"
          value={imgUrl}
          onChange={(event) => {
            this.handlerValue(event);
          }}
        />

        <input
          type="text"
          name="imdbUrl"
          placeholder="IMDb url"
          value={imdbUrl}
          onChange={(event) => {
            this.handlerValue(event);
          }}
        />

        <input
          type="text"
          name="imdbId"
          placeholder="IMDb id"
          value={imdbId}
          onChange={(event) => {
            this.handlerValue(event);
          }}
        />

        <textarea
          rows="4"
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={(event) => {
            this.handlerValue(event);
          }}
        />
        {isEmpty && (
          <div className="error">
            Please fill all field
          </div>
        )}
        <button
          className="form__button"
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

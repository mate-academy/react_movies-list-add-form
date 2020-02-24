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
    error: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let isError = false;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (title.trim() === ''
        || imgUrl.trim() === ''
        || imdbUrl.trim() === ''
        || imdbId.trim() === '') {
      isError = true;
    }

    if (!isError) {
      this.props.addMovie({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
    }

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      error: (title.trim() === ''
      || imgUrl.trim() === ''
      || imdbUrl.trim() === ''
      || imdbId.trim() === ''),
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      error,
    } = this.state;

    return (
      <form className="new-movie" onSubmit={this.handleSubmit}>
        <label
          htmlFor="title"
          className="new-movie__caption"
        >
         Title:
        </label>
        <input
          className="new-movie__input"
          id="title"
          name="title"
          placeholder="Enter the movie title"
          value={title}
          onChange={this.handleChange}
        />
        {error
          && title.trim() === ''
          && <div className="new-movie__error">Enter title</div>}
        <label
          htmlFor="description"
          className="new-movie__caption"
        >
          Description:
        </label>
        <textarea
          className="new-movie__input new-movie__textarea"
          placeholder="Enter the movie description"
          id="description"
          name="description"
          rows="8"
          value={description}
          onChange={this.handleChange}
        />
        <label
          htmlFor="imgUrl"
          className="new-movie__caption"
        >
          URL of image:
        </label>
        <input
          id="imgUrl"
          name="imgUrl"
          placeholder="Enter the image URL"
          className="new-movie__input"
          value={imgUrl}
          onChange={this.handleChange}
        />
        {error
          && imgUrl.trim() === ''
          && <div className="new-movie__error">Enter the imgURL</div>}
        <label
          htmlFor="imdbUrl"
          className="new-movie__caption"
        >
          Movie imdbUrl:
        </label>
        <input
          id="imdbUrl"
          name="imdbUrl"
          placeholder="Enter the imdb URL"
          className="new-movie__input"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        {error
          && imdbUrl.trim() === ''
          && <div className="new-movie__error">Enter the imdbUrl</div>}
        <label
          htmlFor="imdbId"
          className="new-movie__caption"
        >
          Imdb id:
        </label>
        <input
          id="imdbId"
          name="imdbId"
          className="new-movie__input"
          placeholder="Enter the imdb ID"
          value={imdbId}
          onChange={this.handleChange}
        />
        {error
          && imdbId.trim() === ''
          && <div className="new-movie__error">Enter the imdbId</div>}
        <button
          type="submit"
          className="new-movie__button"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

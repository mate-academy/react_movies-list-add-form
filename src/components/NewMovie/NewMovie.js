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

  addTitle = ({ target }) => {
    this.setState({
      title: target.value,
    });
  }

  addDescription = ({ target }) => {
    this.setState({
      description: target.value,
    });
  }

  addImgUrl = ({ target }) => {
    this.setState({
      imgUrl: target.value,
    });
  }

  addImdbUrl = ({ target }) => {
    this.setState({
      imdbUrl: target.value,
    });
  }

  addImdbId = ({ target }) => {
    this.setState({
      imdbId: target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    this.props.addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
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
          placeholder="Enter the movie title"
          value={title}
          onChange={this.addTitle}
        />
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
          rows="8"
          value={description}
          onChange={this.addDescription}
        />
        <label
          htmlFor="imgUrl"
          className="new-movie__caption"
        >
          URL of image:
        </label>
        <input
          id="imgUrl"
          placeholder="Enter the image URL"
          className="new-movie__input"
          value={imgUrl}
          onChange={this.addImgUrl}
        />
        <label
          htmlFor="imdbUrl"
          className="new-movie__caption"
        >
          Movie imdbUrl:
        </label>
        <input
          id="imdbUrl"
          placeholder="Enter the imdb URL"
          className="new-movie__input"
          value={imdbUrl}
          onChange={this.addImdbUrl}
        />
        <label
          htmlFor="imdbId"
          className="new-movie__caption"
        >
          Imdb id:
        </label>
        <input
          id="imdbId"
          className="new-movie__input"
          placeholder="Enter the imdb ID"
          value={imdbId}
          onChange={this.addImdbId}
        />
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

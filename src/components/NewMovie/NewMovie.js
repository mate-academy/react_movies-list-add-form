import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      this.setState({
        errors: true,
      });

      return;
    }

    addMovie(title, description, imgUrl, imdbUrl, imdbId);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errors: false,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
    } = this.state;

    return (
      <form
        className="ui form"
        name="movie"
        onSubmit={this.handleSubmit}
      >
        <label>
          Enter title
          <input
            className="ui input"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter description
          <input
            type="text"
            className="ui input"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter imgUrl
          <input
            type="text"
            className="ui input"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter imdbUrl
          <input
            type="text"
            className="ui input"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter imdbId
          <input
            type="number"
            className="ui input"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
        </label>
        <div>
          <button
            type="submit"
            className="ui button"
          >
            Add movie
          </button>
          {errors
            ? (
              <p
                className="ui floating message"
                style={{ color: 'red' }}
              >
                Enter all data
              </p>
            )
            : ''
          }
        </div>

      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

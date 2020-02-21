import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { addMovie } = this.props;

    addMovie({
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
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <div>
        <form
          className="field"
          onSubmit={this.handleSubmit}
        >
          <label className="label" htmlFor="title">Title:</label>
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Enter the movie title"
            value={title}
            onChange={this.handleChange}
          />
          <label className="label" htmlFor="description">Description:</label>
          <textarea
            className="textarea"
            type="text"
            name="description"
            placeholder="Enter the movie description"
            value={description}
            onChange={this.handleChange}
          />
          <label className="label" htmlFor="imgUrl">Image Url:</label>
          <input
            className="input"
            type="text"
            name="imgUrl"
            placeholder="Enter Image Url"
            value={imgUrl}
            onChange={this.handleChange}
          />
          <label className="label" htmlFor="imdbUrl">IMDb Url:</label>
          <input
            className="input"
            type="text"
            name="imdbUrl"
            placeholder="Enter IMDb Url"
            value={imdbUrl}
            onChange={this.handleChange}
          />
          <label className="label" htmlFor="imdbId">IMDb Id:</label>
          <input
            className="input"
            type="text"
            name="imdbId"
            placeholder="Enter IMDb Id"
            value={imdbId}
            onChange={this.handleChange}
          />
          <div className="control">
            <button className="button is-link" type="submit">
              Add Movie
            </button>
          </div>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

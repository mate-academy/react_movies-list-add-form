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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onAdd(this.state);

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
      <form
        className="movieForm"
        onSubmit={this.handleSubmit}
      >
        <div className="movieForm__container">
          <label
            htmlFor="title"
            className="movieForm__label"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="movieForm__textField"
            value={title}
            placeholder="Enter the title"
            onChange={this.handleChange}
          />
          <label
            htmlFor="description"
            className="movieForm__label"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="movieForm__textField"
            value={description}
            placeholder="Enter description"
            onChange={this.handleChange}
          />
          <label
            htmlFor="imgUrl"
            className="movieForm__label"
          >
            Movie image link
          </label>
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            className="movieForm__textField"
            value={imgUrl}
            placeholder="Enter movie image link"
            onChange={this.handleChange}
          />
          <label
            htmlFor="imdbUrl"
            className="movieForm__label"
          >
            IMDB link
          </label>
          <input
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            className="movieForm__textField"
            value={imdbUrl}
            placeholder="Enter IMBD link"
            onChange={this.handleChange}
          />
          <label
            htmlFor="imdbId"
            className="movieForm__label"
          >
            IMDB ID
          </label>
          <input
            type="text"
            name="imdbId"
            id="imdbId"
            className="movieForm__textField"
            value={imdbId}
            placeholder="Enter IMBD ID"
            onChange={this.handleChange}
          />
        </div>
        <button
          type="submit"
          className="movieForm__addButton"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

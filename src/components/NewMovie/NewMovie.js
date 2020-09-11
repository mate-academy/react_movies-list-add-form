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
      [name]: value.trim(),
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
        <input
          type="text"
          name="title"
          className="movieForm__textField"
          value={title}
          placeholder="Enter the title"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          className="movieForm__textField"
          value={description}
          placeholder="Enter description"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          className="movieForm__textField"
          value={imgUrl}
          placeholder="Enter movie image link"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          className="movieForm__textField"
          value={imdbUrl}
          placeholder="Enter IMBD link"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbId"
          className="movieForm__textField"
          value={imdbId}
          placeholder="Enter IMBD ID"
          onChange={this.handleChange}
        />
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

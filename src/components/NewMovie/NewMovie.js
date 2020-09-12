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
    error: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const checkEmptyFields = Object.values(this.state)
      .every(item => (item !== ''));

    const checkIfOnlySpacesStart = Object.values(this.state)
      .map(item => [...item].every(elem => elem === ' '));

    const checkIfOnlySpacesEnd = checkIfOnlySpacesStart.some(x => x);

    ((checkEmptyFields && !checkIfOnlySpacesEnd)
      && (addMovie({
        title,
        description,
        imdbUrl,
        imdbId,
        imgUrl,
      })))
      || (this.setState({
        error: true,
      }));

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  inputValueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { title, description, imdbUrl, imdbId, imgUrl } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="formAddMovie">
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={this.inputValueChange}
            required
          />
          {(this.state.error)
           && (<span className="warning">Enter a valid title</span>)}
        </label>
        <label htmlFor="description">
          Description
          <input
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={this.inputValueChange}
          />
          {(this.state.error)
           && (<span className="warning">Enter a valid description</span>)}
        </label>
        <label htmlFor="imgUrl">
          imgUrl
          <input
            type="text"
            name="imgUrl"
            placeholder="imgUrl"
            value={imgUrl}
            onChange={this.inputValueChange}
            required
          />
          {(this.state.error)
          && (<span className="warning">Enter a valid imgUrl</span>)}
        </label>
        <label htmlFor="imdbUrl">
          imdbUrl
          <input
            type="text"
            name="imdbUrl"
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={this.inputValueChange}
            required
          />
          {(this.state.error)
           && (<span className="warning">Enter a valid imdbUrl</span>)}
        </label>
        <label htmlFor="imdbId">
          imdbId
          <input
            type="text"
            name="imdbId"
            placeholder="imdbId"
            value={imdbId}
            onChange={this.inputValueChange}
            required
          />
          {(this.state.error)
           && (<span className="warning">Enter a valid imdbUrl</span>)}
        </label>
        <button
          type="submit"
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

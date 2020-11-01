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

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  submitNewMovie = (event) => {
    event.preventDefault();
    this.props.addMovie(this.state);

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
      <form className="newMovie" onSubmit={this.submitNewMovie}>
        Title
        <input
          className="newMovie__input"
          name="title"
          value={title}
          onChange={this.onChange}
          required
        />
        Description
        <input
          className="newMovie__input"
          name="description"
          value={description}
          onChange={this.onChange}
          required
        />
        ImgUrl
        <input
          placeholder="https://example.com"
          className="newMovie__input"
          name="imgUrl"
          value={imgUrl}
          onChange={this.onChange}
          pattern="https://.*"
          type="url"
          required
        />
        ImdbUrl
        <input
          placeholder="https://example.com"
          className="newMovie__input"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.onChange}
          pattern="https://.*"
          type="url"
          required
        />
        ImdbId
        <input
          className="newMovie__input"
          name="imdbId"
          value={imdbId}
          onChange={this.onChange}
          required
        />
        <button type="submit">Add new movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

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

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { onAdd } = this.props;

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    onAdd({
      title, description, imgUrl, imdbUrl, imdbId,
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form-block">
        <h1 className="title">Add new movie</h1>
        <input
          id="title"
          className="form-block__input"
          type="text"
          placeholder="Enter movie name"
          value={title}
          onChange={({ target }) => {
            this.setState({ title: target.value });
          }}
          required
        />
        <textarea
          className="form-block__input form-block__textarea"
          type="text"
          placeholder="Enter movie desccription"
          value={description}
          onChange={({ target }) => {
            this.setState({ description: target.value });
          }}
          required
        />
        <input
          className="form-block__input"
          type="url"
          placeholder="Enter path to movie poster"
          value={imgUrl}
          onChange={({ target }) => {
            this.setState({ imgUrl: target.value });
          }}
          required
        />
        <input
          className="form-block__input"
          type="url"
          placeholder="Enter path to movie poster"
          value={imdbUrl}
          onChange={({ target }) => {
            this.setState({ imdbUrl: target.value });
          }}
          required
        />
        <input
          className="form-block__input"
          type="text"
          placeholder="Enter path to movie poster"
          value={imdbId}
          onChange={({ target }) => {
            this.setState({ imdbId: target.value });
          }}
          required
        />
        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

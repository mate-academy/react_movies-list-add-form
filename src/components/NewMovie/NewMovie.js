import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

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
      error: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { onAdd } = this.props;

    if (!title.trim() || !imdbId.trim()) {
      this.setState({ error: true });

      return;
    }

    onAdd({
      title, description, imgUrl, imdbUrl, imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      error: false,
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        Movie name:
        <div>
          <input
            className="input"
            value={title}
            type="text"
            onChange={this.handleChange}
            name="title"
            id={title}
            required
          />
        </div>
        Description:
        <div>
          <input
            className="input"
            value={description}
            type="text"
            onChange={this.handleChange}
            name="description"
            id="description"
            required
          />
        </div>
        imgUrl:
        <div>
          <input
            className="input"
            value={imgUrl}
            type="text"
            onChange={this.handleChange}
            name="imgUrl"
            id="imgUrl"
            required
          />
        </div>
        imdbUrl:
        <div>
          <input
            className="input"
            value={imdbUrl}
            type="text"
            onChange={this.handleChange}
            name="imdbUrl"
            id="imdbUrl"
            required
          />
        </div>
        imdbId:
        <div>
          <input
            className="input"
            value={imdbId}
            type="text"
            onChange={this.handleChange}
            name="imdbId"
            id="imdbId"
            required
          />
        </div>
        <button
          className="buttonForm"
          type="submit"
          disabled={error}
        >
          Add movie
        </button>
        {error && <p className="error">Please fill in the  blank fields!</p>}
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

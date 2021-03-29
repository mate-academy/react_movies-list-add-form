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

  handleSubmit = () => {
    const { addMovie } = this.props;

    addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.handleSubmit();
        }}
      >
        <input
          className="input"
          type="text"
          placeholder="Title"
          value={this.state.title}
          name="title"
          onChange={this.handleChange}
          required
        />
        <input
          className="input"
          type="textarea"
          placeholder="Description"
          value={this.state.description}
          name="description"
          onChange={this.handleChange}
        />
        <input
          className="input"
          type="text"
          placeholder="ImgUrl"
          value={this.state.ImgUrl}
          name="imgUrl"
          onChange={this.handleChang}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="ImdbUrl"
          value={this.state.ImdbUrl}
          name="imdbUrl"
          onChange={this.handleChange}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="ImdbId"
          value={this.state.ImdbId}
          name="imdbId"
          onChange={this.handleChange}
          required
        />
        <button
          className="button"
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

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
    createWarning: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      createWarning: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.title === ''
     || this.state.description === ''
     || this.state.imgUrl === ''
     || this.state.imdbUrl === ''
     || this.state.imdbUrl === ''
    ) {
      this.setState({
        createWarning: true,
      });

      return;
    }

    const movie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.onAdd(movie);
  }

  render() {
    return (
      <form
        name="Form"
        className="moviesform"
        onSubmit={this.handleSubmit}
      >
        {
          this.state.createWarning && (
          <p
            className="moviesform__warning"
          >
            Warning: Please fill all fields
          </p>
          )
        }
        <input
          name="title"
          className="moviesform__input"
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <textarea
          name="description"
          className="moviesform__input  moviesform__input--textarea"
          type="text"
          placeholder="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <input
          name="imgUrl"
          className="moviesform__input"
          type="text"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
        />
        <input
          name="imdbUrl"
          className="moviesform__input"
          type="text"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
        />
        <input
          name="imdbId"
          className="moviesform__input"
          type="text"
          placeholder="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
        />
        <button
          className="moviesform__button"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

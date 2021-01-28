import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    validTitle: true,
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      submitButtonPressed: false,
      formHasErrors: false,
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  createMovie = (event) => {
    const { formHasErrors } = this.state.errors;

    event.preventDefault();
    this.setState(state => ({
      ...state,
      errors: {
        submitButtonPressed: true,
      },
    }));

    if (!formHasErrors) {
      const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
      const movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        // eslint-disable-next-line max-len
        imdbId: imdbId || Math.random(), // cheet first solution (no optional task)
      };

      this.props.onAdd(movie);

      this.setState(state => ({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        errors: {
          submitButtonPressed: false,
          formHasErrors: false,
        },
      }));
    }
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form onSubmit={this.createMovie}>

        <div className="form-input">
          <input
            id="title"
            name="title"
            placeholder="new title"
            value={title}
            onChange={this.handleChange}
            autoComplete="off"
            onBlur={this.titleValidation}
            required
          />
        </div>

        <div className="form-input">
          <input
            id="description"
            name="description"
            placeholder="description"
            value={description}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </div>

        <div className="form-input">
          <input
            id="imgUrl"
            name="imgUrl"
            placeholder="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-input">
          <input
            id="imdbUrl"
            name="imdbUrl"
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-input">
          <input
            id="imdbId"
            name="imdbId"
            placeholder="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            autoComplete="off"
            required
          />

        </div>

        <button type="submit">add</button>

      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

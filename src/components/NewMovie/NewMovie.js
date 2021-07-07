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
    hasDescriptionError: false,
    hasTitleError: false,
  };

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    this.setState({
      [name]: value,
      hasTitleError: false,
      hasUserError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const { title, description } = this.state;

    if (!title.trim()) {
      this.setState({
        hasTitleError: !title.trim(),
      });

      return;
    }

    if (!description.trim()) {
      this.setState({
        hasDescriptionError: !description.trim(),
      });

      return;
    }

    onAdd(this.state);

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
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label
          htmlFor="title"
        >
          Name:
          <br />
        </label>
        <input
          className="form__input"
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          required
        />

        <label
          htmlFor="description"
        >
          <br />
          Description:
          <br />
        </label>
        <textarea
          className="form__input"
          id="description"
          name="description"
          value={description}
          onChange={this.handleChange}
          required
        />

        <label
          htmlFor="img"
        >
          <br />
          Image:
          <br />
        </label>
        <input
          className="form__input"
          id="img"
          type="url"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          required
        />

        <label
          htmlFor="imdbUrl"
        >
          <br />
          IMDB URL:
          <br />
        </label>
        <input
          className="form__input"
          id="imdbUrl"
          type="url"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          required
        />

        <label
          htmlFor="imdbId"
        >
          <br />
          IMDB id:
          <br />
        </label>
        <input
          className="form__input"
          id="imdbId"
          type="text"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          required
        />
        <button
          className="submit"
          type="submit"
        >
          ADD
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

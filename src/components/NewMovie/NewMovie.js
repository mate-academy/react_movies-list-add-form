import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    values: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: [],
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.handleValidation()) {
      this.props.onAdd(this.state);

      this.resetForm();
    }
  }

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleValidation() {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const errors = [];

    let isValid = true;

    if (!title) {
      isValid = false;
      errors.push('Title is empty');
    }

    if (!imgUrl) {
      isValid = false;
      errors.push('Image URL is empty');
    }

    if (!imdbUrl) {
      isValid = false;
      errors.push('IMDB URL is empty');
    }

    if (!imdbId) {
      isValid = false;
      errors.push('IMDB ID is empty');
    }

    // eslint-disable-next-line no-unused-vars,max-len
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    // eslint-disable-next-line
    if (!regex.test(imdbUrl)) {
      isValid = false;
      errors.push('IMDB URL is not valid');
    }

    // eslint-disable-next-line
    if (!regex.test(imgUrl)) {
      isValid = false;
      errors.push('ImgUrl is not valid');
    }

    this.setState({
      errors,
    });

    return isValid;
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId, errors } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >

        <label htmlFor="text" className="label">
          <h2>Movie Title</h2>

          <input
            type="text"
            name="title"
            placeholder="Name"
            value={title}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="description" className="label">
          <h2>Movie description</h2>

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imgUrl" className="label">
          <h2>IMG Url</h2>
          <input
            type="text"
            name="imgUrl"
            placeholder="Image URL"
            value={imgUrl}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imdbUrl" className="label">
          <h2>IMDB Url</h2>
          <input
            type="text"
            name="imdbUrl"
            placeholder="IMDB URL"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imdbId" className="label">
          <h2>IMDB ID</h2>
          <input
            type="text"
            name="imdbId"
            placeholder="IMDB ID"
            value={imdbId}
            onChange={this.handleChange}
          />
        </label>

        <ol className="errors">
          {errors.map(error => (
            <li>{error}</li>
          ))}
        </ol>

        <button type="submit">Submit</button>
        <button type="button" onClick={this.resetForm}>Reset</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

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
    errors: []
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
      imdbId
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

    // eslint-disable-next-line
    if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(imdbUrl)) {
      isValid = false;
      errors.push('IMDB URL is not valid');
    }

    // eslint-disable-next-line
    if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(imdbId)) {
      isValid = false;
      errors.push('IMDB ID is not valid');
    }

    this.setState({
      errors,
    });

    return isValid;
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imgUrl"
          placeholder="Image URL"
          value={imgUrl}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imdbUrl"
          placeholder="IMDB URL"
          value={imdbUrl}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imdbId"
          placeholder="IMDB ID"
          value={imdbId}
          onChange={this.handleChange}
        />

        <ol class="errors">
         {errors.map(error => (
           <li>{error}</li>
         ))}
        </ol>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

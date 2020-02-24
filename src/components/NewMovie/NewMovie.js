import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    urlIsValid: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      urlIsValid: false,
    });
  }

  submitHandler = (evt) => {
    evt.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    let isError = false;

    if ((!pattern.test(imgUrl)) || (!pattern.test(imdbUrl))) {
      isError = true;
      this.setState({
        urlIsValid: true,
      });
    }

    if (!isError) {
      this.props.addMovie({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      urlIsValid } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.submitHandler}
      >
        <p>
          <label htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            placeholder="Enter title"
            onChange={this.handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="decription">
            Description:
          </label>
          <input
            id="description"
            type="text"
            name="description"
            value={description}
            placeholder="Enter description"
            onChange={this.handleChange}
          />
        </p>

        <p>
          <label htmlFor="imgUrl">Image URL:</label>
          <input
            id="imgUrl"
            type="text"
            name="imgUrl"
            className="form__input"
            value={imgUrl}
            placeholder="Enter image URL"
            onChange={this.handleChange}
            required
          />
          {(urlIsValid) && (<span>Enter correct URL</span>)}
        </p>

        <p>
          <label htmlFor="imdbUrl">
            IMDb URL:
          </label>
          <input
            id="imdbUrl"
            type="text"
            name="imdbUrl"
            className="form__input"
            value={imdbUrl}
            placeholder="Enter IMDb URL"
            onChange={this.handleChange}
            required
          />
          {(urlIsValid) && (<span>Enter correct URL</span>)}
        </p>

        <p>
          <label htmlFor="imdb-id">
            IMDb ID:
          </label>
          <input
            id="imdb-id"
            type="text"
            name="imdbId"
            value={imdbId}
            placeholder="Enter IMDb ID"
            onChange={this.handleChange}
            required
          />
        </p>
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

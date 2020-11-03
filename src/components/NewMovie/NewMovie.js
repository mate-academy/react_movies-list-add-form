import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,
    disabled: true,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      disabled: true,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  onBlur = (event) => {
    const { name, value } = event.target;
    const { title, imgUrl, imdbUrl, imdbId } = this.state;

    const valueMatch = value
      // eslint-disable-next-line max-len
      .match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    const titleError = name === 'title' && value === '';
    const imgUrlError = name === 'imgUrl' && (value === '' || !valueMatch);
    const imdbUrlError = name === 'imdbUrl' && (value === '' || !valueMatch);
    const imdbIdError = name === 'imdbId' && value === '';

    this.setState({
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
      disabled: titleError || imgUrlError || imdbUrlError || imdbIdError
      || title === '' || imgUrl === '' || imdbUrl === '' || imdbId === '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
      disabled,
    } = this.state;

    return (
      <div>
        <div>Add new movie</div>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <label
            className="label"
            htmlFor="title"
          >
            title
          </label>
          <input
            className={titleError
              ? 'input input--error'
              : 'input'}
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="title"
            onChange={this.handleChange}
            onBlur={this.onBlur}
          />
          {titleError
            && <div className="error">Please enter valid title!</div>}

          <label
            className="label"
            htmlFor="description"
          >
            description
          </label>
          <input
            className="input"
            type="text"
            id="description"
            name="description"
            value={description}
            placeholder="description"
            onChange={this.handleChange}
            onBlur={this.onBlur}
          />

          <label
            className="label"
            htmlFor="imgUrl"
          >
            imgUrl
          </label>
          <input
            className={imgUrlError
              ? 'input input--error'
              : 'input'}
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={imgUrl}
            placeholder="imgUrl"
            onChange={this.handleChange}
            onBlur={this.onBlur}
          />
          {imgUrlError
            && <div className="error">Please enter valid imgUrl!</div>}

          <label
            className="label"
            htmlFor="imdbUrl"
          >
            imdbUrl
          </label>
          <input
            className={imdbUrlError
              ? 'input input--error'
              : 'input'}
            type="text"
            id="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            placeholder="imdbUrl"
            onChange={this.handleChange}
            onBlur={this.onBlur}
          />
          {imdbUrlError
            && <div className="error">Please enter valid imdbUrl!</div>}

          <label
            className="label"
            htmlFor="imdbId"
          >
            imdbId
          </label>
          <input
            className={imdbIdError
              ? 'input input--error'
              : 'input'}
            type="text"
            id="imdbId"
            name="imdbId"
            value={imdbId}
            placeholder="imdbId"
            onChange={this.handleChange}
            onBlur={this.onBlur}
          />
          {imdbIdError
            && <div className="error">Please enter valid imdbId!</div>}

          <button
            className="button"
            type="submit"
            disabled={disabled}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './NewMovie.scss';

// eslint-disable-next-line
const regexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    hasTitleError: false,
    hasImgUrlError: false,
    hasImdbUrlError: false,
    hasImdbIdError: false,
    buttonDisabled: false,
  };

  handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    const { hasTitleError,
      hasImgUrlError,
      hasImdbUrlError,
      hasImdbIdError } = this.state;

    switch (name) {
      case 'title':
        this.setState({
          title: value,
          hasTitleError: false,
        });
        break;
      case 'description':
        this.setState({ description: value });
        break;
      case 'imgUrl':
        this.setState({
          imgUrl: value,
          hasImgUrlError: false,
        });
        break;
      case 'imdbUrl':
        this.setState({
          imdbUrl: value,
          hasImdbUrlError: false,
        });
        break;
      case 'imdbId':
        this.setState({
          imdbId: value,
          hasImdbIdError: false,
        });
        break;
      default:
        return;
    }

    if (!hasTitleError && !hasImgUrlError
      && !hasImdbUrlError && !hasImdbIdError) {
      this.setState({
        buttonDisabled: false,
      });
    }
  }

  titleValidation = () => {
    if (!this.state.title) {
      this.setState({
        hasTitleError: true, buttonDisabled: true,
      });
    }
  }

  imgUrlValidation = () => {
    if (!regexp.test(this.state.imgUrl)) {
      this.setState({
        hasImgUrlError: true,
        buttonDisabled: true,
      });
    }

    if (!this.state.imgUrl) {
      this.setState({
        hasImgUrlError: true,
        buttonDisabled: true,
      });
    }
  }

  imdbUrlValidation = () => {
    if (!regexp.test(this.state.imdbUrl)) {
      this.setState({
        hasImdbUrlError: true,
        buttonDisabled: true,
      });
    }

    if (!this.state.imdbUrl) {
      this.setState({
        hasImdbUrlError: true,
        buttonDisabled: true,
      });
    }
  }

  imdbIdValidation = () => {
    if (!this.state.imdbId) {
      this.setState({
        hasImdbIdError: true,
        buttonDisabled: true,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      hasTitleError,
      hasImgUrlError,
      hasImdbUrlError,
      hasImdbIdError } = this.state;

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      this.setState({
        hasTitleError: !title,
        hasImgUrlError: !imgUrl,
        hasImdbUrlError: !imdbUrl,
        hasImdbIdError: !imdbId,
      });

      return;
    }

    if (hasTitleError || hasImgUrlError || hasImdbUrlError || hasImdbIdError) {
      this.setState({
        buttonDisabled: true,
      });

      return;
    }

    const newMovie = {
      title, description, imgUrl, imdbUrl, imdbId,
    };

    this.props.addMovie(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      hasTitleError: false,
      hasImgUrlError: false,
      hasImdbUrlError: false,
      hasImdbIdError: false,
      buttonDisabled: false,
    });
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      hasTitleError,
      hasImgUrlError,
      hasImdbUrlError,
      hasImdbIdError,
      buttonDisabled } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <p>Title</p>
        <input
          name="title"
          className={classNames('input', { errorInput: hasTitleError })}
          type="text"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
          onBlur={this.titleValidation}
        />
        <span
          className="error"
          hidden={!hasTitleError}
        >
          Please enter the title
        </span>
        <p>Description</p>
        <input
          name="description"
          className="input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        />
        <p>Image Url</p>
        <input
          name="imgUrl"
          className={classNames('input', { errorInput: hasImgUrlError })}
          type="text"
          placeholder="Image"
          value={imgUrl}
          onChange={this.handleChange}
          onBlur={this.imgUrlValidation}
        />
        <span
          className="error"
          hidden={!hasImgUrlError}
        >
          Please enter valid image url
        </span>
        <p>IMDB Url</p>
        <input
          name="imdbUrl"
          className={classNames('input', { errorInput: hasImdbUrlError })}
          type="text"
          placeholder="IMDB"
          value={imdbUrl}
          onChange={this.handleChange}
          onBlur={this.imdbUrlValidation}
        />
        <span
          className="error"
          hidden={!hasImdbUrlError}
        >
          Please enter valid imdb url
        </span>
        <p>IMDB Id</p>
        <input
          name="imdbId"
          className={classNames('input', { errorInput: hasImdbIdError })}
          type="text"
          placeholder="Id"
          value={imdbId}
          onChange={this.handleChange}
          onBlur={this.imdbIdValidation}
        />
        <span
          className="error"
          hidden={!hasImdbIdError}
        >
          Please enter the id
        </span>
        <button
          className="button"
          type="submit"
          disabled={buttonDisabled}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

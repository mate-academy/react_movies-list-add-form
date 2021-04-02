import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function validateUrl(url) {
  return (
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(url)
  );
}

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isImgUrl: false,
    isImdbUrl: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const validate = validateUrl(value);

    switch (name) {
      case 'imgUrl':
      case 'imdbUrl':
        switch (validate) {
          case true:
            this.setState({
              [`is${name[0].toUpperCase() + name.slice(1)}`]: false,
              [name]: value,
            });
            break;

          case false:
            this.setState({
              [`is${name[0].toUpperCase() + name.slice(1)}`]: true,
              [name]: value,
            });
            break;

          default: {
            break;
          }
        }

        break;

      default:
        this.setState({
          [name]: value,
        });
    }
  }

  handleSumbit = (event) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const { addMovie } = this.props;

    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isImgUrl,
      isImdbUrl,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSumbit}
        className="form"
      >
        <h4 className="title">
          Add film
        </h4>
        <input
          type="text"
          name="title"
          className="input"
          value={title}
          placeholder="Title"
          required
          onChange={this.handleChange}
        />
        <textarea
          name="description"
          className="textarea"
          value={description}
          placeholder="Description"
          onChange={this.handleChange}
        />
        <input
          type="text"
          className={classNames(
            'input',
            { 'is-danger': isImgUrl },
          )}
          name="imgUrl"
          value={imgUrl}
          placeholder="imgUrl"
          required
          onChange={this.handleChange}
        />
        {isImgUrl && (
          <p className="help is-danger">
            Invalid url
          </p>
        )}
        <input
          type="text"
          className={classNames(
            'input',
            { 'is-danger': isImdbUrl },
          )}
          name="imdbUrl"
          value={imdbUrl}
          placeholder="imdbUrl"
          required
          onChange={this.handleChange}
        />
        {isImdbUrl && (
          <p className="help is-danger">
            Invalid url
          </p>
        )}
        <input
          type="text"
          className="input"
          name="imdbId"
          value={imdbId}
          placeholder="imdbId"
          required
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="button is-primary"
        >
          Add new film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

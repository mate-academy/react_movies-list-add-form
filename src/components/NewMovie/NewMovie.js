import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgUrlError: false,
    imdbUrlError: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    /* eslint-disable */
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    /* eslint-enable */

    if (!regex.test(imgUrl)) {
      this.setState({ imgUrlError: true });

      return;
    }

    this.setState({ imgUrlError: false });

    if (!regex.test(imdbUrl)) {
      this.setState({ imdbUrlError: true });

      return;
    }

    this.setState({ imdbUrlError: false });

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    this.props.onAdd(newMovie);
  }

  render() {
    const { state, handleSubmit } = this;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      imgUrlError,
      imdbUrlError,
    } = state;

    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      >
        <h3>Add a new film</h3>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
            autoComplete="off"
            required
          />
        </label>
        <label>
          Description:
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </label>
        <label>
          imgUrl:
          <input
            className={classNames({
              error: imgUrlError === true,
            })}
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            autoComplete="off"
            required
          />
        </label>
        <label>
          imdbUrl:
          <input
            className={classNames({
              error: imdbUrlError === true,
            })}
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            autoComplete="off"
            required
          />
        </label>
        <label>
          imdbId:
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            autoComplete="off"
            required
          />
        </label>
        <button
          type="submit"
          disabled={imgUrlError || imdbUrlError}
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

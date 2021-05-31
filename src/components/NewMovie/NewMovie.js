import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    inputTitle: '',
    inputTitleError: false,

    inputImgUrl: '',
    inputImgUrlError: false,

    inputImdbUrl: '',
    inputImdbUrlError: false,

    inputImdbId: '',
    inputImdbIdError: false,

    inputDescription: '',

  };

  inputChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }
  // eslint-disable-next-line
  handleSubmit = (event) => {
    event.preventDefault();

    const {
      inputTitle,
      inputImgUrl,
      inputImdbUrl,
      inputImdbId,
      inputDescription,
    } = this.state;

    if (!inputTitle || !inputImgUrl || !inputImdbUrl || !inputImdbId) {
      return this.setState({
        inputTitleError: !inputTitle,
        inputImgUrlError: !inputImgUrl,
        inputImdbUrlError: !inputImdbUrl,
        inputImdbIdError: !inputImdbId,
      });
    }

    this.props.addMovie(
      inputTitle,
      inputDescription,
      inputImgUrl,
      inputImdbUrl,
      inputImdbId,
    );

    this.setState({
      inputTitle: '',
      inputImgUrl: '',
      inputImdbUrl: '',
      inputImdbId: '',
      inputDescription: '',
    });
  };

  render() {
    const {
      inputTitle,
      inputImgUrl,
      inputImdbUrl,
      inputImdbId,
      inputDescription,
      inputTitleError,
      inputImgUrlError,
      inputImdbUrlError,
      inputImdbIdError,
    } = this.state;

    return (
      <form
        className="movies-form"
        onSubmit={this.handleSubmit}
      >

        <label className="form-label">
          <span>Title: </span>
          <input
            className={`input-text ${inputTitleError && 'input-error'}`}
            type="text"
            name="inputTitle"
            value={inputTitle}
            onChange={this.inputChange}
          />
          {
          inputTitleError && (
          <span className="span-error">
            Error: Enter title
          </span>
          )
        }
        </label>

        <label className="form-label">
          <span>imgUrl: </span>
          <input
            className={`input-text ${inputImgUrlError && 'input-error'}`}
            type="text"
            name="inputImgUrl"
            value={inputImgUrl}
            onChange={this.inputChange}
          />
          {inputImgUrlError
            && (<span className="span-error">Error: Enter imgUrl</span>)}
        </label>

        <label className="form-label">
          <span>imdbUrl: </span>
          <input
            className={`input-text ${inputImdbUrlError && 'input-error'}`}
            type="text"
            name="inputImdbUrl"
            value={inputImdbUrl}
            onChange={this.inputChange}
          />
          {inputImdbUrlError
            && (<span className="span-error">Error: Enter imdbUrl</span>)}
        </label>

        <label className="form-label">
          <span>imdbId: </span>
          <input
            className={`input-text ${inputImdbIdError && 'input-error'}`}
            type="text"
            name="inputImdbId"
            value={inputImdbId}
            onChange={this.inputChange}
          />
          {inputImdbIdError
            && (<span className="span-error">Error: Enter imdbId</span>)}
        </label>

        <label className="form-label">
          <span>description: </span>
          <textarea
            className="inputDescription"
            cols="30"
            type="text"
            name="inputDescription"
            value={inputDescription}
            onChange={this.inputChange}
          />
        </label>

        <button
          type="submit"
          disabled={
            inputTitleError
            || inputImgUrlError
            || inputImdbUrlError
            || inputImdbIdError
          }
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

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './NewMovie.scss';

// eslint-disable-next-line
const verifier = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isDisabled: false,
    isError: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  controlHandle = () => {
    const { title, imgUrl, imdbUrl, imdbId } = this.state;

    if (!title) {
      this.setState(prevState => ({
        isDisabled: true,
        isError: {
          ...prevState.isError,
          title: true,
        },
      }));
    }

    if (!verifier.test(imgUrl)) {
      this.setState(prevState => ({
        isDisabled: true,
        isError: {
          ...prevState.isError,
          imgUrl: true,
        },
      }));
    }

    if (!verifier.test(imdbUrl)) {
      this.setState(prevState => ({
        isDisabled: true,
        isError: {
          ...prevState.isError,
          imdbUrl: true,
        },
      }));
    }

    if (!imdbId) {
      this.setState(prevState => ({
        isDisabled: true,
        isError: {
          ...prevState.isError,
          imdbId: true,
        },
      }));
    }
  }

  submitHandle = (event) => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    event.preventDefault();
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  changeHandle =(event) => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      [name]: value,
      isDisabled: false,
      isError: {
        ...prevState.isError,
        [name]: false,
      },
    }));
  }

  render() {
    const { title, imgUrl, imdbUrl, imdbId } = this.state.isError;

    return (
      <form onSubmit={this.submitHandle} onBlur={this.controlHandle}>
        <h1 className="form__header">Add new movie</h1>

        <div className="form__field">
          <label className="form__label" htmlFor="title">
            Add title
          </label>
          <input
            className={classNames(
              'form__input',
              { 'form__input--error': title },
            )}
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.changeHandle}
            placeholder="Title"
            required
          />
          {title
          && <div className="error">Title should not be empty</div>}
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="description">
            Add description
          </label>
          <input
            className="form__input"
            id="description"
            name="description"
            value={this.state.description}
            onChange={this.changeHandle}
            placeholder="Description"
          />
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="imgUrl">
            Add imgUrl
          </label>
          <input
            className={classNames(
              'form__input',
              { 'form__input--error': imgUrl },
            )}
            id="imgUrl"
            name="imgUrl"
            value={this.state.imgUrl}
            onChange={this.changeHandle}
            placeholder="imgUrl"
            required
          />
          {imgUrl
            && (
            <div className="error">
              Please check the correctness of the imgUrl
            </div>
            )}
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="imdbUrl">
            Add imdbUrl
          </label>
          <input
            className={classNames(
              'form__input',
              { 'form__input--error': imdbUrl },
            )}
            id="imdbUrl"
            name="imdbUrl"
            value={this.state.imdbUrl}
            onChange={this.changeHandle}
            placeholder="imdbUrl"
            required
          />
          {imdbUrl
          && (
          <div className="error">
            Please check the correctness of the imdbUrl
          </div>
          )}
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="imdbId">
            Add imdbId
          </label>
          <input
            className={classNames(
              'form__input',
              { 'form__input--error': imdbId },
            )}
            id="imdbId"
            name="imdbId"
            value={this.state.imdbId}
            onChange={this.changeHandle}
            placeholder="imdbId"
            required
          />
          {imdbId
          && <div className="error">imdbId should not be empty</div>}
        </div>

        <button
          className="form__button"
          type="submit"
          disabled={this.state.isDisabled}
        >
          Add movie
        </button>

      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

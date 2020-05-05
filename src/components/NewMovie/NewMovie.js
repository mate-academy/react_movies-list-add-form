/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './NewMovie.scss';

// eslint-disable-next-line max-len
const patternToUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
const patternToId = /^[a-z][a-z][0-9]{7}$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  blurErrorText = (event) => {
    const { id, value } = event.target;

    if (value.length < 3) {
      this.setState(state => ({
        errors: {
          ...state.errors, [id]: true,
        },
      }));
    } else {
      this.setState(state => ({
        errors: {
          ...state.errors, [id]: false,
        },
      }));
    }
  }

  blurErrorUrl = (event) => {
    const { id, value } = event.target;
    const test = patternToUrl.test(value);

    this.setState(state => ({
      errors: {
        ...state.errors, [id]: !test,
      },
    }));
  }

  blurErrorImdbId = (event) => {
    const { id, value } = event.target;
    const test = patternToId.test(value);

    this.setState(state => ({
      errors: {
        ...state.errors, [id]: !test,
      },
    }));
  }

  handlerInput = (event) => {
    const target = event.target.value;
    const { name } = event.target;

    this.setState({
      [name]: target,
    });
  }

  returnMovie = (event) => {
    event.preventDefault();
    this.props.addMovie(this.state);
    this.reset();
  }

  reset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errors: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors } = this.state;

    const checkErrors = Object.values(errors).every(error => error === false);

    return (
      <form onSubmit={this.returnMovie}>
        <label htmlFor="title">Title:</label>
        <input
          value={title}
          onChange={this.handlerInput}
          onBlur={this.blurErrorText}
          type="text"
          id="title"
          name="title"
          className={errors.title ? 'input_error' : undefined}
        />
        {errors.title
        && (
          <p className="error__message">
            Title shoud has more than 3 symbols
          </p>
        )}

        <label htmlFor="description">Description:</label>
        <input
          onChange={this.handlerInput}
          onBlur={this.blurErrorText}
          value={description}
          type="text"
          id="description"
          name="description"
          className={errors.description ? 'input_error' : undefined}
        />
        {errors.description
        && (
          <p className="error__message">
            Title shoud has more than 3 symbols
          </p>
        )}

        <label htmlFor="imgUrl">imgUrl:</label>
        <input
          onChange={this.handlerInput}
          onBlur={this.blurErrorUrl}
          value={imgUrl}
          type="text"
          id="imgUrl"
          name="imgUrl"
          className={errors.imgUrl ? 'input_error' : undefined}
        />
        {errors.imgUrl
        && (
          <p className="error__message">
            Please enter the correct URL
          </p>
        )}

        <label htmlFor="imdbUrl">imdbUrl:</label>
        <input
          onChange={this.handlerInput}
          onBlur={this.blurErrorUrl}
          value={imdbUrl}
          type="text"
          id="imdbUrl"
          name="imdbUrl"
          className={errors.imdbUrl ? 'input_error' : undefined}
        />
        {errors.imdbUrl
          && (
            <p className="error__message">
              Please enter the correct URL
            </p>
          )}

        <label htmlFor="imdbId">imdbId:</label>
        <input
          onChange={this.handlerInput}
          onBlur={this.blurErrorImdbId}
          value={imdbId}
          type="text"
          id="imdbId"
          name="imdbId"
          className={errors.imdbId ? 'input_error' : undefined}
        />
        {errors.imdbId
          && (
            <p className="error__message">
              Please enter corect ID (exm: tt1234567)
            </p>
          )}

        <input disabled={!checkErrors} type="submit" value="Submit" />
      </form>
    );
  }
}

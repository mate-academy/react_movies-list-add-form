import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errorTitle: false,
    errorImgUrl: false,
    errorImdbUrl: false,
    errorImdbId: false,
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onBlur = (fieldName, errorName) => {
    const inputValue = this.state[fieldName];

    if (!inputValue) {
      this.setState({
        [errorName]: 'empty',
      });

      return;
    }

    if (/url/i.test(fieldName)) {
      // eslint-disable-next-line max-len
      if (!inputValue.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/)) {
        this.setState({
          [errorName]: 'invalid',
        });
      } else {
        this.setState({
          [errorName]: 'valid',
        });
      }

      return;
    }

    this.setState({
      [errorName]: 'valid',
    });
  }

  resetState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errorTitle: false,
      errorImgUrl: false,
      errorImdbUrl: false,
      errorImdbId: false,
    });
  }

  render() {
    const { addMovie } = this.props;

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errorTitle,
      errorImgUrl,
      errorImdbUrl,
      errorImdbId,
    } = this.state;

    const errors = errorTitle === true || !title
      || errorImgUrl === true || !imgUrl
      || errorImdbUrl === true || !imdbUrl
      || errorImdbId === true || !imdbId;

    return (
      <form
        className="form form-group"
        onSubmit={(event) => {
          event.preventDefault();
          if (errors) {
            return;
          }

          addMovie(this.state);
          this.resetState();
        }}
      >
        <Input
          errorField={errorTitle}
          field={title}
          fieldName="title"
          onChange={this.onChange}
          onBlur={this.onBlur}
        />

        <textarea
          name="description"
          placeholder="description"
          type="text"
          className="form-control"
          value={description}
          onChange={event => this.onChange(event)}
        />

        <Input
          errorField={errorImgUrl}
          field={imgUrl}
          fieldName="imgUrl"
          onChange={this.onChange}
          onBlur={this.onBlur}
        />

        <Input
          errorField={errorImdbUrl}
          field={imdbUrl}
          fieldName="imdbUrl"
          onChange={this.onChange}
          onBlur={this.onBlur}
        />

        <Input
          errorField={errorImdbId}
          field={imdbId}
          fieldName="imdbId"
          onChange={this.onChange}
          onBlur={this.onBlur}
        />

        <button
          type="submit"
          className={errors ? 'btn btn-dark disabled' : 'btn btn-dark'}
        >
          Add a movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

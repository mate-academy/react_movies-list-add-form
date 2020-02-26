import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errorImgUrl: false,
    errorImdbUrl: false,
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    let errorClear = '';

    if (name === 'imgUrl') {
      errorClear = 'errorImgUrl';
    }

    if (name === 'imdbUrl') {
      errorClear = 'errorImdbUrl';
    }

    this.setState({
      [errorClear]: false,
      [name]: value.replace(/^\s/, ''),
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    let error = false;

    if (!pattern.test(imgUrl)) {
      error = true;

      this.setState({
        errorImgUrl: true,
      });
    }

    if (!pattern.test(imdbUrl)) {
      error = true;

      this.setState({
        errorImdbUrl: true,
      });
    }

    if (!error) {
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
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errorImgUrl,
      errorImdbUrl,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.onSubmit}
      >
        <div className="form__lable">
          <input
            className="form__item"
            value={title}
            name="title"
            onChange={this.onChange}
            placeholder="Write the title"
            required
          />
        </div>
        <div className="form__lable">
          <input
            className="form__item"
            value={description}
            name="description"
            onChange={this.onChange}
            placeholder="Write the description"
          />
        </div>
        <div className="form__lable">
          <input
            className="form__item"
            value={imgUrl}
            name="imgUrl"
            onChange={this.onChange}
            placeholder="Write the imgUrl"
            required
          />
          {errorImgUrl && (
            <p className="form__error">
            Please write the correct url
            </p>
          )}
        </div>
        <div className="form__lable">
          <input
            className="form__item"
            value={imdbUrl}
            name="imdbUrl"
            onChange={this.onChange}
            placeholder="Write the imdbUrl"
            required
          />
          {errorImdbUrl && (
            <p className="form__error">
            Please write the correct url
            </p>
          )}
        </div>
        <div className="form__lable">
          <input
            className="form__item"
            value={imdbId}
            name="imdbId"
            onChange={this.onChange}
            placeholder="Write the imdbId"
            required
          />
        </div>
        <button
          className="form__movie"
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

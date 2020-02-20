import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  static propTypes = {
    addMovie: PropTypes.func.isRequired,
  }

  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isRequiredtitle: false,
    isRequiredimdbUrl: false,
    isRequiredimdbId: false,
    isValidUrl: false,
    isError: false,

  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId, isError } = this.state;

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

  handleBlurRequired = (e) => {
    const { value, name } = e.target;

    if (value.trim().length === 0) {
      this.setState({
        [`isRequired${name}`]: true,
        isError: true,
      });
    }
  }

  handleBlurValid = (e) => {
    const { value } = e.target;
    /* eslint-disable-next-line */
    if (!value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/)) {
      this.setState({
        isValidUrl: true,
        isError: true,
      });
    }
  }

  handleFocus = (e) => {
    const { isRequiredtitle,
      isRequiredimdbId,
      isRequiredimdbUrl,
      isValidUrl } = this.state;

    if (isRequiredtitle || isRequiredimdbId || isRequiredimdbUrl) {
      this.setState({
        [`isRequired${e.target.name}`]: false,
      });
    }

    if (isValidUrl) {
      this.setState({
        isValidUrl: false,
      });
    }
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isValidUrl,
      isRequiredtitle,
      isRequiredimdbUrl,
      isRequiredimdbId,
      isError } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label>
          Title:
          <input
            className={isRequiredtitle ? 'input error' : 'input'}
            type="text"
            name="title"
            value={title}
            onChange={this.handleInput}
            onBlur={this.handleBlurRequired}
            onFocus={this.handleFocus}
          />
          {(isRequiredtitle || isError)
          && (
            <span className="errorText">
            This field is reqiered!
            </span>
          )}
        </label>
        <label>
           Description:
          <input
            className="input"
            type="text"
            name="description"
            value={description}
            onChange={this.handleInput}
          />
        </label>
        <label>
          Image URL:
          <input
            className={isValidUrl ? 'input error' : 'input'}
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleInput}
            onBlur={this.handleBlurValid}
            onFocus={this.handleFocus}
          />
          {isValidUrl && <span className="errorText">Not valid Url!</span>}
        </label>
        <label>
          Imdb URL:
          <input
            className={isRequiredimdbUrl ? 'input error' : 'input'}
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleInput}
            onBlur={this.handleBlurRequired}
            onFocus={this.handleFocus}
          />
          {isRequiredimdbUrl
          && (
            <span className="errorText">
            This field is reqiered!
            </span>
          )}
        </label>
        <label>
          Imdb Id:
          <input
            className={isRequiredimdbId ? 'input error' : 'input'}
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleInput}
            onBlur={this.handleBlurRequired}
            onFocus={this.handleFocus}
          />
          {isRequiredimdbId
          && (
            <span className="errorText">
            This field is reqiered!
            </span>
          )}
        </label>
        <button className="button" type="submit">Add Movie</button>
      </form>
    );
  }
}

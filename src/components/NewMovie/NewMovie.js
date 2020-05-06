import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NewMovie.scss';

const initState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  titleErrorMsg: '',
  descriptionErrorMsg: '',
  imgUrlErrorMsg: '',
  imdbUrlErrorMsg: '',
  imdbIdErrorMsg: '',
  validationStatus: false,
};
// eslint-disable-next-line max-len
const urlValidation = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

export class NewMovie extends Component {
  state = initState;

  validateForm = () => {
    this.setState((state) => {
      const {
        title,
        imgUrl,
        imdbUrl,
        imdbId,
        titleErrorMsg,
        imgUrlErrorMsg,
        imdbUrlErrorMsg,
        imdbIdErrorMsg,
      } = state;

      if (!title
        || !imgUrl
        || !imdbUrl
        || !imdbId
        || !!titleErrorMsg
        || !!imgUrlErrorMsg
        || !!imdbUrlErrorMsg
        || !!imdbIdErrorMsg
      ) {
        return { validationStatus: false };
      }

      return { validationStatus: true };
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { addMovie } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      validationStatus,
    } = this.state;

    if (validationStatus) {
      addMovie({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      this.setState(initState);
    }
  }

  handleInputTitle = (e) => {
    const title = e.target.value;

    this.setState({ title });
  }

  validateTitle = (e) => {
    let title = e.target.value;

    if (title.trim().length === 0) {
      title = '';
    }

    this.setState({
      title,
      titleErrorMsg: !title
        ? 'This field is required'
        : '',
    });

    this.validateForm();
  }

  handleInputDescription = (e) => {
    const description = e.target.value;

    this.setState({
      description,
      descriptionErrorMsg: '',
    });

    this.validateForm();
  }

  handleInputImgUrl = (e) => {
    const imgUrl = e.target.value;

    this.setState({
      imgUrl,
      imgUrlErrorMsg: !urlValidation.test(imgUrl)
        ? 'This field should be a valid URL'
        : '',
    });

    this.validateForm();
  }

  handleInputImdbUrl = (e) => {
    const imdbUrl = e.target.value;

    this.setState({
      imdbUrl,
      imdbUrlErrorMsg: !urlValidation.test(imdbUrl)
        ? 'This field should be a valid URL'
        : '',
    });

    this.validateForm();
  }

  handleInputImdbId = (e) => {
    const imdbId = e.target.value;

    this.setState({ imdbId });
  }

  validateInputImdbId = (e) => {
    let imdbId = e.target.value;

    if (imdbId.trim().length === 0) {
      imdbId = '';
    }

    this.setState({
      imdbId,
      imdbIdErrorMsg: !imdbId
        ? 'This field is required'
        : '',
    });

    this.validateForm();
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleErrorMsg,
      descriptionErrorMsg,
      imgUrlErrorMsg,
      imdbUrlErrorMsg,
      imdbIdErrorMsg,
      validationStatus,
    } = this.state;

    return (
      <form
        className="new-movie"
        onSubmit={this.handleSubmit}
      >
        <label className="new-movie__label">
          title:
          <input
            className={
              classNames(
                'new-movie__input',
                { 'new-movie__input--error': titleErrorMsg },
              )
            }
            type="text"
            value={title}
            onChange={this.handleInputTitle}
            onBlur={this.validateTitle}
            placeholder="Movie name"
          />
          {titleErrorMsg && (
            <span className="new-movie__error">
              {titleErrorMsg}
            </span>
          )}
        </label>
        <label className="new-movie__label">
          description:
          <textarea
            className="new-movie__input"
            style={{ resize: 'none' }}
            type="text"
            value={description}
            onChange={this.handleInputDescription}
            onBlur={this.handleInputDescription}
            rows="6"
            placeholder="Movie description"
          />
          <span className="new-movie__error">
            {descriptionErrorMsg}
          </span>
        </label>
        <label className="new-movie__label">
          imgUrl:
          <input
            className={
              classNames(
                'new-movie__input',
                { 'new-movie__input--error': imgUrlErrorMsg },
              )
            }
            type="text"
            value={imgUrl}
            onChange={this.handleInputImgUrl}
            onBlur={this.handleInputImgUrl}
            placeholder="https://www.example.com"
          />
          {imgUrlErrorMsg && (
            <span className="new-movie__error">
              {imgUrlErrorMsg}
            </span>
          )}
        </label>
        <label className="new-movie__label">
          imdbUrl:
          <input
            className={
              classNames(
                'new-movie__input',
                { 'new-movie__input--error': imdbUrlErrorMsg },
              )
            }
            type="text"
            value={imdbUrl}
            onChange={this.handleInputImdbUrl}
            onBlur={this.handleInputImdbUrl}
            placeholder="https://www.example.com"
          />
          {imdbUrlErrorMsg && (
            <span className="new-movie__error">
              {imdbUrlErrorMsg}
            </span>
          )}
        </label>
        <label className="new-movie__label">
          imdbId:
          <input
            className={
              classNames('new-movie__input', {
                'new-movie__input--error': imdbIdErrorMsg,
              })
            }
            type="text"
            value={imdbId}
            onChange={this.handleInputImdbId}
            onBlur={this.validateInputImdbId}
            placeholder="Movie imdb id"
          />
          {imdbIdErrorMsg && (
            <span className="new-movie__error">
              {imdbIdErrorMsg}
            </span>
          )}
        </label>

        <button
          className={
            classNames(
              'new-movie__button',
              { 'new-movie__button--disabled': !validationStatus },
            )
          }
          type="submit"
          disabled={!validationStatus}
        >
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

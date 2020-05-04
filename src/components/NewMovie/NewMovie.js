import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  validationStatus: false,
};
// eslint-disable-next-line max-len
const urlValidation = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

export class NewMovie extends Component {
  state = initState;

  validateForm = () => {
    const {
      titleErrorMsg,
      imgUrlErrorMsg,
      imdbUrlErrorMsg,
      imdbIdErrorMsg,
    } = this.state;

    if (
      titleErrorMsg === ''
      && imgUrlErrorMsg === ''
      && imdbUrlErrorMsg === ''
      && imdbIdErrorMsg === ''
    ) {
      this.setState({
        validationStatus: true,
      });
    } else {
      this.setState({
        validationStatus: false,
      });
    }
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
    const { title } = this.state;

    this.setState({
      title: e.target.value,
      titleErrorMsg: '',
    }, () => {
      if (title.length === 0) {
        this.setState({
          titleErrorMsg: 'This field is required',
        });
      }
    });

    this.validateForm();
  }

  handleInputDescription = (e) => {
    this.setState({
      description: e.target.value,
      descriptionErrorMsg: '',
    });

    this.validateForm();
  }

  handleInputImgUrl = (e) => {
    const { imgUrl } = this.state;

    this.setState({
      imgUrl: e.target.value,
      imgUrlErrorMsg: '',
    }, () => {
      if (this.state.imgUrl.length === 0) {
        this.setState({
          imgUrlErrorMsg: 'This field is required',
        });

        return;
      }

      if (!urlValidation.test(imgUrl)) {
        this.setState({
          imgUrlErrorMsg: 'This field should be a valid URL',
        });
      }
    });

    this.validateForm();
  }

  handleInputImdbUrl = (e) => {
    const { imdbUrl } = this.state;

    this.setState({
      imdbUrl: e.target.value,
      imdbUrlErrorMsg: '',
    }, () => {
      if (imdbUrl.length === 0) {
        this.setState({
          imdbUrlErrorMsg: 'This field is required',
        });

        return;
      }

      if (!urlValidation.test(imdbUrl)) {
        this.setState({
          imdbUrlErrorMsg: 'This field should be a valid URL',
        });
      }
    });

    this.validateForm();
  }

  handleInputImdbId = (e) => {
    const { imdbId } = this.state;

    this.setState({
      imdbId: e.target.value,
      imdbIdErrorMsg: '',
    }, () => {
      if (imdbId.length === 0) {
        this.setState({
          imdbIdErrorMsg: 'This field is required',
        });
      }
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
              titleErrorMsg
                ? 'new-movie__input new-movie__input--error'
                : 'new-movie__input'
            }
            type="text"
            value={title}
            onChange={this.handleInputTitle}
            placeholder="Movie name"
          />
          <span className="new-movie__error">
            {titleErrorMsg}
          </span>
        </label>
        <label className="new-movie__label">
          description:
          <textarea
            className="new-movie__input"
            type="text"
            value={description}
            onChange={this.handleInputDescription}
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
              imgUrlErrorMsg
                ? 'new-movie__input new-movie__input--error'
                : 'new-movie__input'
            }
            type="text"
            value={imgUrl}
            onChange={this.handleInputImgUrl}
            placeholder="https://www.example.com"
          />
          <span className="new-movie__error">
            {this.state.imgUrlErrorMsg}
          </span>
        </label>
        <label className="new-movie__label">
          imdbUrl:
          <input
            className={
              imdbUrlErrorMsg
                ? 'new-movie__input new-movie__input--error'
                : 'new-movie__input'
            }
            type="text"
            value={imdbUrl}
            onChange={this.handleInputImdbUrl}
            placeholder="https://www.example.com"
          />
          <span className="new-movie__error">
            {imdbUrlErrorMsg}
          </span>
        </label>
        <label className="new-movie__label">
          imdbId:
          <input
            className={
              imdbIdErrorMsg
                ? 'new-movie__input new-movie__input--error'
                : 'new-movie__input'
            }
            type="text"
            value={imdbId}
            onChange={this.handleInputImdbId}
            placeholder="Movie imdb id"
          />
          <span className="new-movie__error">
            {imdbIdErrorMsg}
          </span>
        </label>

        <button
          className={
            validationStatus
              ? 'new-movie__button'
              : 'new-movie__button new-movie__button--disabled'
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

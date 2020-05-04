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
    if (
      this.state.titleErrorMsg === ''
      && this.state.imgUrlErrorMsg === ''
      && this.state.imdbUrlErrorMsg === ''
      && this.state.imdbIdErrorMsg === ''
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

    if (this.state.validationStatus) {
      this.props.addMovie({
        title: this.state.title,
        description: this.state.description,
        imgUrl: this.state.imgUrl,
        imdbUrl: this.state.imdbUrl,
        imdbId: this.state.imdbId,
      });

      this.setState(initState);
    }
  }

  handleInputTitle = (e) => {
    this.setState({
      title: e.target.value,
      titleErrorMsg: '',
    }, () => {
      if (this.state.title.length === 0) {
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

      if (!urlValidation.test(this.state.imgUrl)) {
        this.setState({
          imgUrlErrorMsg: 'This field should be a valid URL',
        });
      }
    });

    this.validateForm();
  }

  handleInputImdbUrl = (e) => {
    this.setState({
      imdbUrl: e.target.value,
      imdbUrlErrorMsg: '',
    }, () => {
      if (this.state.imdbUrl.length === 0) {
        this.setState({
          imdbUrlErrorMsg: 'This field is required',
        });

        return;
      }

      if (!urlValidation.test(this.state.imdbUrl)) {
        this.setState({
          imdbUrlErrorMsg: 'This field should be a valid URL',
        });
      }
    });

    this.validateForm();
  }

  handleInputImdbId = (e) => {
    this.setState({
      imdbId: e.target.value,
      imdbIdErrorMsg: '',
    }, () => {
      if (this.state.imdbId.length === 0) {
        this.setState({
          imdbIdErrorMsg: 'This field is required',
        });
      }
    });

    this.validateForm();
  }

  render() {
    return (
      <form
        className="new-movie"
        onSubmit={this.handleSubmit}
      >
        <label className="new-movie__label">
          title:
          <input
            className={
              this.state.titleErrorMsg
                ? 'new-movie__input new-movie__input--error'
                : 'new-movie__input'
            }
            type="text"
            value={this.state.title}
            onChange={this.handleInputTitle}
            placeholder="Movie name"
          />
          <span className="new-movie__error">
            {this.state.titleErrorMsg}
          </span>
        </label>
        <label className="new-movie__label">
          description:
          <textarea
            className="new-movie__input"
            type="text"
            value={this.state.description}
            onChange={this.handleInputDescription}
            rows="6"
            placeholder="Movie description"
          />
          <span className="new-movie__error">
            {this.state.descriptionErrorMsg}
          </span>
        </label>
        <label className="new-movie__label">
          imgUrl:
          <input
            className={
              this.state.imgUrlErrorMsg
                ? 'new-movie__input new-movie__input--error'
                : 'new-movie__input'
            }
            type="text"
            value={this.state.imgUrl}
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
              this.state.imdbUrlErrorMsg
                ? 'new-movie__input new-movie__input--error'
                : 'new-movie__input'
            }
            type="text"
            value={this.state.imdbUrl}
            onChange={this.handleInputImdbUrl}
            placeholder="https://www.example.com"
          />
          <span className="new-movie__error">
            {this.state.imdbUrlErrorMsg}
          </span>
        </label>
        <label className="new-movie__label">
          imdbId:
          <input
            className={
              this.state.imdbIdErrorMsg
                ? 'new-movie__input new-movie__input--error'
                : 'new-movie__input'
            }
            type="text"
            value={this.state.imdbId}
            onChange={this.handleInputImdbId}
            placeholder="Movie imdb id"
          />
          <span className="new-movie__error">
            {this.state.imdbIdErrorMsg}
          </span>
        </label>

        <button
          className={
            this.state.validationStatus
              ? 'new-movie__button'
              : 'new-movie__button new-movie__button--disabled'
          }
          type="submit"
          disabled={!this.state.validationStatus}
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

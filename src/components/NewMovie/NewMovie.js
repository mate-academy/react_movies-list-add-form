import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleIsValid: true,
    descriptionIsValid: true,
    imgUrlIsValid: true,
    imdbUrlIsValid: true,
    imdbIdIsValid: true,
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.onAdd({
      title, description, imgUrl, imdbUrl, imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  }

  chackValidity = (evt) => {
    if (evt.target.id === 'imgUrl' || evt.target.id === 'imdbUrl') {
      const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

      this.setState({
        [`${evt.target.id}IsValid`]: regExp.test(evt.target.value),
      });
    } else {
      this.setState({
        [`${evt.target.id}IsValid`]: evt.target.value !== '',
      });
    }
  }

  render() {
    return (
      <form className="sidebar__form form" onSubmit={this.handleSubmit}>
        <div className="form__input-wrapper">
          <label className="form__label" htmlFor="title">
            {this.state.titleIsValid ? '' : 'Invalid input'}
          </label>
          <input
            className="form__input"
            type="input"
            value={this.state.title}
            placeholder="Title"
            id="title"
            style={{
              borderColor: this.state.titleIsValid ? '' : 'red',
            }}
            onChange={this.handleChange}
            onBlur={this.chackValidity}
            required
          />
        </div>

        <div className="form__input-wrapper">
          <label
            className="form__label"
            htmlFor="description"
          >
            {this.state.descriptionIsValid ? '' : 'Invalid input'}
          </label>
          <input
            className="form__input"
            type="input"
            value={this.state.description}
            placeholder="Description"
            id="description"
            style={{
              borderColor: this.state.descriptionIsValid ? '' : 'red',
            }}
            onChange={this.handleChange}
            onBlur={this.chackValidity}
            required
          />
        </div>

        <div className="form__input-wrapper">
          <label className="form__label" htmlFor="imgUrl">
            {this.state.imgUrlIsValid ? '' : 'Invalid input'}
          </label>
          <input
            className="form__input"
            type="input"
            value={this.state.imgUrl}
            placeholder="Img url"
            id="imgUrl"
            style={{
              borderColor: this.state.imgUrlIsValid ? '' : 'red',
            }}
            onChange={this.handleChange}
            onBlur={this.chackValidity}
            required
          />
        </div>

        <div className="form__input-wrapper">
          <label className="form__label" htmlFor="imdbUrl">
            {this.state.imdbUrlIsValid ? '' : 'Invalid input'}
          </label>
          <input
            className="form__input"
            type="input"
            value={this.state.imdbUrl}
            placeholder="Imdb url"
            id="imdbUrl"
            style={{
              borderColor: this.state.imdbUrlIsValid ? '' : 'red',
            }}
            onChange={this.handleChange}
            onBlur={this.chackValidity}
            required
          />
        </div>

        <div className="form__input-wrapper">
          <label className="form__label" htmlFor="imdbId">
            {this.state.imdbIdIsValid ? '' : 'Invalid input'}
          </label>
          <input
            className="form__input"
            type="input"
            value={this.state.imdbId}
            placeholder="Imdb id"
            id="imdbId"
            style={{
              borderColor: this.state.imdbIdIsValid ? '' : 'red',
            }}
            onChange={this.handleChange}
            onBlur={this.chackValidity}
            required
          />
        </div>
        <button
          className="form__button"
          type="submit"
          disabled={
            !this.state.title || !this.state.description
            || !this.state.imgUrl || !this.state.imdbUrl
            || !this.state.imdbId || !this.state.imgUrlIsValid
            || !this.state.imdbUrlIsValid
          }
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

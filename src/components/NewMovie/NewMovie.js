import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    titleValid: false,
    titleError: '',
    description: '',
    imgUrl: '',
    imgUrlValid: false,
    imgUrlError: '',
    imdbUrl: '',
    imdbUrlValid: false,
    imdbUrlError: '',
    imdbId: '',
    imdbIdValid: false,
    imdbIdError: '',
  };

  onInputChange = (event) => {
    this.validateInput(event.target);

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onBlurHandle = (event) => {
    this.validateInput(event.target);
  };

  validateInput = (target) => {
    const { name } = target;
    const isRequired = target.required;
    const { value } = target;
    // eslint-disable-next-line max-len
    const regexTemplate = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    this.setState((prevState) => {
      if (isRequired && !value) {
        return ({
          [`${name}Valid`]: false,
          [`${name}Error`]: 'Field is required',
        });
      }

      if ((name === 'imgUrl' || name === 'imdbUrl')
          && !regexTemplate.test(value)) {
        return ({
          [`${name}Valid`]: false,
          [`${name}Error`]: 'Invalid URL',
        });
      }

      return ({
        [`${name}Valid`]: true,
        [`${name}Error`]: '',
      });
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    if (!this.state.titleValid || !this.state.imgUrlValid
      || !this.state.imdbUrlValid || !this.state.imdbIdValid) {
      return;
    }

    this.props.onAdd({
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    });

    this.clearForm();
  };

  clearForm = () => {
    this.setState({
      title: '',
      titleValid: false,
      titleError: '',
      description: '',
      imgUrl: '',
      imgUrlValid: false,
      imgUrlError: '',
      imdbUrl: '',
      imdbUrlValid: false,
      imdbUrlError: '',
      imdbId: '',
      imdbIdValid: false,
      imdbIdError: '',
    });
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={this.onFormSubmit}
        noValidate
      >
        <h2 className="form__title">Add new film</h2>
        <div className="form__field">
          <input
            className={`form__input ${this.state.titleError
              && 'form__input--error'}`}
            type="text"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.onInputChange}
            onBlur={this.onBlurHandle}
            required
          />
          {
            this.state.titleError
            && <ErrorMessage message={this.state.titleError} />
          }
        </div>
        <div className="form__field">
          <textarea
            className="form__input"
            placeholder="Description"
            rows={3}
            name="description"
            value={this.state.description}
            onChange={this.onInputChange}
          />
        </div>
        <div className="form__field">
          <input
            className={`form__input ${this.state.imgUrlError
              && 'form__input--error'}`}
            type="text"
            placeholder="Image link"
            name="imgUrl"
            value={this.state.imgUrl}
            onChange={this.onInputChange}
            onBlur={this.onBlurHandle}
            required
          />
          {
            this.state.imgUrlError
            && <ErrorMessage message={this.state.imgUrlError} />
          }
        </div>
        <div className="form__field">
          <input
            className={`form__input ${this.state.imdbUrlError
              && 'form__input--error'}`}
            type="text"
            placeholder="Film link on IMDb"
            name="imdbUrl"
            value={this.state.imdbUrl}
            onChange={this.onInputChange}
            onBlur={this.onBlurHandle}
            required
          />
          {
            this.state.imdbUrlError
            && <ErrorMessage message={this.state.imdbUrlError} />
          }
        </div>
        <div className="form__field">
          <input
            className={`form__input ${this.state.imdbIdError
              && 'form__input--error'}`}
            type="text"
            placeholder="Film id on IMDb"
            name="imdbId"
            value={this.state.imdbId}
            onChange={this.onInputChange}
            onBlur={this.onBlurHandle}
            required
          />
          {
            this.state.imdbIdError
            && <ErrorMessage message={this.state.imdbIdError} />
          }
        </div>
        <button
          className="form__submit"
          type="submit"
          disabled={
            !this.state.titleValid || !this.state.imgUrlValid
            || !this.state.imdbUrlValid || !this.state.imdbIdValid
          }
        >
          Save
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

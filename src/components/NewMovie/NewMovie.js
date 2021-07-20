import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormElement } from '../FormElement/FormElement';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isFormValid: false,
  };

  isTitleValid = false;

  isImgUrlValid = false;

  isImdbUrlValid = false;

  isImdbIdValid = false;

  onFieldChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  reset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isFormValid: false,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const movie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imgdbId: this.state.imdbId,
    };

    onAdd(movie);
    this.reset();
  }

  validateInput = (field, value) => {
    this[field] = value;

    this.setState({
      isFormValid: this.validateForm(),
    });
  }

  validateForm = () => {
    return this.isTitleValid && this.isImgUrlValid && this.isImdbUrlValid
    && this.isImdbIdValid;
  }

  render() {
    return (
      <form
        className="addMovieForm"
        onSubmit={(event) => {
          this.onSubmit(event);
        }}
      >
        <FormElement
          type="text"
          id="title"
          name="title"
          value={this.state.title}
          validationKey="isTitleValid"
          onChange={this.onFieldChange}
          setValidationResult={this.validateInput}
        />
        <FormElement
          type="textarea"
          id="description"
          name="description"
          value={this.state.description}
          onChange={this.onFieldChange}
        />
        <FormElement
          type="text"
          id="imgUrl"
          name="imgUrl"
          value={this.state.imgUrl}
          validationKey="isImgUrlValid"
          onChange={this.onFieldChange}
          setValidationResult={this.validateInput}
        />
        <FormElement
          type="text"
          id="imdbUrl"
          name="imdbUrl"
          value={this.state.imdbUrl}
          validationKey="isImdbUrlValid"
          onChange={this.onFieldChange}
          setValidationResult={this.validateInput}
        />
        <FormElement
          type="text"
          id="imdbId"
          name="imdbId"
          value={this.state.imdbId}
          validationKey="isImdbIdValid"
          onChange={this.onFieldChange}
          setValidationResult={this.validateInput}
        />
        <button
          type="submit"
          className="addMovieForm__submit"
          disabled={!this.state.isFormValid}
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

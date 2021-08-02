import React, { Component } from 'react';
import propTypes from 'prop-types';

import { InputField } from '../InputField';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    isTitleValid: true,
    description: '',
    imgUrl: '',
    isImgUrlValid: true,
    imdbUrl: '',
    isImdbUrlValid: true,
    imdbId: '',
    isImdbIdValid: true,
    isFormValid: true,
  };

  makeInputValid = (input) => {
    this.setState({
      [input]: true,
    });
  }

  makeInputInValid = (input) => {
    this.setState({
      [input]: false,
    });
  }

  addInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    switch (event.target.name) {
      case 'title':
        this.makeInputValid('isTitleValid');
        break;
      case 'imgUrl':
        this.makeInputValid('isImgUrlValid');
        break;
      case 'imdbUrl':
        this.makeInputValid('isImdbUrlValid');
        break;
      case 'imdbId':
        this.makeInputValid('isImdbIdValid');
        break;
      default:
        break;
    }
  }

  findInvalidInputs = () => {
    if (this.state.title === '') {
      this.makeInputInValid('isTitleValid');
    }

    if (this.state.imgUrl === '') {
      this.makeInputInValid('isImgUrlValid');
    }

    if (this.state.imdbUrl === '') {
      this.makeInputInValid('isImdbUrlValid');
    }

    if (this.state.imdbId === '') {
      this.makeInputInValid('isImdbIdValid');
    }
  }

  addNewMovie = (event) => {
    event.preventDefault();
    if (this.state.title
        && this.state.imdbUrl
        && this.state.imgUrl
        && this.state.imdbId
    ) {
      this.props.onAdd(this.state);
      this.clearForm();
    } else {
      this.findInvalidInputs();
    }
  }

  clearForm = () => {
    this.setState({
      title: '',
      isTitleValid: true,
      description: '',
      imgUrl: '',
      isImgUrlValid: true,
      imdbUrl: '',
      isImdbUrlValid: true,
      imdbId: '',
      isImdbIdValid: true,
    });
  }

  render() {
    const {
      title,
      isTitleValid,
      description,
      imdbUrl,
      isImgUrlValid,
      imgUrl,
      isImdbUrlValid,
      imdbId,
      isImdbIdValid,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.addNewMovie}
      >
        <InputField
          title="title"
          value={title}
          onChange={this.addInput}
          isRequired
          isValid={this.state.isTitleValid}
        />
        <InputField
          title="description"
          value={description}
          onChange={this.addInput}
        />
        <InputField
          title="imgUrl"
          value={imgUrl}
          onChange={this.addInput}
          isRequired
          isValid={this.state.isImgUrlValid}
        />
        <InputField
          title="imdbUrl"
          value={imdbUrl}
          onChange={this.addInput}
          isRequired
          isValid={this.state.isImdbUrlValid}
        />
        <InputField
          title="imdbId"
          value={imdbId}
          onChange={this.addInput}
          isRequired
          isValid={this.state.isImdbIdValid}
        />
        <button
          type="submit"
          className="button"
          disabled={!isTitleValid
            || !isImgUrlValid
            || !isImdbUrlValid
            || !isImdbIdValid}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: propTypes.func.isRequired,
};

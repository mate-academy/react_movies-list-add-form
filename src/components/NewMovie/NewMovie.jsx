import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormInput } from '../FormInput';
import { FormTextarea } from '../FormTextarea';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isButtonDisabled: false,
    isTitleValid: null,
    isImgUrlValid: null,
    isImdbUrlValid: null,
    isImdbIdValid: null,
  };

  setMovieTitle = (event) => {
    const currentValue = event.target.value;

    if (currentValue.length < 1
      || currentValue.trim().length < 1) {
      this.setState({
        isTitleValid: false,
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        isTitleValid: true,
        isButtonDisabled: false,
      });
    }

    this.setState({ title: currentValue });
  }

  setMovieDescription = (event) => {
    this.setState({ description: event.target.value });
  }

  setMovieimgUrl = (event) => {
    const currentValue = event.target.value;
    const regEx = new RegExp('^((([A-Za-z]{3,9}:(?://)?)'
    + '(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|'
    + '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)'
    + '((?:/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)'
    + '#?(?:[.!/\\\\w]*))?)$');

    if (!regEx.test(currentValue)) {
      this.setState({
        isImgUrlValid: false,
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        isImgUrlValid: true,
        isButtonDisabled: false,
      });
    }

    this.setState({ imgUrl: currentValue });
  }

  setMovieimdbUrl = (event) => {
    const currentValue = event.target.value;
    const regEx = new RegExp('^((([A-Za-z]{3,9}:(?://)?)'
    + '(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|'
    + '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)'
    + '((?:/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)'
    + '#?(?:[.!/\\\\w]*))?)$');

    if (!regEx.test(currentValue)) {
      this.setState({
        isImdbUrlValid: false,
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        isImdbUrlValid: true,
        isButtonDisabled: false,
      });
    }

    this.setState({ imdbUrl: currentValue });
  }

  setMovieimdbId = (event) => {
    const currentValue = event.target.value;

    if (currentValue.length < 1
      || currentValue.trim().length < 1) {
      this.setState({
        isImdbIdValid: false,
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        isImdbIdValid: true,
        isButtonDisabled: false,
      });
    }

    this.setState({ imdbId: currentValue });
  }

  onMovieAdd = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    const { addMovie } = this.props;

    if (title === '') {
      this.setState({
        isTitleValid: false,
        isButtonDisabled: true,
      });

      return;
    }

    if (imgUrl === '') {
      this.setState({
        isImgUrlValid: false,
        isButtonDisabled: true,
      });

      return;
    }

    if (imdbUrl === '') {
      this.setState({
        isImdbUrlValid: false,
        isButtonDisabled: true,
      });

      return;
    }

    if (imdbId === '') {
      this.setState({
        isImdbIdValid: false,
        isButtonDisabled: true,
      });

      return;
    }

    const currentMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(currentMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isTitleValid: null,
      isImgUrlValid: null,
      isImdbUrlValid: null,
      isImdbIdValid: null,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isButtonDisabled,
      isTitleValid,
      isImgUrlValid,
      isImdbUrlValid,
      isImdbIdValid,
    } = this.state;
    const buttonClass = classNames({
      btn: true,
      'btn-primary': true,
      disabled: isButtonDisabled,
    });

    return (
      <form
        className="row g-3 needs-validation"
        onSubmit={event => this.onMovieAdd(event)}
      >
        <FormInput
          title="Title"
          inputId="title-input"
          value={title}
          action={this.setMovieTitle}
          validator={isTitleValid}
        />
        <FormTextarea
          title="Description"
          inputId="description-textarea"
          value={description}
          action={this.setMovieDescription}
        />
        <FormInput
          title="imgUrl"
          inputId="imgUrl-input"
          value={imgUrl}
          action={this.setMovieimgUrl}
          validator={isImgUrlValid}
        />
        <FormInput
          title="imdbUrl"
          inputId="imdbUrl-input"
          value={imdbUrl}
          action={this.setMovieimdbUrl}
          validator={isImdbUrlValid}
        />
        <FormInput
          title="imdbId"
          inputId="imdbId-input"
          value={imdbId}
          action={this.setMovieimdbId}
          validator={isImdbIdValid}
        />
        <button
          type="submit"
          className={buttonClass}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

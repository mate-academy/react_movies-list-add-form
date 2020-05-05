import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// eslint-disable-next-line
const pattern = new RegExp('^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)#?(?:[.!/\\\\\\w]*))?)$');

export class NewMovie extends Component {
  state = {
    newTitle: '',
    newDescription: '',
    newImgUrl: '',
    newImdbUrl: '',
    newImdbID: '',
    buttonDisabled: true,
    isTitleValid: true,
    isImgUrlValid: true,
    isImdbUrlValid: true,
    isImdbIDValid: true,
  };

  addTitle = (event) => {
    this.setState({ newTitle: event.target.value });
  }

  addDescription = (event) => {
    this.setState({ newDescription: event.target.value });
  }

  addImgUrl = (event) => {
    this.setState({ newImgUrl: event.target.value });
  }

  addImdbUrl = (event) => {
    this.setState({ newImdbUrl: event.target.value });
  }

  addImdbID = (event) => {
    this.setState({ newImdbID: event.target.value });
  }

  validateOnBlurTitle = (event) => {
    if (event.target.value === '') {
      this.setState({ isTitleValid: false });
    } else {
      this.setState({ isTitleValid: true });
    }
  }

  validateOnBlurImdbID = (event) => {
    if (event.target.value === '') {
      this.setState({ isImdbIDValid: false });
    } else {
      this.setState({ isImdbIDValid: true });
    }
  }

  validateOnBlurImdbUrl = (event) => {
    if (pattern.test(event.target.value) === false) {
      this.setState({ isImdbUrlValid: false });
    } else {
      this.setState({ isImdbUrlValid: true });
    }
  }

  validateOnBlurImgUrl = (event) => {
    if (pattern.test(event.target.value) === false) {
      this.setState({ isImgUrlValid: false });
    } else {
      this.setState({ isImgUrlValid: true });
    }
  }

  resetInputedData = () => {
    this.setState(() => ({
      newTitle: '',
      newDescription: '',
      newImgUrl: '',
      newImdbUrl: '',
      newImdbID: '',
      buttonDisabled: true,
      isTitleValid: true,
      isImgUrlValid: true,
      isImdbUrlValid: true,
      isImdbIDValid: true,
    }));
  }

  isButtonDisabled = () => {
    if (this.state.newTitle.trim().length > 0
      && pattern.test(this.state.newImgUrl) === true
      && pattern.test(this.state.newImdbUrl) === true
      && this.state.newImdbID.trim().length > 0) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  addMovie = (event) => {
    event.preventDefault();
    this.props.addMovie({
      title: this.state.newTitle,
      description: this.state.newDescription,
      imgUrl: this.state.newImgUrl,
      imdbUrl: this.state.newImdbUrl,
      imdbId: this.state.newImdbID,
    });
    this.resetInputedData();
  }

  render() {
    return (
      <form className="form" onChange={this.isButtonDisabled}>
        <input
          placeholder="Title"
          onBlur={this.validateOnBlurTitle}
          onChange={this.addTitle}
          value={this.state.newTitle}
          className={classNames(this.state.isTitleValid
            ? 'form__title'
            : 'form__title_false')}
        />
        <input
          placeholder="Description"
          onChange={this.addDescription}
          value={this.state.newDescription}
          className="form__description"
        />
        <input
          placeholder="ImgUrl"
          onBlur={this.validateOnBlurImgUrl}
          onChange={this.addImgUrl}
          value={this.state.newImgUrl}
          className={classNames(this.state.isImgUrlValid
            ? 'form__imgUrl'
            : 'form__imgUrl_false')}
        />
        <input
          placeholder="ImdbUrl"
          onBlur={this.validateOnBlurImdbUrl}
          onChange={this.addImdbUrl}
          value={this.state.newImdbUrl}
          className={classNames(this.state.isImdbUrlValid
            ? 'form__imdbUrl'
            : 'form__imdbUrl_false')}
        />
        <input
          placeholder="ImdbID"
          onBlur={this.validateOnBlurImdbID}
          onChange={this.addImdbID}
          value={this.state.newImdbID}
          className={classNames(this.state.isImdbIDValid
            ? 'form__imdbId'
            : 'form__imdbId_false')}
        />
        <button
          type="submit"
          onClick={this.addMovie}
          disabled={this.state.buttonDisabled}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      imdbUrl: PropTypes.string.isRequired,
      imdbId: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

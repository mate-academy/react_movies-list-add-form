import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

// eslint-disable-next-line max-len
const regString = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  errorTitle: '',
  errorImgUrl: '',
  errorImdbUrl: '',
  errorImdbId: '',
};

export class NewMovie extends Component {
  state = initialState;

  handleSubmit = (event) => {
    const { addMovie } = this.props;
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    event.preventDefault();
    addMovie(newMovie);
    this.setState(initialState);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    let error = '';

    switch (name) {
      case 'title':
        error = 'errorTitle';
        break;
      case 'imgUrl':
        error = 'errorImgUrl';
        break;
      case 'imdbUrl':
        error = 'errorImdbUrl';
        break;
      case 'imdbId':
        error = 'errorImdbId';
        break;
      default:
        break;
    }

    this.setState({
      [name]: value,
      [error]: '',
    });
  };

  checkURL = (str) => {
    if (str.match(regString)) {
      return true;
    }

    return false;
  };

  checkError = () => {
    const { title, imgUrl, imdbUrl, imdbId } = this.state;

    return !title || !imgUrl || !imdbUrl || !imdbId
    || !this.checkURL(imgUrl) || !this.checkURL(imdbUrl);
  };

  onBlurChecker = (event) => {
    let error = '';

    if (event.target.name === 'imgUrl' || event.target.name === 'imdbUrl') {
      if (
        !this.checkURL(event.target.value)
          || !event.target.value
      ) {
        error = 'Please write correct link (ex. https://...)';
      } else {
        error = '';
      }

      event.target.name === 'imgUrl'
        ? this.setState({ errorImgUrl: error })
        : this.setState({ errorImdbUrl: error });
    } else {
      if (!event.target.value) {
        error = 'Please write something';
      } else {
        error = '';
      }

      event.target.name === 'title'
        ? this.setState({ errorTitle: error })
        : this.setState({ errorImdbId: error });
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errorTitle,
      errorImgUrl,
      errorImdbUrl,
      errorImdbId,
    } = this.state;

    return (
      <div className="App__form">
        <form
          className="form-group"
          onSubmit={this.handleSubmit}
        >
          <Input
            name="title"
            value={title}
            error={errorTitle}
            onBlurChecker={this.onBlurChecker}
            handleChange={this.handleChange}
          />
          <Textarea
            value={description}
            handleChange={this.handleChange}
          />
          <Input
            name="imgUrl"
            value={imgUrl}
            error={errorImgUrl}
            onBlurChecker={this.onBlurChecker}
            handleChange={this.handleChange}
          />
          <Input
            name="imdbUrl"
            value={imdbUrl}
            error={errorImdbUrl}
            onBlurChecker={this.onBlurChecker}
            handleChange={this.handleChange}
          />
          <Input
            name="imdbId"
            value={imdbId}
            error={errorImdbId}
            onBlurChecker={this.onBlurChecker}
            handleChange={this.handleChange}
          />
          <button
            type="submit"
            className="App__button"
            disabled={this.checkError()}
          >
            Add movie!
          </button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

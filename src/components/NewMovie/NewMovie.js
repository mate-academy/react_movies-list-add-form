import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    isTitleCorrect: true,
    description: '',
    isDescriptionCorrect: true,
    imgUrl: '',
    isImgUrlCorrect: true,
    imdbUrl: '',
    isImdbUrlCorrect: true,
    imdbId: '',
    isImdbIdCorrect: true,
  };

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  blurHandler = (event) => {
    const { name } = event.target;

    if (this.validateData(name)) {
      this.setState(
        { [`is${name[0].toUpperCase() + name.slice(1)}Correct`]: true },
      );
    } else {
      this.setState(
        { [`is${name[0].toUpperCase() + name.slice(1)}Correct`]: false },
      );
    }
  }

  validateData = (name) => {
    // eslint-disable-next-line
    const regexTester = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    const value = this.state[name];

    if (name === 'description') {
      return true;
    }

    if (value.length < 4) {
      return false;
    }

    if (name === 'imdbUrl' || name === 'imgUrl') {
      return regexTester.test(value);
    }

    return true;
  }

  createFilm = () => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };
  };

  submitForm = (event) => {
    event.preventDefault();

    let isFormValid = true;

    if (!this.validateData('title')) {
      isFormValid = false;
      this.setState({ isTitleCorrect: false });
    }

    if (!this.validateData('description')) {
      isFormValid = false;
      this.setState({ isDescriptionCorrect: false });
    }

    if (!this.validateData('imgUrl')) {
      isFormValid = false;
      this.setState({ isImgUrlCorrect: false });
    }

    if (!this.validateData('imdbUrl')) {
      isFormValid = false;
      this.setState({ isImdbUrlCorrect: false });
    }

    if (!this.validateData('imdbId')) {
      isFormValid = false;
      this.setState({ isImdbIdCorrect: false });
    }

    if (isFormValid) {
      this.clearForm();
      this.props.onAdd(this.createFilm());
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleCorrect,
      isDescriptionCorrect,
      isImgUrlCorrect,
      isImdbUrlCorrect,
      isImdbIdCorrect,
    } = this.state;

    return (
      <>
        <h2 className="add-movie__header">
          Add New Movie
        </h2>

        <form
          onSubmit={this.submitForm}
        >
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            className={ClassNames('input', { 'wrong-input': !isTitleCorrect })}
          />

          {isTitleCorrect || (
            <div className="error-message">Incorrect title</div>
          )}

          <textarea
            type="text"
            name="description"
            placeholder="Enter description"
            value={description}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            className={ClassNames(
              'input', { 'wrong-input': !isDescriptionCorrect },
            )}
          />

          {isDescriptionCorrect || (
            <div className="error-message">Incorrect description</div>
          )}

          <input
            type="text"
            name="imgUrl"
            placeholder="Enter image Url"
            value={imgUrl}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            className={ClassNames('input', { 'wrong-input': !isImgUrlCorrect })}
          />

          {isImgUrlCorrect || (
            <div className="error-message">Incorrect image Url</div>
          )}

          <input
            type="text"
            name="imdbUrl"
            placeholder="Enter IMDB Url"
            value={imdbUrl}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            className={ClassNames(
              'input', { 'wrong-input': !isImdbUrlCorrect },
            )}
          />

          {isImdbUrlCorrect || (
            <div className="error-message">Incorrect IMBD Url</div>
          )}

          <input
            type="text"
            name="imdbId"
            placeholder="Enter IMDB Id"
            value={imdbId}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            className={ClassNames('input', { 'wrong-input': !isImdbIdCorrect })}
          />

          {isImdbIdCorrect || (
            <div className="error-message">Incorrect IMBD Id</div>
          )}

          <button
            type="submit"
            className={ClassNames('button')}
          >
            Add film
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

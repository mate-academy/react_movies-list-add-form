import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isErrorValidation: false,
  };

  checkValidationUrl = (url) => {
    // eslint-disable-next-line
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return regExp.test(url);
  }

  createMovie = () => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    };
  }

  clearMovie = () => {
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
    let isValidationUrl = false;

    if (name === 'imgUrl' || name === 'imbdUrl') {
      isValidationUrl = this.checkValidationUrl(value);
    }

    if (!isValidationUrl) {
      this.setState({ isErrorValidation: true });
    }

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl, imdbUrl,
      imdbId,
      isErrorValidation,
    } = this.state;
    const { onAdd } = this.props;

    return (
      <>
        <h1 className="title">
          Add new movie
        </h1>
        {isErrorValidation && (
          <div className="is-error">
            <h1>Please enter corect url</h1>
          </div>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onAdd(this.createMovie());
            this.clearMovie();
          }}
        >
          <input
            type="text"
            className="input"
            required
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={this.changeHandler}
          />
          <textarea
            type="text"
            name="description"
            required
            placeholder="Enter description"
            className="input"
            value={description}
            onChange={this.changeHandler}

          />
          <input
            type="text"
            name="imgUrl"
            required
            className="input"
            placeholder="Enter img url"
            value={imgUrl}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="imdbUrl"
            required
            className="input"
            placeholder="Enter imdbUrl"
            value={imdbUrl}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="imdbId"
            required
            className="input"
            placeholder="Enter imdbId"
            value={imdbId}
            onChange={this.changeHandler}
          />
          <button
            className="button"
            type="submit"
            disabled={isErrorValidation}
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

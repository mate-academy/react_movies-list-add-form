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
    fiedsError: {
      titleError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbIdError: false,
    },
  };

  onInputChange = (event) => {
    const { target } = event;

    this.setState(state => (
      {
        ...state,
        [target.name]: target.value,
        fiedsError: {
          ...state.fiedsError,
          [`${target.name}Error`]: false,
        },
      }));
  }

  onSubmit = (event) => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    // eslint-disable-next-line
    const validUrlRegexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/g;
    // eslint-disable-next-line
    const validbUrlRegexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/g;

    event.preventDefault();

    this.setState(state => ({
      ...state,
      fiedsError: {
        titleError: !state.title,
        imgUrlError: !validUrlRegexp.test(state.imgUrl),
        imdbUrlError: !validbUrlRegexp.test(state.imdbUrl),
        imdbIdError: !state.imdbId,
      },
    }));

    if (!title) {
      return;
    }

    if (!imdbId) {
      return;
    }

    if (!validUrlRegexp.test(imgUrl)) {
      return;
    }

    if (!validbUrlRegexp.test(imdbUrl)) {
      return;
    }

    this.props.addMovie({ ...this.state });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      fiedsError: {
        titleError: false,
        imgUrlError: false,
        imdbUrlError: false,
        imdbIdError: false,
      },
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      fiedsError,
    } = this.state;

    return (
      <div className="new-movie">
        <form
          onSubmit={this.onSubmit}
          className="new-movie__form"
        >
          <input
            type="text"
            placeholder="title"
            name="title"
            value={title}
            onChange={this.onInputChange}
            className={`new-movie__input 
              ${fiedsError.titleError ? 'new-movie__input--error' : ''}`}
          />
          {fiedsError.titleError
            && <span className="new-movie__error">Enter valid title!</span>}
          <input
            type="text"
            placeholder="description"
            name="description"
            value={description}
            onChange={this.onInputChange}
            className="new-movie__input"
          />
          <input
            type="text"
            placeholder="imgUrl"
            name="imgUrl"
            value={imgUrl}
            onChange={this.onInputChange}
            className={`new-movie__input
              ${fiedsError.imgUrlError ? 'new-movie__input--error' : ''}`}
          />
          {fiedsError.imgUrlError
            && <span className="new-movie__error">Enter valid imgUrl!</span>}
          <input
            type="text"
            placeholder="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.onInputChange}
            className={`new-movie__input
              ${fiedsError.imdbUrlError ? 'new-movie__input--error' : ''}`}
          />
          {fiedsError.imdbUrlError
            && <span className="new-movie__error">Enter valid imdbUrl!</span>}
          <input
            type="text"
            placeholder="imdbId"
            name="imdbId"
            value={imdbId}
            onChange={this.onInputChange}
            className={`new-movie__input
              ${fiedsError.imdbIdError ? 'new-movie__input--error' : ''}`}
          />
          {fiedsError.imdbIdError
            && <span className="new-movie__error">Enter valid imdbId!</span>}
          <button
            type="submit"
            className="new-movie__submit-btn"
            disabled={Object.values(fiedsError).some(value => value === true)}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const regEx = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const initialErrorsStatus = {
  isTitleError: false,
  isImdbUrlError: false,
  isImgUrlError: false,
  isImdbIdError: false,
};

export class NewMovie extends PureComponent {
  state = {
    ...initialState,
    ...initialErrorsStatus,
  };

  changeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      imdbId,
      imgUrl,
      imdbUrl,
      description,
      isTitleError,
      isImgUrlError,
      isImdbUrlError,
      isImdbIdError,
    }
    = this.state;

    if (isTitleError || isImdbIdError || isImdbUrlError || isImgUrlError) {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  validateField = (event) => {
    const { name, value } = event.target;
    let {
      isTitleError,
      isImgUrlError,
      isImdbUrlError,
      isImdbIdError,
    } = this.state;

    switch (name) {
      case 'title':
        isTitleError = !value;
        break;
      case 'imgUrl':
        isImgUrlError = !value.match(regEx);
        break;
      case 'imdbUrl':
        isImdbUrlError = !value.match(regEx);
        break;
      case 'imdbId':
        isImdbIdError = !value;
        break;
      default:
        break;
    }

    this.setState({
      isTitleError,
      isImgUrlError,
      isImdbUrlError,
      isImdbIdError,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleError,
      isImdbIdError,
      isImgUrlError,
      isImdbUrlError,
    }
    = this.state;

    return (
      <form
        onSubmit={this.onSubmit}
      >
        <div className="field">
          <label className="label">
            Title
            <div className="control">
              <input
                type="text"
                name="title"
                placeholder="title"
                className={`input ${isTitleError && 'is-danger'}`}
                value={title}
                onChange={this.changeHandler}
                required
                onBlur={this.validateField}
              />

              {isTitleError && (
                <p className="has-text-danger">Write here title</p>
              )}
            </div>
          </label>
        </div>

        <div className="field">
          <label className="label">
            Description
            <div className="control">
              <textarea
                className="textarea"
                placeholder="description"
                name="description"
                value={description}
                onChange={this.changeHandler}
              />
            </div>
          </label>
        </div>

        <div className="field">
          <label className="label">
            Image Url
            <div className="control">
              <input
                type="text"
                className={`input ${isImgUrlError && 'is-danger'}`}
                placeholder="imgUrl"
                name="imgUrl"
                value={imgUrl}
                onChange={this.changeHandler}
                required
                onBlur={this.validateField}
              />

              {isImgUrlError && (
                <p className="has-text-danger">Write here correct Image Url</p>
              )}
            </div>
          </label>
        </div>

        <div className="field">
          <label className="label">
            Imdb Url
            <div className="control">
              <input
                type="text"
                className={`input ${isImdbUrlError && 'is-danger'}`}
                placeholder="imdbUrl"
                name="imdbUrl"
                value={imdbUrl}
                onChange={this.changeHandler}
                required
                onBlur={this.validateField}
              />

              {isImdbUrlError && (
                <p className="has-text-danger">Write here correct URL</p>
              )}
            </div>
          </label>
        </div>

        <div className="field">
          <label className="label">
            Imdb ID
            <div className="control">
              <input
                type="text"
                className={`input ${isImdbIdError && 'is-danger'}`}
                placeholder="imdbId"
                name="imdbId"
                value={imdbId}
                onChange={this.changeHandler}
                required
                onBlur={this.validateField}
              />

              {isImdbIdError && (
                <p className="has-text-danger">Put here correct ID</p>
              )}
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="button is-success"
        >
          Add This Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

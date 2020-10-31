import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const regEx = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends PureComponent {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: false,
    imdbUrlError: false,
    imgUrlError: false,
    imdbIdError: false,
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
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    }
    = this.state;

    if (titleError || imdbIdError || imdbUrlError || imgUrlError) {
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
    let { titleError, imgUrlError, imdbUrlError, imdbIdError } = this.state;

    switch (name) {
      case 'title':
        titleError = !value;
        break;
      case 'imgUrl':
        imgUrlError = !value.match(regEx);
        break;
      case 'imdbUrl':
        imdbUrlError = !value.match(regEx);
        break;
      case 'imdbId':
        imdbIdError = !value;
        break;
      default:
        break;
    }

    this.setState({
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      imdbIdError,
      imgUrlError,
      imdbUrlError,
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
                className={`input ${titleError && 'is-danger'}`}
                value={title}
                onChange={this.changeHandler}
                required
                onBlur={this.validateField}
              />

              {titleError && (
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
                className={`input ${imgUrlError && 'is-danger'}`}
                placeholder="imgUrl"
                name="imgUrl"
                value={imgUrl}
                onChange={this.changeHandler}
                required
                onBlur={this.validateField}
              />

              {imgUrlError && (
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
                className={`input ${imdbUrlError && 'is-danger'}`}
                placeholder="imdbUrl"
                name="imdbUrl"
                value={imdbUrl}
                onChange={this.changeHandler}
                required
                onBlur={this.validateField}
              />

              {imdbUrlError && (
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
                className={`input ${imdbIdError && 'is-danger'}`}
                placeholder="imdbId"
                name="imdbId"
                value={imdbId}
                onChange={this.changeHandler}
                required
                onBlur={this.validateField}
              />

              {imdbIdError && (
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

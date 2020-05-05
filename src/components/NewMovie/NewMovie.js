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
    titleError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,
  };

  // eslint-disable-next-line max-len
  urlValidate = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
      titleError: false,
    });
  }

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  handleImgUrlChange = (event) => {
    this.setState({
      imgUrl: event.target.value,
      imgUrlError: false,
    });
  }

  handleImdbUrlChange = (event) => {
    this.setState({
      imdbUrl: event.target.value,
      imdbUrlError: false,
    });
  }

  handleImdbIdChange = (event) => {
    this.setState({
      imdbId: event.target.value,
      imdbIdError: false,
    });
  }

  handleSubmit =(event) => {
    event.preventDefault();

    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId }
      = this.state;

    if (!title.trim()
      || !this.urlValidate.test(imgUrl)
      || !this.urlValidate.test(imdbUrl)
      || !imdbId.trim()
    ) {
      this.setState({
        titleError: !title.trim(),
        imgUrlError: true,
        imdbUrlError: true,
        imdbIdError: !imdbId.trim(),
      });

      return;
    }

    const newFilm = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newFilm);
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label className="form__label">
          Title
          <input
            className={titleError
              ? 'form__field form__field--error' : 'form__field'}
            value={title}
            onChange={this.handleTitleChange}
          />
          <div>
            {titleError
            && <span className="form__errorMsg">Enter a Title Please</span>}
          </div>
        </label>
        <label className="form__label">
          Description
          <textarea
            className="form__field"
            value={description}
            onChange={this.handleDescriptionChange}
          />
        </label>
        <label className="form__label">
          imgUrl
          <input
            className={imgUrlError
              ? 'form__field form__field--error' : 'form__field'}
            value={imgUrl}
            onChange={this.handleImgUrlChange}
          />
          <div>
            {imgUrlError
            && <span className="form__errorMsg">Enter image URL please</span>}
          </div>
        </label>
        <label className="form__label">
          imdbUrl
          <input
            value={imdbUrl}
            className={imdbUrlError
              ? 'form__field form__field--error' : 'form__field'}
            onChange={this.handleImdbUrlChange}
          />
          <div>
            {imdbUrlError
            && <span className="form__errorMsg">Enter imdb URL please</span>}
          </div>
        </label>
        <label className="form__label">
          imdbId
          <input
            value={imdbId}
            className={imdbIdError
              ? 'form__field form__field--error' : 'form__field'}
            onChange={this.handleImdbIdChange}
          />
          <div>
            {imdbIdError
            && <span className="form__errorMsg">Enter movie ID please</span>}
          </div>
        </label>
        <div className="form__btnDiv">
          <button type="submit" className="form__btn">
            Add Movie
          </button>
        </div>

      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

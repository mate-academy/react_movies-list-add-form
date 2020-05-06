import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import cn from 'classnames';

// eslint-disable-next-line max-len
const urlValidate = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

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

  handleReset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      titleError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbIdError: false,
    });
  }

  blurTitleError = () => {
    if (!this.state.title.trim()) {
      this.setState({
        titleError: true,
      });
    }
  }

  blurImgUrlError = () => {
    if (!urlValidate.test(this.state.imgUrl)) {
      this.setState({
        imgUrlError: true,
      });
    }
  }

  blurImdbUrlError = () => {
    if (!urlValidate.test(this.state.imdbUrl)) {
      this.setState({
        imdbUrlError: true,
      });
    }
  }

  blurImdbIdError = () => {
    if (!this.state.imdbId.trim()) {
      this.setState({
        imdbIdError: true,
      });
    }
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
      || !urlValidate.test(imgUrl)
      || !urlValidate.test(imdbUrl)
      || !imdbId.trim()
    ) {
      this.setState({
        titleError: !title.trim(),
        imgUrlError: !urlValidate.test(imgUrl),
        imdbUrlError: !urlValidate.test(imdbUrl),
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

    this.handleReset();
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
            className={cn({
              form__field: true,
              form__fieldError: titleError,
            })}
            value={title}
            onChange={this.handleTitleChange}
            onBlur={this.blurTitleError}
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
            className={cn({
              form__field: true,
              form__fieldError: imgUrlError,
            })}
            value={imgUrl}
            onChange={this.handleImgUrlChange}
            onBlur={this.blurImgUrlError}
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
            className={cn({
              form__field: true,
              form__fieldError: imdbUrlError,
            })}
            onChange={this.handleImdbUrlChange}
            onBlur={this.blurImdbUrlError}
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
            className={cn({
              form__field: true,
              form__fieldError: imdbIdError,
            })}
            onChange={this.handleImdbIdChange}
            onBlur={this.blurImdbIdError}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.css';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isValid: [],
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  resetForm = () => (
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isValid: [],
    })
  );

  addNoValid = (newValue) => {
    this.setState(state => ({
      isValid: [...state.isValid, newValue],
    }));
  };

  removeNoValid = (removeValue) => {
    this.setState(state => ({
      isValid: state.isValid.filter(elem => (elem !== removeValue)),
    }));
  };

  validUrl = (url) => {
    const ragExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return !ragExp.test(url);
  };

  validRepeatData = (compareValue) => {
    return !this.props.movies.some(movie => (
      movie[compareValue] === this.state[compareValue]));
  };

  valid = ({ target }) => {
    const fieldName = target.name;
    const { value } = target;

    if (fieldName === 'imgUrl' || fieldName === 'imdbUrl'
    || fieldName === 'imdbId') {
      if (!this.validRepeatData(fieldName)) {
        this.addNoValid(fieldName);

        return;
      }

      this.removeNoValid(fieldName);
    }

    if (fieldName !== 'imgUrl' && fieldName !== 'imdbUrl') {
      if (!value.trim()) {
        this.addNoValid(fieldName);
      } else {
        this.removeNoValid(fieldName);
      }

      return;
    }

    if (this.validUrl(this.state[fieldName])) {
      this.addNoValid(fieldName);
    } else {
      this.removeNoValid(fieldName);
    }
  };

  validAllForm = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return !this.validUrl(imgUrl) && !this.validUrl(imdbUrl)
    && title.trim() && description.trim() && imdbId.trim()
    && this.validRepeatData('imgUrl') && this.validRepeatData('imdbUrl')
    && this.validRepeatData('imdbId');
  };

  render() {
    const { addMovie } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isValid,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!this.validAllForm()) {
            return;
          }

          addMovie({
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          });
          this.resetForm();
        }}
      >
        <h2>Form add new cool film</h2>

        <hr />
        <label className={isValid.includes('title') ? 'error' : ''}>
          title
          <input
            id="title"
            name="title"
            placeholder="title your film.."
            value={this.state.title}
            onChange={this.handleChange}
            onBlur={this.valid}
          />
        </label>
        <hr />

        <label className={isValid.includes('description') ? 'error' : ''}>
          description
          <input
            id="description"
            name="description"
            placeholder="description your film.."
            value={this.state.description}
            onChange={this.handleChange}
            onBlur={this.valid}
          />
        </label>
        <hr />

        <label className={isValid.includes('imgUrl') ? 'error-repeat' : ''}>
          img url
          <input
            id="imgUrl"
            name="imgUrl"
            placeholder="img url"
            value={this.state.imgUrl}
            onChange={this.handleChange}
            onBlur={this.valid}
          />
        </label>
        <hr />

        <label className={isValid.includes('imdbUrl') ? 'error-repeat' : ''}>
          imdb url
          <input
            id="imdbUrl"
            name="imdbUrl"
            placeholder="imdb url"
            value={this.state.imdbUrl}
            onChange={this.handleChange}
            onBlur={this.valid}
          />
        </label>
        <hr />

        <label className={isValid.includes('imdbId') ? 'error-repeat' : ''}>
          imdb id
          <input
            id="imdbId"
            name="imdbId"
            placeholder="imdb id"
            value={this.state.imdbId}
            onChange={this.handleChange}
            onBlur={this.valid}
          />
        </label>
        <hr />

        <button
          type="submit"
          disabled={!this.validAllForm()}
        >
          Save film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
  movies: PropTypes.shape({
    imgUrl: PropTypes.string.isRequired,
    imdbUrl: PropTypes.string.isRequired,
    imdbId: PropTypes.string.isRequired,
  }).isRequired,
};

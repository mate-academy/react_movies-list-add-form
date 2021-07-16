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
      [target.id]: target.value,
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

  changeIsValid = (newValue) => {
    this.setState(state => ({
      isValid: [...state.isValid, newValue],
    }));
  };

  valid = (e, idElem) => {
    const ragExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const id = e ? e.target.id : idElem;
    const value = e ? e.target.value : this.state[idElem];

    if (id !== 'imgUrl' && id !== 'imdbUrl') {
      if (!value.trim()) {
        if (!e) {
          this.changeIsValid('');

          return false;
        }

        this.changeIsValid(id);
      } else {
        this.setState(state => ({
          isValid: state.isValid.filter(elem => (elem !== id)),
        }));
      }

      return true;
    }

    if (!ragExp.test(this.state[id])) {
      if (!e) {
        this.changeIsValid('');

        return false;
      }

      this.changeIsValid(id);
    }

    return true;
  };

  validAllForm = () => (
    this.valid(null, 'title') || this.valid(null, 'description')
    || this.valid(null, 'imgUrl') || this.valid(null, 'imdbUrl')
    || this.valid(null, 'imdbId')
  );

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
            placeholder="description your film.."
            value={this.state.description}
            onChange={this.handleChange}
            onBlur={this.valid}
          />
        </label>
        <hr />

        <label className={isValid.includes('imgUrl') ? 'error' : ''}>
          img url
          <input
            id="imgUrl"
            placeholder="img url"
            value={this.state.imgUrl}
            onChange={this.handleChange}
            onBlur={this.valid}
          />
        </label>
        <hr />

        <label className={isValid.includes('imdbUrl') ? 'error' : ''}>
          imdb url
          <input
            id="imdbUrl"
            placeholder="imdb url"
            value={this.state.imdbUrl}
            onChange={this.handleChange}
            onBlur={this.valid}
          />
        </label>
        <hr />

        <label className={isValid.includes('imdbId') ? 'error' : ''}>
          imdb id
          <input
            id="imdbId"
            placeholder="imdb id"
            value={this.state.imdbId}
            onChange={this.handleChange}
            onBlur={this.valid}
          />
        </label>
        <hr />

        <button
          type="submit"
          disabled={!!isValid.length}
        >
          Save film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

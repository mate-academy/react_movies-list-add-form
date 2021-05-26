import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imdbUrl: '',
    imgUrl: '',
    imdbId: '',
    errors: {},
  };

  newFilmHandler = () => {
    const {
      title, description, imdbUrl, imdbId, imgUrl, errors,
    } = this.state;

    if (!Object.keys(errors).length) {
      this.props.addMovie({
        title,
        description,
        imdbUrl,
        imgUrl,
        imdbId,
      });
      this.setState({
        title: '',
        description: '',
        imdbUrl: '',
        imgUrl: '',
        imdbId: '',
        errors: {},
      });
    }
  }

  handleError = (event) => {
    // eslint-disable-next-line max-len
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const { name, value } = event.target;
    const urlValid = (name.includes('Url'))
      ? regExp.test(value)
      : true;
    const validator = `is${name[0].toUpperCase() + name.slice(1)}Valid`;

    if (!Object.hasOwnProperty.call(this.state.errors, validator)
    && (value === '' || !urlValid)) {
      this.setState((state) => {
        return {
          errors: {
            ...state.errors,
            [validator]: true,
          },
        };
      });
    } else if (Object.hasOwnProperty.call(this.state.errors, validator)
    && value !== '' && urlValid) {
      this.setState((state) => {
        const updateErrors = state.errors;

        delete updateErrors[validator];

        return {
          errors: updateErrors,
        };
      });
    }

    this.setState(state => ({
      isButtonHidden: Object.keys(state.errors).length,
    }));
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      title, description, imdbId, imdbUrl, imgUrl, isButtonHidden, errors,
    } = this.state;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.newFilmHandler();
        }}
      >
        <fieldset className="formField">
          <legend>Add new Film</legend>
          <label>
            Title
            <input
              className={Object.hasOwnProperty.call(errors, 'isTitleValid')
                ? 'warning'
                : ''}
              type="text"
              name="title"
              placeholder="Film title"
              value={title}
              onChange={this.handleChange}
              required
              onBlur={this.handleError}
            />
            {Object.hasOwnProperty.call(errors, 'isTitleValid')
            && <span>Enter title, please</span>}
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
              placeholder="Film description"
              value={description}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Imdb Id
            <input
              className={Object.hasOwnProperty.call(errors, 'isImdbIdValid')
                ? 'warning'
                : ''}
              type="text"
              name="imdbId"
              placeholder="ImdbId"
              value={imdbId}
              onChange={this.handleChange}
              onBlur={this.handleError}
              required
            />
            {Object.hasOwnProperty.call(errors, 'isImdbIdValid')
            && <span>Enter valid Id, please</span>}
          </label>
          <label>
            Imdb Url
            <input
              className={Object.hasOwnProperty.call(errors, 'isImdbUrlValid')
                ? 'warning'
                : ''}
              type="text"
              name="imdbUrl"
              placeholder="ImdbUrl"
              value={imdbUrl}
              onChange={this.handleChange}
              onBlur={this.handleError}
              required
            />
            {Object.hasOwnProperty.call(errors, 'isImdbUrlValid')
            && <span>Enter valid Imdb Url, please</span>}
          </label>
          <label>
            Img Url
            <input
              className={Object.hasOwnProperty.call(errors, 'isImgUrlValid')
                ? 'warning'
                : ''}
              type="text"
              name="imgUrl"
              placeholder="ImgUrl"
              value={imgUrl}
              onChange={this.handleChange}
              onBlur={this.handleError}
              required
            />
            {Object.hasOwnProperty.call(errors, 'isImgUrlValid')
            && <span>Enter valid Id, please</span>}
          </label>

        </fieldset>
        <button
          type="submit"
          disabled={isButtonHidden}
        >
          Add film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

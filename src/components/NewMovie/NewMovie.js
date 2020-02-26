import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '../TextField/TextField';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    formErrors: {
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    titleValid: false,
    imgUrlValid: false,
    imdbUrlvalid: false,
    imdbIdValid: false,
  };

  changeHandler = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  blurHandler = ({ target }) => {
    const { name, value } = target;

    this.validateField(name, value);
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { addMovie } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      titleValid: false,
      imgUrlValid: false,
      imdbUrlvalid: false,
      imdbIdValid: false,
    });
  };

  validateField(fieldName, value) {
    this.setState((prevState) => {
      const fieldValidationErrors = prevState.formErrors;
      /* eslint-disable-next-line */
      const regExPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
      let {
        titleValid,
        imgUrlValid,
        imdbUrlvalid,
        imdbIdValid,
      } = prevState;

      switch (fieldName) {
        case 'title': {
          titleValid = value.trim().length > 0;
          fieldValidationErrors.title = titleValid ? '' : 'is required';
          break;
        }

        case 'imdbId': {
          imdbIdValid = value.trim().length > 0;
          fieldValidationErrors.imdbId = imdbIdValid ? '' : 'is required';
          break;
        }

        case 'imgUrl': {
          imgUrlValid = regExPattern.test(value);
          fieldValidationErrors.imgUrl = imgUrlValid ? '' : 'must be url';
          break;
        }

        case 'imdbUrl': {
          imdbUrlvalid = regExPattern.test(value);
          fieldValidationErrors.imdbUrl = imdbUrlvalid ? '' : 'must be url';
          break;
        }

        default: break;
      }

      return {
        formErrors: fieldValidationErrors,
        titleValid,
        imdbIdValid,
        imgUrlValid,
        imdbUrlvalid,
      };
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      formErrors,
      titleValid,
      imgUrlValid,
      imdbUrlvalid,
      imdbIdValid,
    } = this.state;

    const disabled = titleValid && imgUrlValid && imdbUrlvalid && imdbIdValid;

    return (
      <form name="new-movie" onSubmit={this.submitHandler}>
        <TextField
          name="title"
          value={title}
          errors={formErrors}
          changeHandler={this.changeHandler}
          blurHandler={this.blurHandler}
        />
        <div className="field">
          <label
            htmlFor="description"
            className="label"
          >
            Movie description
          </label>
          <div className="control">
            <textarea
              id="description"
              name="description"
              value={description}
              className="textarea"
              placeholder="Description..."
              onChange={this.changeHandler}
            />
          </div>
        </div>
        <TextField
          name="imgUrl"
          value={imgUrl}
          errors={formErrors}
          changeHandler={this.changeHandler}
          blurHandler={this.blurHandler}
        />
        <TextField
          name="imdbUrl"
          value={imdbUrl}
          errors={formErrors}
          changeHandler={this.changeHandler}
          blurHandler={this.blurHandler}
        />
        <TextField
          name="imdbId"
          value={imdbId}
          errors={formErrors}
          changeHandler={this.changeHandler}
          blurHandler={this.blurHandler}
        />
        <div className="control">
          <button
            className="button is-link"
            type="submit"
            disabled={!disabled}
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

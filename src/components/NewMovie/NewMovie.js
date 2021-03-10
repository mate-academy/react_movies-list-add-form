import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import classnames from 'classnames';

// eslint-disable-next-line max-len
const EMAIL_REGEXP = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    formFields: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      titleValid: true,
      descriptionValid: true,
      imgUrlValid: true,
      imdbUrlValid: true,
      imdbIdValid: true,
    },
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(state => (
      {
        formFields: {
          ...state.formFields,
          [name]: value,
        },
      }
    ));
  }

  onAdd = () => {
    const newMovie = this.state.formFields;

    this.props.addMovie(newMovie);
    this.clear();
  }

  validate = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'title':
      case 'description':
      case 'imdbId':
        this.setState(state => (
          {
            errors: {
              ...state.errors,
              [`${name}Valid`]: !!value,
            },
          }
        ));
        break;

      case 'imgUrl':
      case 'imdbUrl':
        this.setState(state => (
          {
            errors: {
              ...state.errors,
              [`${name}Valid`]: !!value.match(EMAIL_REGEXP),
            },
          }
        ));
        break;

      default:
        break;
    }
  }

  clear = () => {
    this.setState({
      formFields: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.onAdd();
  }

  validateButton = () => {
    const errorsValid = Object.values(this.state.errors)
      .some(el => !!el === false);
    const formFieldsValid = Object.values(this.state.formFields)
      .some(el => !!el === false);

    return errorsValid || formFieldsValid;
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.formFields;

    const {
      titleValid,
      descriptionValid,
      imgUrlValid,
      imdbUrlValid,
      imdbIdValid,
    } = this.state.errors;

    return (
      <div className="container">
        <h1 className="header">Add new movie</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.onAdd();
          }}
        >
          <div className="inputBlock">
            <p>Title: </p>
            <input
              type="text"
              name="title"
              placeholder="Add a title"
              className={classnames({
                warning: !titleValid,
              })}
              value={title}
              onChange={this.handleChange}
              onBlur={this.validate}
            />
            {!titleValid
            && <p className="error">The title is not valid</p>}
          </div>

          <div className="inputBlock">
            <p>Description: </p>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              className={classnames({
                warning: !descriptionValid,
              })}
              value={description}
              onChange={this.handleChange}
              onBlur={this.validate}
            />
            {!descriptionValid
            && <p className="error">The description is not valid</p>}
          </div>

          <div className="inputBlock">
            <p>Image url: </p>
            <input
              type="text"
              name="imgUrl"
              placeholder="Add image url"
              className={classnames({
                warning: !imgUrlValid,
              })}
              value={imgUrl}
              onChange={this.handleChange}
              onBlur={this.validate}
            />
            {!imgUrlValid
            && <p className="error">The link is not valid</p>}
          </div>

          <div className="inputBlock">
            <p>IMDb url: </p>
            <input
              type="text"
              name="imdbUrl"
              placeholder="Add IMDb url"
              className={classnames({
                warning: !imdbUrlValid,
              })}
              value={imdbUrl}
              onChange={this.handleChange}
              onBlur={this.validate}
            />
            {!imdbUrlValid
            && <p className="error">The link is not valid</p>}
          </div>

          <div className="inputBlock">
            <p>IMDb id: </p>
            <input
              type="text"
              name="imdbId"
              placeholder="Add IMDb id"
              className={classnames({
                warning: !imdbIdValid,
              })}
              value={imdbId}
              onChange={this.handleChange}
              onBlur={this.validate}
            />
            {!imdbIdValid
            && <p className="error">The id is not valid</p>}
          </div>

          <button
            type="submit"
            className="addMovieBtn"
            disabled={this.validateButton()}
          >
            Add new movie
          </button>
        </form>
      </div>

    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

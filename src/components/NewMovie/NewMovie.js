import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import classnames from 'classnames';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleValid: true,
    descriptionValid: true,
    imgUrlValid: true,
    imdbUrlValid: true,
    imdbIdValid: true,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  onAdd = () => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);
    this.clear();
  }

  toValidate = (e) => {
    const { name, value } = e.target;
    // eslint-disable-next-line max-len
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    switch (name) {
      case 'title':
      case 'description':
      case 'imdbId':
        this.setState({
          [`${name}Valid`]: !!value,
        });
        break;

      case 'imgUrl':
      case 'imdbUrl':
        this.setState({
          [`${name}Valid`]: !!value.match(regExp)
          ,
        });
        break;
      default:
        break;
    }
  }

  clear = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleValid,
      descriptionValid,
      imgUrlValid,
      imdbUrlValid,
      imdbIdValid } = this.state;

    const formIsValid = !title
    || !description
    || !imgUrl
    || !imdbUrl
    || !imdbId;

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
              onBlur={this.toValidate}
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
              onBlur={this.toValidate}
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
              onBlur={this.toValidate}
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
              onBlur={this.toValidate}
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
              onBlur={this.toValidate}
            />
            {!imdbIdValid
            && <p className="error">The id is not valid</p>}
          </div>

          <button
            type="submit"
            className="addMovieBtn"
            disabled={formIsValid}
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

import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

// eslint-disable-next-line
const regEx = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: {
      value: '',
      error: false,
    },
    description: {
      value: '',
      error: false,
    },
    imgUrl: {
      value: '',
      error: false,
    },
    imdbUrl: {
      value: '',
      error: false,
    },
    imdbId: {
      value: '',
      error: false,
    },
  };

  checkValid = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: {
        value,
        error: value.length < 2,
      },
    });
  }

  checkValidbUrls = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: {
        value,
        error: !regEx.test(value),
      },
    });
  }

  handeleSubmit = (e) => {
    e.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const isValid = Object.values(this.state).every(
      obj => !obj.error && obj.value.length,
    );

    if (isValid) {
      const newMovie = {
        title: title.value,
        description: description.value,
        imgUrl: imgUrl.value,
        imdbUrl: imdbUrl.value,
        imdbId: imdbId.value,
      };

      this.props.addMovie(newMovie);

      this.setState({
        title: {
          value: '',
          error: false,
        },
        description: {
          value: '',
          error: false,
        },
        imgUrl: {
          value: '',
          error: false,
        },
        imdbUrl: {
          value: '',
          error: false,
        },
        imdbId: {
          value: '',
          error: false,
        },
      });
    }
  }

  changeState = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: {
        value,
        error: false,
      },
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <div className="block">
        <form onSubmit={this.handeleSubmit} className="block__form">
          <div>
            <p>Put the form here</p>
          </div>
          <div className="inputs">
            <div className="container-input">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title.value}
                onChange={this.changeState}
                onBlur={this.checkValid}
              />
              {title.error
               && <span className="error">Invalid input</span>}
            </div>
            <div className="container-input">
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={description.value}
                onChange={this.changeState}
                onBlur={this.checkValid}
              />
              {description.error
                && <span className="error">Invalid input</span>}
            </div>
            <div className="container-input">
              <input
                type="text"
                name="imgUrl"
                placeholder="ImgUrl"
                value={imgUrl.value}
                onChange={this.changeState}
                onBlur={this.checkValidbUrls}
              />
              {imgUrl.error
                && <span className="error">Invalid input</span>}
            </div>
            <div className="container-input">
              <input
                type="text"
                name="imdbUrl"
                placeholder="imdbUrl"
                value={imdbUrl.value}
                onChange={this.changeState}
                onBlur={this.checkValidbUrls}
              />
              {imdbUrl.error
                && <span className="error">Invalid input</span>}
            </div>
            <div className="container-input">
              <input
                type="text"
                name="imdbId"
                placeholder="ImdbId"
                value={imdbId.value}
                onChange={this.changeState}
                onBlur={this.checkValid}
              />
              {imdbId.error
                && <span className="error">Invalid input</span>}
            </div>
          </div>
          <button type="submit" className="button">Add Movie</button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

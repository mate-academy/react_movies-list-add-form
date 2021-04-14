import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import bulma from 'bulma';
import './NewMovie.scss';

// eslint-disable-next-line
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgUrlValid: true,
    imdbUrlValid: true,
  };

  isValidImgUrl = () => {
    this.setState(state => ({
      imgUrlValid: regex.test(state.imdbUrlValid),
    }));
  }

  isValidImdbUrl = () => {
    this.setState(state => ({
      imdbUrlValid: regex.test(state.imdbUrlValid),
    }));
  }

  handlerSumbit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    } = this.state;

    this.props.addMovie({
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
      imgUrlValid: true,
      imdbUrlValid: true,
    });
  }

  render() {
    const {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
      imgUrlValid,
      imdbUrlValid,
    } = this.state;

    return (
      <div className="field">

        <h2 className="title">Add movie</h2>

        <form
          className="form"
          onSubmit={this.handlerSumbit}
        >
          <input
            className="input "
            type="text"
            value={title}
            placeholder="Title"
            required
            onChange={event => (
              this.setState({
                title: event.target.value,
              })
            )}
          />

          <input
            className="input"
            type="text"
            value={description}
            placeholder="Description"
            required
            onChange={event => (
              this.setState({
                description: event.target.value,
              })
            )}
          />

          <input
            className={
              imgUrlValid
                ? 'input'
                : 'input is-danger'
            }
            type="text"
            value={imgUrl}
            placeholder="Image Url"
            required
            onChange={(event) => {
              this.setState({
                imgUrl: event.target.value,
              });
              this.isValidImgUrl();
            }}
          />
          {
            !imgUrlValid && (
              <span className="help is-danger">
                Url invalid
              </span>
            )
          }

          <input
            className={
              imdbUrlValid
                ? 'input '
                : 'input is-danger'
            }
            type="text"
            value={imdbUrl}
            placeholder="Image Url"
            required
            onChange={(event) => {
              this.setState({
                imdbUrl: event.target.value,
              });
              this.isValidImdbUrl();
            }}
          />
          {
            !imdbUrlValid && (
              <span className="help is-danger">
                Url invalid
              </span>
            )
          }
          <input
            className="input "
            type="text"
            value={imdbId}
            placeholder="Id"
            required
            onChange={event => (
              this.setState({
                imdbId: event.target.value,
              })
            )}
          />
          <button
            className="button is-primary is-outlined"
            type="submit"
          >
            Add movie
          </button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

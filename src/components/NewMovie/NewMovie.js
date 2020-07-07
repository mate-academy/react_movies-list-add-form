import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    isFormInvalid: false,
  };

  handleChange = (name, event) => {
    const errorName = name.concat('Error');

    this.setState({
      [name]: event.target.value,
      [errorName]: false,
      isFormInvalid: false,
    });
  }

  handleBlur = (name, event) => {
    const errorName = name.concat('Error');

    if (event.target.value.replace(/\s+/g, '').length === 0) {
      this.setState({
        [errorName]: true,
        isFormInvalid: true,
      });
    }

    // eslint-disable-next-line max-len
    const urlRegex = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      if (!urlRegex.test(event.target.value)) {
        this.setState({
          [errorName]: true,
          isFormInvalid: true,
        });
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;

    addMovie({
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <br />
          <input
            type="text"
            name="title"
            maxLength={150}
            className={this.state.titleError ? 'form__input-error' : ''}
            value={this.state.title}
            onChange={event => this.handleChange('title', event)}
            onBlur={event => this.handleBlur('title', event)}
            required
          />
        </label>
        <br />
        {
          this.state.titleError
            ? (
              <>
                <span className="error">
                  Please enter a title
                </span>
                <br />
              </>
            )
            : (
              <span />
            )
        }
        <label>
          Description:
          <br />
          <input
            type="textarea"
            name="description"
            maxLength={300}
            value={this.state.description}
            onChange={event => this.handleChange('description', event)}
          />
        </label>
        <br />
        <label>
          Poster (insert url):
          <br />
          <input
            type="text"
            name="imgUrl"
            className={this.state.imgUrlError ? 'form__input-error' : ''}
            value={this.state.imgUrl}
            onChange={event => this.handleChange('imgUrl', event)}
            onBlur={event => this.handleBlur('imgUrl', event)}
            required
          />
        </label>
        <br />
        {
          this.state.imgUrlError
            ? (
              <>
                <span className="error">
                  Please enter a valid url
                </span>
                <br />
              </>
            )
            : (
              <span />
            )
        }
        <label>
          IMDb (insert url):
          <br />
          <input
            type="text"
            name="imdbUrl"
            className={this.state.imdbUrlError ? 'form__input-error' : ''}
            value={this.state.imdbUrl}
            onChange={event => this.handleChange('imdbUrl', event)}
            onBlur={event => this.handleBlur('imdbUrl', event)}
            required
          />
        </label>
        <br />
        {
          this.state.imdbUrlError
            ? (
              <>
                <span className="error">
                  Please enter a valid url
                </span>
                <br />
              </>
            )
            : (
              <span />
            )
        }
        <label>
          IMDb id:
          <br />
          <input
            type="text"
            name="imdbId"
            className={this.state.imdbIdError ? 'form__input-error' : ''}
            value={this.state.imdbId}
            onChange={event => this.handleChange('imdbId', event)}
            onBlur={event => this.handleBlur('imdbId', event)}
            required
          />
        </label>
        <br />
        {
          this.state.imdbIdError
            ? (
              <>
                <span className="error">
                  Please enter IMDb id of the movie
                </span>
                <br />
              </>
            )
            : (
              <span />
            )
        }
        <button
          type="submit"
          disabled={this.state.isFormInvalid}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

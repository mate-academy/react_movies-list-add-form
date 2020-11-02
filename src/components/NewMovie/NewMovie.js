import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  errorTitle: '',
  errorImgUrl: '',
  errorImdbUrl: '',
  errorImdbId: '',
};

export class NewMovie extends Component {
  state = initialState;

  handleSubmit = (event) => {
    const { addMovie } = this.props;
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    event.preventDefault();
    addMovie(newMovie);
    this.setState(initialState);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    let error = '';

    // eslint-disable-next-line default-case
    switch (name) {
      case 'title':
        error = 'errorTitle';
        break;
      case 'imgUrl':
        error = 'errorImgUrl';
        break;
      case 'imdbUrl':
        error = 'errorImdbUrl';
        break;
      case 'imdbId':
        error = 'errorImdbId';
        break;
    }

    this.setState({
      [name]: value,
      [error]: '',
    });
  };

  checkURL = (str) => {
    // eslint-disable-next-line max-len
    if (!str.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/)) {
      return false;
    }

    return true;
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errorTitle,
      errorImgUrl,
      errorImdbUrl,
      errorImdbId,
    } = this.state;

    return (
      <div className="App__form">
        <form
          className="form-group"
          onSubmit={this.handleSubmit}
        >

          <label className="App__label">
            <span>
              {`Title `}
            </span>
            <input
              className={(errorTitle) ? 'App__input border' : 'App__input'}
              placeholder="write title here"
              name="title"
              type="text"
              value={title}
              autoComplete="off"
              onBlur={(event) => {
                let error = '';

                if (!event.target.value) {
                  error = 'Please write title of the movie';
                } else {
                  error = '';
                }

                this.setState({ errorTitle: error });
              }}
              onChange={this.handleChange}
            />
          </label>
          <div className="App__error">
            {errorTitle}
          </div>
          <p>
            <label>
              <textarea
                className="App__textarea"
                placeholder="write description here"
                name="description"
                type="text"
                value={description}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label className="App__label">
              <span>
                {`Image logo `}
              </span>
              <input
                className={(errorImgUrl) ? 'App__input border' : 'App__input'}
                placeholder="put link for cover here"
                name="imgUrl"
                type="text"
                autoComplete="off"
                value={imgUrl}
                onBlur={(event) => {
                  let error = '';

                  if (
                    !this.checkURL(event.target.value)
                      || !event.target.value
                  ) {
                    error = 'Please write correct link (ex. https://...)';
                  } else {
                    error = '';
                  }

                  this.setState({ errorImgUrl: error });
                }}
                onChange={this.handleChange}
              />
            </label>
            <div className="App__error">
              {errorImgUrl}
            </div>
          </p>
          <p>
            <label className="App__label">
              <span>
                {`IMDB logo `}
              </span>
              <input
                className={(errorImdbUrl) ? 'App__input border' : 'App__input'}
                placeholder="put link of IMDB logo here"
                name="imdbUrl"
                type="text"
                autoComplete="off"
                value={imdbUrl}
                onBlur={(event) => {
                  let error = '';

                  if (
                    !event.target.value
                    || !this.checkURL(event.target.value)
                  ) {
                    error = 'Please write correct link (ex. https://...)';
                  } else {
                    error = '';
                  }

                  this.setState({ errorImdbUrl: error });
                }}
                onChange={this.handleChange}
              />
            </label>
            <div className="App__error">
              {errorImdbUrl}
            </div>
          </p>
          <p>
            <label className="App__label">
              <span>
                {`ID on IMDB `}
              </span>
              <input
                className={(errorImdbId) ? 'App__input border' : 'App__input'}
                placeholder="write id of this movie"
                name="imdbId"
                type="text"
                autoComplete="off"
                value={imdbId}
                onBlur={(event) => {
                  let error = '';

                  if (!event.target.value) {
                    error = 'Please write correct ID';
                  } else {
                    error = '';
                  }

                  this.setState({ errorImdbId: error });
                }}
                onChange={this.handleChange}
              />
            </label>
            <div className="App__error">
              {errorImdbId}
            </div>
          </p>
          {
            (
              !title || !imgUrl || !imdbUrl || !imdbId
              || !this.checkURL(imgUrl) || !this.checkURL(imdbUrl)
            )
              ? (
                <button
                  type="submit"
                  className="App__button"
                  disabled
                >
                  Add movie!
                </button>
              )
              : (
                <button
                  type="submit"
                  className="App__button"
                >
                  Add movie!
                </button>
              )
          }
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

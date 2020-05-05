import React, { Component } from 'react';
import cn from 'classnames';
import './NewMovie.scss';
import PropTypes from 'prop-types';

// eslint-disable-next-line
const regexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
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

  handleSetTitle = (e) => {
    this.setState({
      title: e.target.value,
      errorTitle: '',
    });
  }

  handleSetDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  }

  handleSetImgUrl = (e) => {
    this.setState({
      imgUrl: e.target.value,
      errorImgUrl: '',
    });
  }

  handleSetImdbUrl = (e) => {
    this.setState({
      imdbUrl: e.target.value,
      errorImdbUrl: '',
    });
  }

  handleSetImdbId = (e) => {
    this.setState({
      imdbId: e.target.value,
      errorImdbId: '',
    });
  }

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',

      errorTitle: '',
      errorImgUrl: '',
      errorImdbUrl: '',
      errorImdbId: '',
    });
  }

  hasErrorTitle = () => {
    this.setState((prev) => {
      const nextState = {};

      if (prev.title.trim() === '') {
        nextState.errorTitle = true;
      }

      return nextState;
    });
  }

  hasErrorImgUrl = () => {
    this.setState((prev) => {
      const nextState = {};

      if (!regexp.test(prev.imgUrl)) {
        nextState.errorImgUrl = true;
      }

      return nextState;
    });
  }

  hasErrorimdbUrl = () => {
    this.setState((prev) => {
      const nextState = {};

      if (!regexp.test(prev.imdbUrl)) {
        nextState.errorImdbUrl = true;
      }

      return nextState;
    });
  }

  hasErrorImdbId = () => {
    this.setState((prev) => {
      const nextState = {};

      if (prev.imdbId.trim() === '') {
        nextState.errorImdbId = true;
      }

      return nextState;
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.title.trim() !== ''
      && regexp.test(this.state.imgUrl)
      && regexp.test(this.state.imdbUrl)
      && this.state.imdbId.trim() !== ''
    ) {
      this.props.addMovie(
        this.state.title,
        this.state.description,
        this.state.imgUrl,
        this.state.imdbUrl,
        this.state.imdbId,
      );

      this.resetForm();
    }
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

    const buttonState = errorTitle === ''
      && errorImgUrl === ''
      && errorImdbUrl === ''
      && errorImdbId === ''
      ? '' : 'disabled';

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className={cn({
              error: errorTitle,
            })}
            id="title"
            value={title}
            onChange={this.handleSetTitle}
            onBlur={this.hasErrorTitle}
          />
          {errorTitle && <span>Please enter the title</span>}
        </div>

        <div className="movie__description">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={this.handleSetDescription}
          />
        </div>

        <div>
          <label htmlFor="imgUrl">ImgUrl</label>
          <input
            type="text"
            className={cn({
              error: errorImgUrl,
            })}
            id="imgUrl"
            value={imgUrl}
            onChange={this.handleSetImgUrl}
            onBlur={this.hasErrorImgUrl}
          />
          {errorImgUrl && <span>Please enter correct ImgUrl</span>}
        </div>

        <div>
          <label htmlFor="imdbUrl">ImdbUrl</label>
          <input
            type="text"
            className={cn({
              error: errorImdbUrl,
            })}
            id="imdbUrl"
            value={imdbUrl}
            onChange={this.handleSetImdbUrl}
            onBlur={this.hasErrorimdbUrl}
          />
          {errorImdbUrl && <span>Please enter correct ImdbUrl</span>}
        </div>

        <div>
          <label htmlFor="imdbId">ImdbId</label>
          <input
            type="text"
            className={cn({
              error: errorImdbId,
            })}
            id="imdbId"
            value={imdbId}
            onChange={this.handleSetImdbId}
            onBlur={this.hasErrorImdbId}
          />
          {errorImdbId && <span>Please enter correct ImdbId</span>}
        </div>

        <button type="submit" disabled={buttonState}>Add film</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
